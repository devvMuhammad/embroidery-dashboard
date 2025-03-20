"use server";
import { db } from "@/db";
import { and, asc, eq, sql } from "drizzle-orm";
import { eventlogs, machines } from "../../drizzle/schema";
import { formatDateForDatabase } from "@/lib/utils";

export async function fetchAllMachines() {
  try {
    // First fetch all machines
    const allMachines = await db
      .select({
        machineName: machines.name,
        operator: machines.tajimaConnectUsername,
        headCount: machines.numberOfHeads,
      })
      .from(machines);

    // For each machine, calculate the initial stitch count
    const machinesWithInitialStitchCount = await Promise.all(
      allMachines.map(async (machine) => {
        // Get the current date at midnight to fetch all logs for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayString = formatDateForDatabase(today);

        // Get tomorrow at midnight
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = formatDateForDatabase(tomorrow);

        // Define shifts
        const now = new Date();
        const shiftStartTime = new Date(now);

        // Determine which shift we're in and set the start time accordingly
        // Morning shift: 6am to 3pm
        // Evening shift: 3pm to 11pm
        // Night shift: 11pm to 6am
        const hour = now.getHours();

        if (hour >= 6 && hour < 15) {
          // Morning shift (6am to 3pm)
          shiftStartTime.setHours(6, 0, 0, 0);
        } else if (hour >= 15 && hour < 23) {
          // Evening shift (3pm to 11pm)
          shiftStartTime.setHours(15, 0, 0, 0);
        } else {
          // Night shift (11pm to 6am)
          if (hour >= 23) {
            // 11pm to midnight
            shiftStartTime.setHours(23, 0, 0, 0);
          } else {
            // midnight to 6am
            shiftStartTime.setHours(23, 0, 0, 0);
            shiftStartTime.setDate(shiftStartTime.getDate() - 1);
          }
        }

        // Calculate minutes elapsed since shift start
        const minutesElapsedInShift = (now.getTime() - shiftStartTime.getTime()) / (1000 * 60);

        // Fetch all design-complete events for this machine today
        const completedDesigns = await db
          .select({
            numStiches: eventlogs.numStitches,
          })
          .from(eventlogs)
          .where(
            and(
              eq(eventlogs.machineName, machine.machineName),
              eq(eventlogs.eventType, "design-complete"),
              sql`${eventlogs.eventDateTime} >= ${todayString}`,
              sql`${eventlogs.eventDateTime} < ${tomorrowString}`
            )
          );

        // Calculate the initial stitch count based on completed designs
        const initialTotalStitchCount = completedDesigns.reduce((total, log) => {
          return total + ((log.numStiches || 0) * (machine.headCount || 1));
        }, 0);

        // Calculate the expected stitch count based on time elapsed in the shift
        // Formula: 339 stitches per hour per head * headCount * (minutesElapsed / 60)
        const targetStitchesPerHeadPerHour = 339;
        const dailyGoal = Math.round(targetStitchesPerHeadPerHour * (machine.headCount || 1) * (minutesElapsedInShift / 60));

        // Add additional properties for debugging/display purposes
        const shiftInfo = {
          shiftName: hour >= 6 && hour < 15 ? "Morning" : hour >= 15 && hour < 23 ? "Evening" : "Night",
          shiftStartTime: shiftStartTime.toLocaleTimeString(),
          minutesElapsedInShift: Math.round(minutesElapsedInShift)
        };

        return {
          ...machine,
          initialTotalStitchCount,
          dailyGoal,
          shiftInfo
        };
      })
    );

    return { data: machinesWithInitialStitchCount };
  } catch (error) {
    console.error("Error fetching machines:", error);
    return { error: "Error fetching machines" };
  }
}

export async function fetchLogs(startDateString: string, endDateString: string) {
  try {
    console.log("Fetching event logs from", startDateString, "to", endDateString);

    // Format the date strings for MySQL (YYYY-MM-DD HH:MM:SS)
    const formattedStartDate = startDateString.replace('T', ' ').split('.')[0];
    const formattedEndDate = endDateString.replace('T', ' ').split('.')[0];

    const logs = await db
      .select({
        eventLogId: eventlogs.eventLogId,
        eventType: eventlogs.eventType,
        machineName: eventlogs.machineName,
        numStiches: eventlogs.numStitches,
        eventDateTime: eventlogs.eventDateTime,
      })
      .from(eventlogs)
      .where(
        and(
          // Use SQL expressions to compare dates exactly as strings
          sql`${eventlogs.eventDateTime} >= ${formattedStartDate}`,
          sql`${eventlogs.eventDateTime} <= ${formattedEndDate}`
          // Removed the machine name filter to get all machines
        )
      )
      .orderBy(asc(eventlogs.eventDateTime))

    return { data: logs };
  } catch (error) {
    console.error("Error fetching event logs:", error);
    return { error: "Error fetching event logs" };
  }
}
"use server";
import { db } from "@/db";
import { and, asc, sql } from "drizzle-orm";
import { eventlogs } from "../../../drizzle/schema";

// Accept strings rather than Date objects to avoid timezone issues
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
"use server";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { eventlogs, machines } from "../../drizzle/schema";

// Accept strings rather than Date objects to avoid timezone issues
export async function fetchLogById(eventLogId: number) {
  try {
    console.log("Fetching event logs for id: ", eventLogId);

    const logs = await db
      .select()
      .from(eventlogs)
      .where(
        eq(eventlogs.eventLogId, eventLogId)
      );

    return { data: logs[0] };
  } catch (error) {
    console.error("Error fetching event logs:", error);
    return { error: "Error fetching event logs" };
  }
}

export async function fetchMachine(machineName: string) {
  try {
    const machine = await db
      .select({
        machineName: machines.name,
        operator: machines.tajimaConnectUsername,
        headCount: machines.numberOfHeads,
      })
      .from(machines)
      .where(
        eq(machines.name, machineName)
      );
    return { data: machine[0] };
  } catch (error) {
    console.error("Error fetching machine:", error);
    return { error: "Error fetching machine" };
  }
}

export async function fetchAllMachines() {
  try {
    const allMachines = await db
      .select({
        machineName: machines.name,
        operator: machines.tajimaConnectUsername,
        headCount: machines.numberOfHeads,
      })
      .from(machines);

    return { data: allMachines };
  } catch (error) {
    console.error("Error fetching machines:", error);
    return { error: "Error fetching machines" };
  }
}

export async function fetchEventLogs(eventLogId: number, machineName: string) {
  try {

    // For each machine, fetch its related event logs
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
          eq(eventlogs.machineName, machineName),
          eq(eventlogs.eventLogId, eventLogId)
        ));

    return { data: logs };

  } catch (error) {
    console.error("Error fetching machines with event logs:", error);
    return { error: "Error fetching machines with event logs" };
  }
}

export async function fetchMachinesWithEventLogs(eventLogId: number) {
  try {
    // Fetch all machines
    const machinesList = await db.select({
      machineName: machines.name,
      operator: machines.tajimaConnectUsername,
      headCount: machines.numberOfHeads,
    }).from(machines).where(eq(machines.name, "TMAR-K1508C--03166"));

    // For each machine, fetch its related event logs
    const machinesWithLogs = await Promise.all(
      machinesList.map(async (machine) => {
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
              eq(eventlogs.machineName, machine.machineName),
              eq(eventlogs.eventLogId, eventLogId)
            ));

        console.log(machine);

        // Return machine data with event logs as a nested array
        return {
          [machine.machineName]: logs,
        };
      })
    );

    return { data: machinesWithLogs[0] };
  } catch (error) {
    console.error("Error fetching machines with event logs:", error);
    return { error: "Error fetching machines with event logs" };
  }
}
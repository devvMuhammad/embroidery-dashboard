"use client"
import { useState, useEffect } from "react"
import Speedometer from "./speedometer";

// Define types for machine state
type MachineStatus = "start" | "running" | "stopped";
type MachineState = {
  status: MachineStatus;
  totalStitchCount: number;
  goal: number;
  lastUpdateTime: Date;
};

type MachineCardProps = {
  machineData: {
    machineName: string;
    operator: string | null;
    headCount: number | null;
    eventLogs?: Array<{
      eventType: string;
      numStiches?: number | null;
      eventDateTime: string;
      eventLogId: number;
      machineName: string;
    }>;
  };
};

export default function MachineCard({ machineData }: MachineCardProps) {
  const [machineState, setMachineState] = useState<MachineState>({
    status: "stopped",
    totalStitchCount: 0,
    goal: 0,
    lastUpdateTime: new Date(),
  });

  // Process event logs when they change
  useEffect(() => {
    if (machineData.eventLogs?.length) {
      processEventLogs(machineData);
    }
  }, [machineData]);

  // Update goal every minute based on Formula A
  useEffect(() => {
    const interval = setInterval(() => {
      setMachineState(prevState => ({
        ...prevState,
        goal: (machineData.headCount || 0) * 339, // Formula A: headCount * 339 per minute
        lastUpdateTime: new Date()
      }));
    }, 60000); // every minute

    // Initialize goal immediately
    setMachineState(prevState => ({
      ...prevState,
      goal: (machineData.headCount || 0) * 339,
      lastUpdateTime: new Date()
    }));

    return () => clearInterval(interval);
  }, [(machineData.headCount)]);

  function processEventLogs(machineData: MachineCardProps['machineData']) {
    if (!machineData.eventLogs || machineData.eventLogs.length === 0) return;

    // For simplicity, let's focus on the latest log
    const eventLogs = machineData.eventLogs;
    const latestLog = eventLogs[eventLogs.length - 1];

    setMachineState(prevState => {
      let newStatus = prevState.status;
      let newStitchCount = prevState.totalStitchCount;

      // Process based on event type
      if (latestLog.eventType === 'sewing-start') {
        if (newStitchCount < 0.9 * prevState.goal) {
          newStatus = "running";
        } else {
          newStatus = "start";
        }
      } else if (latestLog.eventType === 'design-complete') {
        // Formula B: Add completed stitches to total
        newStitchCount += (latestLog.numStiches || 0) * (machineData.headCount || 0);
        newStatus = "stopped"
      }
      else {
        // Any other event
        newStatus = "stopped";
      }

      return {
        ...prevState,
        status: newStatus,
        totalStitchCount: newStitchCount,
      };
    });
  }

  return (
    <Speedometer
      status={machineState.status}
      operator={machineData.operator}
      totalStitchCount={machineState.totalStitchCount}
      machineName={machineData.machineName}
      goal={machineState.goal}
      headCount={(machineData.headCount || 0)}
    />
  );
}
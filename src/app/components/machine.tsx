"use client";
import { useState, useEffect } from "react";
import Speedometer from "./speedometer";

type MachineStatus = "start" | "running" | "stopped";
type MachineState = {
  status: MachineStatus;
  totalStitchCount: number;
  goal: number;
  lastUpdateTime: Date;
};

type MachineData = {
  machineName: string;
  operator: string | null;
  headCount: number | null;
  dailyGoal: number;
  initialTotalStitchCount: number;
};

type EventLog = {
  eventLogId: number;
  eventType: string;
  machineName: string;
  numStiches: number | null;
  eventDateTime: string;
};

type MachineCardProps = {
  machineData: MachineData;
  eventLogs: EventLog[];
};

export default function MachineCard({ machineData, eventLogs }: MachineCardProps) {
  const [machineState, setMachineState] = useState<MachineState>({
    status: "stopped",
    totalStitchCount: machineData.initialTotalStitchCount || 0,
    goal: machineData.dailyGoal || 0,
    lastUpdateTime: new Date(),
  });

  // Process event logs when they arrive
  useEffect(() => {
    if (eventLogs && eventLogs.length > 0) {
      console.log(`Processing ${eventLogs.length} event logs for ${machineData.machineName}`);
      // Process each log with a delay to simulate real-time events
      if (eventLogs.length > 12) {
        eventLogs.forEach((eventLog: EventLog) => {
          processEventLog(eventLog);
        });
        return;
      }
      eventLogs.forEach((eventLog: EventLog, index: number) => {
        setTimeout(() => {
          processEventLog(eventLog);
        }, 5000 * index);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventLogs, machineData.machineName]);

  // Update goal every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (machineData) {
        setMachineState(prevState => ({
          ...prevState,
          lastUpdateTime: new Date()
        }));
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [machineData]);

  function processEventLog(eventLog: EventLog) {
    if (!eventLog) {
      return;
    }

    console.log(`Processing log for ${machineData.machineName}:`, eventLog);

    setMachineState(prevState => {
      let newStatus = prevState.status;
      let newStitchCount = prevState.totalStitchCount;

      // Process based on event type
      if (eventLog.eventType === 'sewing-start') {
        if (newStitchCount < (0.9 * prevState.goal)) {
          newStatus = "running";
        } else {
          newStatus = "start";
        }
      } else if (eventLog.eventType === 'design-complete') {
        newStitchCount += (eventLog.numStiches || 0) * (machineData.headCount || 0);
        newStatus = "stopped";
      } else {
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
      operator={machineData.operator || ""}
      totalStitchCount={machineState.totalStitchCount}
      machineName={machineData.machineName || ""}
      goal={machineState.goal}
      headCount={machineData.headCount || 0}
    />
  );
}
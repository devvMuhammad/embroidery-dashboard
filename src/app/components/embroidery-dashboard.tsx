"use client"
import { useState, useEffect } from "react"
import OrdersTable from "./orders-table"
import { useIdEventLogs } from "@/hooks/useIdEventLogs";
import Speedometer from "./speedometer";

// Define types for machine state
type MachineStatus = "start" | "running" | "stopped";
type MachineState = {
  status: MachineStatus;
  totalStitchCount: number;
  operator: string;
  machineName: string;
  goal: number;
  headCount: number;
  lastUpdateTime: Date;
};

export default function EmbroideryDashboard() {
  const { machineLogs, isLoading } = useIdEventLogs({ interval: 10000 });
  const [machineState, setMachineState] = useState<MachineState>({
    status: "stopped",
    totalStitchCount: 0,
    operator: "Muhammad Khan",
    machineName: "Emb Machine 9",
    goal: 0,
    headCount: 12,
    lastUpdateTime: new Date(),
  });


  useEffect(() => {
    if (machineLogs && !isLoading) {
      processEventLogs(machineLogs);
    }
  }, [machineLogs, isLoading]);

  // Update goal every minute based on Formula A
  useEffect(() => {
    const interval = setInterval(() => {
      setMachineState(prevState => ({
        ...prevState,
        goal: prevState.headCount * 339, // Formula A: headCount * 339 per minute
        lastUpdateTime: new Date()
      }));
    }, 60000); // every minute

    return () => clearInterval(interval);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function processEventLogs(newEventLogs: any) {
    if (!Array.isArray(newEventLogs) || newEventLogs.length === 0) return;

    // For simplicity, let's focus on the latest log
    const latestLog = newEventLogs[newEventLogs.length - 1];

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
        newStitchCount += (latestLog.numStitches || 0) * prevState.headCount;
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
    <div className="py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Embroidery Production Dashboard</h1>
        <p className="text-muted-foreground mt-2">Real-time monitoring of machine performance and order status</p>
      </header>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Machine Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Speedometer
            status={machineState.status}
            operator={machineLogs?.operator as string | null}
            totalStitchCount={machineState.totalStitchCount}
            machineName={machineLogs?.machineName as string}
            goal={machineState.goal}
            headCount={machineState.headCount}
          />
        </div>
      </section>
      <pre>{JSON.stringify(machineLogs, null, 2)}</pre>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Orders Info</h2>
          <p className="text-sm text-muted-foreground">Sorted by due date</p>
        </div>
        <OrdersTable />
      </section>
    </div>
  )
}


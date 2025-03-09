"use client"
import { useState } from "react"
import OrdersTable from "./orders-table"
import { useIdEventLogs } from "@/hooks/useIdEventLogs";
import MachineCard from "./machine-card";

export default function EmbroideryDashboard() {
  const { machineLogs, isLoading } = useIdEventLogs({ interval: 10000 });
  const [expandedMachine, setExpandedMachine] = useState<string | null>(null);

  // Toggle expanded view for a specific machine
  const toggleMachineExpand = (machineName: string) => {
    setExpandedMachine(prev => prev === machineName ? null : machineName);
  };

  return (
    <div className="py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Embroidery Production Dashboard</h1>
        <p className="text-muted-foreground mt-2">Real-time monitoring of machine performance and order status</p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Machines Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <p>Loading machine data...</p>
          ) : machineLogs && Array.isArray(machineLogs) ? (
            machineLogs.map((machine) => (
              <div key={machine.machineName} onClick={() => toggleMachineExpand(machine.machineName)}>
                <MachineCard machineData={machine} />
              </div>
            ))
          ) : (
            <p>No machine data available</p>
          )}
        </div>
      </section>

      {/* Machine details view when expanded */}
      {expandedMachine && machineLogs && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{expandedMachine} Details</h2>
          <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
            {JSON.stringify(
              machineLogs.find(machine => machine.machineName === expandedMachine),
              null,
              2
            )}
          </pre>
        </section>
      )}

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
"use client"
import { useState } from "react"
import OrdersTable from "./orders-table"
import { useEventLogs } from "@/hooks/useEventLogs";
import MachineCard from "./machine"

export default function EmbroideryDashboard({ mode }: { mode: "test" | "real" }) {
  const { machines, eventLogsByMachine, currentTimeRange } = useEventLogs({ interval: 60 * 1000, startDate: mode === "real" ? new Date() : undefined });
  const [selectedView, setSelectedView] = useState<"dashboard" | "details">("dashboard");

  return (
    <div className="py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Embroidery Production Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Real-time monitoring of machine performance and order status
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            Displaying data from {currentTimeRange.startTime.toLocaleTimeString()} to {currentTimeRange.endTime.toLocaleTimeString()}
          </div>
          <div className="flex">
            <button
              onClick={() => setSelectedView("dashboard")}
              className={`px-3 py-1 text-sm rounded-l-md ${selectedView === 'dashboard' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setSelectedView("details")}
              className={`px-3 py-1 text-sm rounded-r-md ${selectedView === 'details' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
            >
              Raw Data
            </button>
          </div>
        </div>
      </header>

      {selectedView === "dashboard" ? (
        <>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Machine Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {machines.map(machine => (
                <MachineCard
                  key={machine.machineName}
                  machineData={machine}
                  eventLogs={eventLogsByMachine[machine.machineName] || []}
                />
              ))
              }
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Orders Info</h2>
              <p className="text-sm text-muted-foreground">Sorted by due date</p>
            </div>
            <OrdersTable />
          </section>
        </>
      ) : (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Raw Data</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Machines</h3>
              <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96">
                {JSON.stringify(machines, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Event Logs</h3>
              <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96">
                {JSON.stringify(eventLogsByMachine, null, 2)}
              </pre>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
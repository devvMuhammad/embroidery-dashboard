"use client"

import Machines from "./machines"
import OrdersTable from "./orders-table"
import { useIdEventLogs } from "@/hooks/useIdEventLogs";


export default function EmbroideryDashboard() {

  const { machineLogs } = useIdEventLogs({ interval: 10000 });

  // function processEventLogs(newEventLog) {



  // }


  return (
    <div className="py-8 px-4">
      <pre>{JSON.stringify(machineLogs, null, 2)}</pre>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Embroidery Production Dashboard</h1>
        <p className="text-muted-foreground mt-2">Real-time monitoring of machine performance and order status</p>
      </header>

      <Machines />

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


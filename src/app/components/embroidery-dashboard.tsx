"use client"

import Machines from "./machines"
import OrdersTable from "./orders-table"


export default function EmbroideryDashboard() {
  return (
    <div className="py-8 px-4">
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


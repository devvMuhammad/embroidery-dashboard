"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Speedometer component with different states
const Speedometer = ({
  value = 0,
  threshold = 500,
  operator = "John Doe",
  machine = "1",
  head = "8",
  designNumber = "D-1234",
}) => {
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    // Set blinking effect for zero value
    if (value === 0) {
      const interval = setInterval(() => {
        setIsBlinking((prev) => !prev)
      }, 500)
      return () => clearInterval(interval)
    } else {
      setIsBlinking(false)
    }
  }, [value])

  // Determine color based on value
  const getColor = () => {
    if (value === 0) {
      return isBlinking ? "transparent" : "rgb(239, 68, 68)"
    }
    return value < threshold ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)"
  }

  // Determine status text and style
  const getStatus = () => {
    if (value === 0) {
      return {
        text: "Stopped Working",
        color: "text-red-500",
        blinking: isBlinking ? "opacity-50" : "opacity-100"
      }
    } else if (value < threshold) {
      return {
        text: "Low Performance",
        color: "text-red-500",
        blinking: ""
      }
    } else {
      return {
        text: "Operational",
        color: "text-green-500",
        blinking: ""
      }
    }
  }

  const status = getStatus()

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>Machine {machine} - {head} Head</span>
          <span className={`text-sm flex items-center ${status.color} ${status.blinking} transition-opacity duration-300`}>
            <span className="inline-block w-2 h-2 rounded-full bg-current mr-2"></span>
            {status.text}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke={getColor()}
              strokeWidth="5"
              className="transition-colors duration-300"
            />
            <text x="50" y="55" textAnchor="middle" className="text-2xl font-bold fill-foreground">
              {value}
            </text>
          </svg>
        </div>
        <div className="w-full space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Operator:</span>
            <span className="font-medium">{operator}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current Speed:</span>
            <span className="font-medium">{value} SPM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Design Number:</span>
            <span className="font-medium">{designNumber}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Sample data for speedometers
const speedometersData = [
  { value: 750, operator: "Emma Wilson", machine: "1", head: "8", designNumber: "D-1001" },
  { value: 450, operator: "James Smith", machine: "2", head: "6", designNumber: "D-1002" },
  { value: 0, operator: "Sarah Johnson", machine: "3", head: "8", designNumber: "D-1003" },
  { value: 820, operator: "Michael Brown", machine: "4", head: "12", designNumber: "D-1004" },
  { value: 0, operator: "Lisa Davis", machine: "5", head: "6", designNumber: "D-1005" },
  { value: 650, operator: "Robert Miller", machine: "6", head: "8", designNumber: "D-1006" },
]

// Sample data for orders table
const ordersData = [
  {
    id: "ORD-12345",
    customer: "Acme Apparel",
    quantity: 250,
    status: "In Progress",
    design: "Logo-A23",
    dueDate: "2025-03-10",
  },
  {
    id: "ORD-12346",
    customer: "SportsFit Inc",
    quantity: 500,
    status: "Approved",
    design: "Jersey-B17",
    dueDate: "2025-03-12",
  },
  {
    id: "ORD-12347",
    customer: "Uniform Pro",
    quantity: 100,
    status: "Finishing",
    design: "Badge-C45",
    dueDate: "2025-03-08",
  },
  {
    id: "ORD-12348",
    customer: "Fashion Forward",
    quantity: 350,
    status: "Received",
    design: "Pattern-D32",
    dueDate: "2025-03-15",
  },
  {
    id: "ORD-12349",
    customer: "School District #5",
    quantity: 200,
    status: "Approved",
    design: "Mascot-E19",
    dueDate: "2025-03-20",
  },
]

// Status badge component
const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "Approved":
        return "bg-blue-500"
      case "Received":
        return "bg-yellow-500"
      case "In Progress":
        return "bg-purple-500"
      case "Finishing":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return <Badge className={`${getStatusColor()} hover:${getStatusColor()}`}>{status}</Badge>
}

export default function EmbroideryDashboard() {
  return (
    <div className="py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Embroidery Production Dashboard</h1>
        <p className="text-muted-foreground mt-2">Real-time monitoring of machine performance and order status</p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Machine Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {speedometersData.map((data, index) => (
            <Speedometer key={index} {...data} threshold={500} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Orders Info</h2>
          <p className="text-sm text-muted-foreground">Sorted by due date</p>
        </div>
        <Card className="p-1 rounded-sm">
          <CardContent className="p-0">
            <Table className="font">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-[16px]">Order ID</TableHead>
                  <TableHead className="font-bold text-[16px]">Customer</TableHead>
                  <TableHead className="font-bold text-[16px]">Quantity</TableHead>
                  <TableHead className="font-bold text-[16px]">Design</TableHead>
                  <TableHead className="font-bold text-[16px]">Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersData.map((order) => (
                  <TableRow key={order.id} className="text-[16px]">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.design}</TableCell>
                    <TableCell>{new Date(order.dueDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}


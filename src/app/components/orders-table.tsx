import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"


// Sample data for orders table
export const ordersData = [
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


export default function OrdersTable() {
  return (
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
  )
}
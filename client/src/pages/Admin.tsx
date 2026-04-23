import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, ShoppingBag, Activity, DollarSign } from "lucide-react";

export default function Admin() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "1,234", icon: Users, color: "text-blue-500", bg: "bg-blue-100" },
          { label: "Total Orders", value: "856", icon: ShoppingBag, color: "text-green-500", bg: "bg-green-100" },
          { label: "Active Doctors", value: "42", icon: Activity, color: "text-purple-500", bg: "bg-purple-100" },
          { label: "Revenue", value: "₹3,75,231", icon: DollarSign, color: "text-orange-500", bg: "bg-orange-100" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-full ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "ORD-001", user: "Alice Smith", status: "Delivered", amount: "₹3,750" },
                { id: "ORD-002", user: "Bob Jones", status: "Processing", amount: "₹10,250" },
                { id: "ORD-003", user: "Charlie Brown", status: "Cancelled", amount: "₹990" },
                { id: "ORD-004", user: "Diana Prince", status: "Shipped", amount: "₹7,500" },
              ].map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.user}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === "Delivered" ? "secondary" : "outline"}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

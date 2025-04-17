import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Inventory = () => {
  const { toast } = useToast();

  const inventoryItems = [
    {
      id: "ITEM-001",
      name: "Laptop Dell XPS 15",
      category: "Electronics",
      quantity: 15,
      unitPrice: 1299.99,
      totalValue: 19499.85,
      status: "in-stock",
    },
    {
      id: "ITEM-002",
      name: "Office Desk Chair",
      category: "Furniture",
      quantity: 8,
      unitPrice: 249.99,
      totalValue: 1999.92,
      status: "in-stock",
    },
    {
      id: "ITEM-003",
      name: "Wireless Mouse",
      category: "Accessories",
      quantity: 42,
      unitPrice: 29.99,
      totalValue: 1259.58,
      status: "in-stock",
    },
    {
      id: "ITEM-004",
      name: "Printer Paper (Ream)",
      category: "Office Supplies",
      quantity: 3,
      unitPrice: 9.99,
      totalValue: 29.97,
      status: "low-stock",
    },
    {
      id: "ITEM-005",
      name: "External Hard Drive 1TB",
      category: "Electronics",
      quantity: 0,
      unitPrice: 89.99,
      totalValue: 0,
      status: "out-of-stock",
    },
    {
      id: "ITEM-006",
      name: "Standing Desk Converter",
      category: "Furniture",
      quantity: 5,
      unitPrice: 199.99,
      totalValue: 999.95,
      status: "low-stock",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>;
      case "low-stock":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low Stock</Badge>;
      case "out-of-stock":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Out of Stock</Badge>;
      default:
        return null;
    }
  };

  const handleAction = (action: string, id: string) => {
    toast({
      title: `${action} Item`,
      description: `${action} action for item ${id} has been initiated.`,
    });
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-500 mt-1">
            Track and manage your inventory items efficiently.
          </p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Button className="bg-ledger-600 hover:bg-ledger-700 flex items-center">
            <Plus size={16} className="mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg mb-1">Total Items</h3>
          <p className="text-3xl font-bold">6</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg mb-1">Total Value</h3>
          <p className="text-3xl font-bold text-ledger-700">₹23,789.27</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg mb-1">Low Stock Alert</h3>
          <p className="text-3xl font-bold text-yellow-600">2</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search items..."
                className="pl-10"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="office-supplies">Office Supplies</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="flex items-center">
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">₹{item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">₹{item.totalValue.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => handleAction("View", item.id)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => handleAction("Edit", item.id)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-600"
                        onClick={() => handleAction("Delete", item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Inventory;


import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Download, FileBarChart2, FilePieChart, FileSpreadsheet, PieChart, BarChart2, LineChart } from "lucide-react";

const Reports = () => {
  const { toast } = useToast();

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Report Generated",
      description: `Your ${reportType} report has been generated successfully.`,
    });
  };

  const reportCategories = [
    {
      id: "financial",
      name: "Financial",
      reports: [
        {
          id: "profit-loss",
          name: "Profit & Loss",
          description: "View your income, expenses, and profit over time",
          icon: <BarChart2 size={36} className="text-ledger-600" />,
        },
        {
          id: "balance-sheet",
          name: "Balance Sheet",
          description: "Track your assets, liabilities, and equity",
          icon: <FileSpreadsheet size={36} className="text-ledger-600" />,
        },
        {
          id: "cash-flow",
          name: "Cash Flow",
          description: "Monitor your cash inflows and outflows",
          icon: <LineChart size={36} className="text-ledger-600" />,
        },
      ],
    },
    {
      id: "tax",
      name: "Tax",
      reports: [
        {
          id: "tax-summary",
          name: "Tax Summary",
          description: "Summary of tax collected and paid",
          icon: <FileBarChart2 size={36} className="text-ledger-600" />,
        },
        {
          id: "sales-tax",
          name: "Sales Tax Report",
          description: "Detailed breakdown of sales tax by jurisdiction",
          icon: <FilePieChart size={36} className="text-ledger-600" />,
        },
      ],
    },
    {
      id: "inventory",
      name: "Inventory",
      reports: [
        {
          id: "stock-summary",
          name: "Stock Summary",
          description: "Overview of your current inventory levels",
          icon: <PieChart size={36} className="text-ledger-600" />,
        },
        {
          id: "inventory-valuation",
          name: "Inventory Valuation",
          description: "Total value of your inventory items",
          icon: <FileBarChart2 size={36} className="text-ledger-600" />,
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1">
            Generate and analyze comprehensive financial reports.
          </p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-2">
          <Button variant="outline" className="flex items-center">
            <Calendar size={16} className="mr-2" />
            Select Date Range
          </Button>
          <Button className="flex items-center bg-ledger-600 hover:bg-ledger-700">
            <Download size={16} className="mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          {reportCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {reportCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.reports.map((report) => (
                <Card key={report.id} className="border border-gray-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      {report.icon}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-500"
                        onClick={() => handleGenerateReport(report.name)}
                      >
                        <Download size={18} />
                      </Button>
                    </div>
                    <CardTitle className="mt-4">{report.name}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-ledger-600 hover:bg-ledger-700"
                      onClick={() => handleGenerateReport(report.name)}
                    >
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Recently Generated Reports</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div className="flex items-center">
              <FileBarChart2 size={24} className="text-ledger-600 mr-3" />
              <div>
                <h3 className="font-medium">Profit & Loss</h3>
                <p className="text-sm text-gray-500">Generated 2 days ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div className="flex items-center">
              <FilePieChart size={24} className="text-ledger-600 mr-3" />
              <div>
                <h3 className="font-medium">Sales Tax Report</h3>
                <p className="text-sm text-gray-500">Generated 1 week ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div className="flex items-center">
              <FileSpreadsheet size={24} className="text-ledger-600 mr-3" />
              <div>
                <h3 className="font-medium">Balance Sheet</h3>
                <p className="text-sm text-gray-500">Generated 2 weeks ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;

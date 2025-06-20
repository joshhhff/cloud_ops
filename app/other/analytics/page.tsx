'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, TrendingUp, DollarSign, TrendingDown, Calculator } from 'lucide-react';
import { DashboardCard } from '@/components/tables/dashboard-card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Line } from "recharts";
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export default function Reports() {
    const [showTrendLines, setShowTrendLines] = useState(true);
  const reports = [
    {
      title: 'Financial Summary',
      description: 'Comprehensive financial overview with P&L, balance sheet, and cash flow',
      icon: TrendingUp,
      lastGenerated: '2024-01-15',
    },
    {
      title: 'Sales Performance',
      description: 'Detailed sales analytics, customer trends, and product performance',
      icon: FileText,
      lastGenerated: '2024-01-14',
    },
    {
      title: 'Inventory Report',
      description: 'Stock levels, reorder alerts, and inventory valuation',
      icon: FileText,
      lastGenerated: '2024-01-13',
    },
    {
      title: 'Customer Analysis',
      description: 'Customer behavior, lifetime value, and segmentation analysis',
      icon: FileText,
      lastGenerated: '2024-01-12',
    },
  ];

  const expenseData = [
  { name: "Salaries", value: 25000, color: "#3B82F6" },
  { name: "Marketing", value: 8000, color: "#10B981" },
  { name: "Operations", value: 12000, color: "#F59E0B" },
  { name: "Technology", value: 6000, color: "#EF4444" },
  { name: "Other", value: 4000, color: "#8B5CF6" },
];

const cashFlowData = [
  { month: "Jan", income: 45000, expenses: 32000, netCashFlow: 13000 },
  { month: "Feb", income: 52000, expenses: 35000, netCashFlow: 17000 },
  { month: "Mar", income: 48000, expenses: 33000, netCashFlow: 15000 },
  { month: "Apr", income: 61000, expenses: 38000, netCashFlow: 23000 },
  { month: "May", income: 55000, expenses: 36000, netCashFlow: 19000 },
  { month: "Jun", income: 67000, expenses: 40000, netCashFlow: 27000 },
];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
        <p className="text-slate-600 mt-2">Generate and view comprehensive business reports.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <report.icon className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">{report.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>Last generated: {report.lastGenerated}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Cash Flow Analysis {showTrendLines ? "with Trends" : ""}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show Trends</span>
              <Switch
                checked={showTrendLines}
                onCheckedChange={setShowTrendLines}
              />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {showTrendLines ? (
              <ComposedChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#10B981" name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                <Bar dataKey="netCashFlow" fill="#3B82F6" name="Net Cash Flow" />
                <Line type="monotone" dataKey="income" stroke="#059669" strokeWidth={3} dot={{ fill: "#059669", strokeWidth: 2, r: 4 }} name="Income Trend" />
                <Line type="monotone" dataKey="expenses" stroke="#DC2626" strokeWidth={3} dot={{ fill: "#DC2626", strokeWidth: 2, r: 4 }} name="Expenses Trend" />
                <Line type="monotone" dataKey="netCashFlow" stroke="#1D4ED8" strokeWidth={3} dot={{ fill: "#1D4ED8", strokeWidth: 2, r: 4 }} name="Net Cash Flow Trend" />
              </ComposedChart>
            ) : (
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#10B981" name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                <Bar dataKey="netCashFlow" fill="#3B82F6" name="Net Cash Flow" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
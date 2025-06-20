'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PoundSterlingIcon, ShoppingCart, Users, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { kpiData } from '@/lib/mock-data';

export default function KPICards() {
  const kpis = [
    {
      title: 'Total Revenue',
      value: `£${kpiData.totalRevenue.toLocaleString()}`,
      change: `+${kpiData.monthlyGrowth}%`,
      isPositive: true,
      icon: PoundSterlingIcon,
    },
    {
      title: 'Total Orders',
      value: kpiData.totalOrders.toLocaleString(),
      change: '+12%',
      isPositive: true,
      icon: ShoppingCart,
    },
    {
      title: 'Active Customers',
      value: kpiData.activeCustomers.toLocaleString(),
      change: '+8%',
      isPositive: true,
      icon: Users,
    },
    {
      title: 'Inventory Value',
      value: `£${kpiData.inventoryValue.toLocaleString()}`,
      change: '-2%',
      isPositive: false,
      icon: Package,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {kpis.map((kpi, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-5 w-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{kpi.value}</div>
            <div className="flex items-center space-x-1 text-sm">
              {kpi.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={kpi.isPositive ? 'text-green-600' : 'text-red-600'}>
                {kpi.change}
              </span>
              <span className="text-slate-500">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
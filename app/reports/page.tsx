import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';

export default function Reports() {
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
    </div>
  );
}
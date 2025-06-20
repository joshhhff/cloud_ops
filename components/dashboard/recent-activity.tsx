'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { recentTransactions, topProducts } from '@/lib/mock-data';

export default function RecentActivity() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{transaction.customer}</div>
                  <div className="text-sm text-slate-500">{transaction.id} • {transaction.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">£{transaction.amount.toLocaleString()}</div>
                  <Badge 
                    variant={
                      transaction.status === 'Completed' 
                        ? 'secondary' 
                        : transaction.status === 'Pending' 
                        ? 'outline' 
                        : 'default'
                    }
                    className="text-xs"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{product.name}</div>
                  <div className="text-sm text-slate-500">{product.units} units sold</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">£{product.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
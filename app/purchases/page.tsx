import DataTable from '@/components/tables/data-table';
import { recentTransactions } from '@/lib/mock-data';

const columns = [
  { key: 'id', label: 'Transaction ID', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
];

export default function Accounting() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Accounting</h1>
        <p className="text-slate-600 mt-2">Manage your financial transactions and accounting records.</p>
      </div>
      
      <DataTable 
        data={recentTransactions} 
        columns={columns} 
        title="Recent Transactions"
        searchKey="customer"
      />
    </div>
  );
}
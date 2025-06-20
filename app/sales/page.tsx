import DataTable from '@/components/tables/data-table';
import { salesData } from '@/lib/mock-data';

const columns = [
  { key: 'id', label: 'Transaction Number', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'memo', label: 'Memo', sortable: false },
  { key: 'total', label: 'Total', sortable: true },
];

export default function Sales() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Sales Management</h1>
        <p className="text-slate-600 mt-2">Monitor and manage your sales transactions.</p>
      </div>
      
      <DataTable 
        data={salesData} 
        columns={columns} 
        title="Sales Transactions"
        searchKey="customer"
      />
    </div>
  );
}
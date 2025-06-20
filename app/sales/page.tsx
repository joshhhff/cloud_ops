import DataTable from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { salesData } from '@/lib/mock-data';
import Link from 'next/link';

const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'docnumber', label: 'Transaction Number', sortable: true },
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
        <Link href="/sales/new_sale" className="inline-block mt-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" variant="default">
          New Sale
        </Button>
        </Link>
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
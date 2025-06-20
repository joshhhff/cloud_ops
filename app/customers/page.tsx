import DataTable from '@/components/tables/data-table';
import { customers } from '@/lib/mock-data';

const columns = [
  { key: 'id', label: 'Customer ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'phone', label: 'Phone', sortable: true },
  { key: 'totalOrders', label: 'Total Orders', sortable: true },
  { key: 'totalValue', label: 'Total Value', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export default function Customers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Customer Management</h1>
        <p className="text-slate-600 mt-2">Manage your customer relationships and information.</p>
      </div>
      
      <DataTable 
        data={customers} 
        columns={columns} 
        title="Customer Directory"
        searchKey="name"
      />
    </div>
  );
}
import DataTable from '@/components/tables/data-table';
import { inventoryItems } from '@/lib/mock-data';

const columns = [
  { key: 'id', label: 'Item ID', sortable: true },
  { key: 'name', label: 'Product Name', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'stock', label: 'Stock Level', sortable: true },
  { key: 'reorderLevel', label: 'Reorder Level', sortable: true },
  { key: 'unitCost', label: 'Unit Cost', sortable: true },
];

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
        <p className="text-slate-600 mt-2">Track and manage your product inventory levels.</p>
      </div>
      
      <DataTable 
        data={inventoryItems} 
        columns={columns} 
        title="Inventory Items"
        searchKey="name"
      />
    </div>
  );
}
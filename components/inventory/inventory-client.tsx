'use client';

import { useState } from 'react';
import DataTable from '@/components/tables/data-table';
import ItemDetailsModal from '@/components/inventory/item-details-modal';
import CreateItemModal from '@/components/inventory/create-item-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const columns = [
  { key: 'name', label: 'Product Name', sortable: true },
  { key: 'sku', label: 'SKU', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'totalStock', label: 'Total Stock', sortable: true },
  { key: 'reorderLevel', label: 'Reorder Level', sortable: true },
  { key: 'unitCost', label: 'Unit Cost', sortable: true },
  { key: 'isActive', label: 'Status', sortable: true },
];

export default function InventoryClient({ inventoryItems }: any) {
  const [item, setItem] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleRowClick = (item: any) => {
    setItem(item);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-600 mt-2">Track and manage your product inventory levels across all locations.</p>
        </div>
      </div>
        <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      
      <DataTable 
        data={inventoryItems} 
        columns={columns} 
        title="Inventory Items"
        searchKey="name"
        onRowClick={handleRowClick}
      />

      {item && (
        <ItemDetailsModal
          item={item}
          isOpen={!!item}
          onClose={() => setItem(null)}
        />
      )}

      <CreateItemModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}
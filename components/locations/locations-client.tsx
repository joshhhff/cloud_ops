'use client';

import { useState } from 'react';
import DataTable from '@/components/tables/data-table';
import LocationModal from '@/components/locations/location-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'shortName', label: 'Short Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'isActive', label: 'Active', sortable: true },
  { key: 'isFulfillable', label: 'Fulfillable', sortable: true },
];

export default function LocationsClient({ locationData }: any) {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleRowClick = (location: any) => {
    setSelectedLocationId(location.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Location Management</h1>
          <p className="text-slate-600 mt-2">Create and manage your physical and virtual locations.</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Location
        </Button>
      </div>

      <DataTable
        data={locationData}
        columns={columns}
        title="Locations"
        searchKey="name"
        onRowClick={handleRowClick}
      />

      {selectedLocationId && (
        <LocationModal
          location={locationData.find((loc: any) => loc.id === selectedLocationId)}
          locations={locationData}
          isOpen={!!selectedLocationId}
          onClose={() => setSelectedLocationId(null)}
        />
      )}

      <LocationModal
        isCreateMode={true}
        locations={locationData}
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}

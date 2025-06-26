'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, MoreHorizontal, Edit, Trash2, Package } from 'lucide-react';
import CreateBinModal from '@/components/wms-config/create-bin-modal';
import EditBinModal from '@/components/wms-config/edit-bin-modal';

export default function BinsManagement({ locations }: any) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBin, setEditingBin] = useState<any>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('all');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('all');
  const [selectedAisleId, setSelectedAisleId] = useState<string>('all');

  const handleEditBin = (bin: any) => setEditingBin(bin);
  const handleDeleteBin = async (id: string) => {
    const deleteBinRequest = await fetch(`/api/other/wms-config/bins?id=${id}`, {
      method: 'DELETE',
    });

    const deleteBinResponse = await deleteBinRequest.json();

    if (!deleteBinRequest.ok) {
      alert(`Error deleting bin: ${deleteBinResponse.error}`);
      return;
    }

    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  const handleLocationChange = (id: string) => {
    setSelectedLocationId(id);
    setSelectedZoneId('all');
    setSelectedAisleId('all');
  };

  const handleZoneChange = (id: string) => {
    setSelectedZoneId(id);
    setSelectedAisleId('all');
  };

  const filteredBins = locations.flatMap((location: any) =>
    (selectedLocationId === 'all' || selectedLocationId === location.id)
      ? (location.zones ?? []).flatMap((zone: any) =>
          (selectedZoneId === 'all' || selectedZoneId === zone.id)
            ? (zone.aisles ?? []).flatMap((aisle: any) =>
                (selectedAisleId === 'all' || selectedAisleId === aisle.id)
                  ? (aisle.bins ?? []).map((bin: any) => ({
                      bin,
                      aisle,
                      zone,
                      location,
                    }))
                  : []
              )
            : []
        )
      : []
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Bins Management</h2>
          <p className="text-slate-600 mt-1">Manage storage bins within your warehouse aisles.</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Bin
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>All Bins</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              {/* Location Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-slate-600">Location:</label>
                <Select value={selectedLocationId} onValueChange={handleLocationChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((loc: any) => (
                      <SelectItem key={loc.id} value={loc.id}>
                        {loc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Zone Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-slate-600">Zone:</label>
                <Select value={selectedZoneId} onValueChange={handleZoneChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select Zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    {locations.flatMap((loc: any) =>
                      (loc.zones ?? []).map((zone: any) => (
                        <SelectItem key={zone.id} value={zone.id}>
                          {zone.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Aisle Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-slate-600">Aisle:</label>
                <Select value={selectedAisleId} onValueChange={setSelectedAisleId}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select Aisle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Aisles</SelectItem>
                    {locations.flatMap((loc: any) =>
                      (loc.zones ?? []).flatMap((zone: any) =>
                        (zone.aisles ?? []).map((aisle: any) => (
                          <SelectItem key={aisle.id} value={aisle.id}>
                            {aisle.name}
                          </SelectItem>
                        ))
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bin Name</TableHead>
                <TableHead>Aisle</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBins.map(({ bin, aisle, zone, location }: any) => (
                <TableRow key={bin.id}>
                  <TableCell>
                    <div className="font-medium text-slate-900">{bin.name}</div>
                    <div className="text-sm text-slate-500">{bin.code}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">{aisle?.name}</div>
                    <div className="text-sm text-slate-500">{aisle?.code}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">{zone?.name}</div>
                    <div className="text-sm text-slate-500">{zone?.code}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">{location?.name}</div>
                    <div className="text-sm text-slate-500">{location?.type}</div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{bin.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{bin.binType || 'Standard'}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditBin(bin)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Bin
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteBin(bin.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Bin
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredBins.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-slate-500 py-10">
                    No bins found for the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateBinModal locations={locations} isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />

      {editingBin && (
        <EditBinModal
            locations={locations}
          bin={editingBin}
          isOpen={!!editingBin}
          onClose={() => setEditingBin(null)}
        />
      )}
    </div>
  );
}

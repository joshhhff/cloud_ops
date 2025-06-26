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
import CreateBinModal from '@/components/wms-config/create-bin-modal';
import EditBinModal from '@/components/wms-config/edit-bin-modal';
import { bins, aisles, zones, locations, getAisleById, getZoneById, getLocationById } from '@/lib/mock-data';
import { Plus, MoreHorizontal, Edit, Trash2, Package } from 'lucide-react';

export default function BinsManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBin, setEditingBin] = useState<any>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('all');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('all');
  const [selectedAisleId, setSelectedAisleId] = useState<string>('all');

  // Filter zones by selected location
  const filteredZones = selectedLocationId === 'all' 
    ? zones 
    : zones.filter(zone => zone.locationId === selectedLocationId);

  // Filter aisles by selected zone
  const filteredAisles = selectedZoneId === 'all' 
    ? aisles.filter(aisle => {
        if (selectedLocationId === 'all') return true;
        const zone = getZoneById(aisle.zoneId);
        return zone?.locationId === selectedLocationId;
      })
    : aisles.filter(aisle => aisle.zoneId === selectedZoneId);

  // Filter bins by selected aisle
  const filteredBins = selectedAisleId === 'all' 
    ? bins.filter(bin => {
        if (selectedZoneId !== 'all') {
          const aisle = getAisleById(bin.aisleId);
          return aisle?.zoneId === selectedZoneId;
        }
        if (selectedLocationId !== 'all') {
          const aisle = getAisleById(bin.aisleId);
          const zone = aisle ? getZoneById(aisle.zoneId) : null;
          return zone?.locationId === selectedLocationId;
        }
        return true;
      })
    : bins.filter(bin => bin.aisleId === selectedAisleId);

  // Only show locations that have advanced WMS enabled
  const wmsEnabledLocations = locations.filter(location => location.advancedWMS);

  const handleEditBin = (bin: any) => {
    setEditingBin(bin);
  };

  const handleDeleteBin = (binId: string) => {
    console.log('Deleting bin:', binId);
    // Here you would typically make an API call to delete the bin
  };

  const handleLocationChange = (locationId: string) => {
    setSelectedLocationId(locationId);
    setSelectedZoneId('all');
    setSelectedAisleId('all');
  };

  const handleZoneChange = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    setSelectedAisleId('all');
  };

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
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-slate-600">Location:</label>
                <Select value={selectedLocationId} onValueChange={handleLocationChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {wmsEnabledLocations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-slate-600">Zone:</label>
                <Select value={selectedZoneId} onValueChange={handleZoneChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    {filteredZones.map((zone) => (
                      <SelectItem key={zone.id} value={zone.id}>
                        {zone.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-slate-600">Aisle:</label>
                <Select value={selectedAisleId} onValueChange={setSelectedAisleId}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Aisles</SelectItem>
                    {filteredAisles.map((aisle) => (
                      <SelectItem key={aisle.id} value={aisle.id}>
                        {aisle.name}
                      </SelectItem>
                    ))}
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
              {filteredBins.map((bin) => {
                const aisle = getAisleById(bin.aisleId);
                const zone = aisle ? getZoneById(aisle.zoneId) : null;
                const location = zone ? getLocationById(zone.locationId) : null;
                return (
                  <TableRow key={bin.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{bin.name}</div>
                        <div className="text-sm text-slate-500">{bin.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{aisle?.name}</div>
                        <div className="text-sm text-slate-500">{aisle?.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{zone?.name}</div>
                        <div className="text-sm text-slate-500">{zone?.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{location?.name}</div>
                        <div className="text-sm text-slate-500">{location?.type}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {bin.description}
                    </TableCell>
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
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateBinModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {editingBin && (
        <EditBinModal
          bin={editingBin}
          isOpen={!!editingBin}
          onClose={() => setEditingBin(null)}
        />
      )}
    </div>
  );
}
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
import CreateAisleModal from '@/components/wms-config/create-aisle-modal';
import EditAisleModal from '@/components/wms-config/edit-aisle-modal';
import { Plus, MoreHorizontal, Edit, Trash2, Grid3X3 } from 'lucide-react';

export default function AislesManagement({ locations }: any) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAisle, setEditingAisle] = useState<any>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('all');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('all');

  const handleEditAisle = (aisle: any) => {
    setEditingAisle(aisle);
  };

  const handleDeleteAisle = async (aisleId: string, numberOfBins: number) => {
    console.log('Deleting aisle:', aisleId);
    // Here you would typically make an API call to delete the aisle
    if (numberOfBins > 0) {
      alert('Cannot delete zone with existing aisles. Please remove aisles first.');
      return;
    }

    const deleteAisleRequest = await fetch(`/api/other/wms-config/aisles?id=${aisleId}`, {
      method: 'DELETE',
    });

    const deleteAisleResponse = await deleteAisleRequest.json();

    if (!deleteAisleRequest.ok) {
      alert(`Error deleting zone: ${deleteAisleResponse.error}`);
      return;
    }

    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const handleLocationChange = (locationId: string) => {
    setSelectedLocationId(locationId);
    setSelectedZoneId('all'); // Reset zone filter when location changes
  };

  console.log('locations', locations); 

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Aisles Management</h2>
          <p className="text-slate-600 mt-1">Manage aisles within your warehouse zones.</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Aisle
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Grid3X3 className="h-5 w-5" />
              <span>All Aisles</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-slate-600">Location:</label>
                <Select value={selectedLocationId} onValueChange={handleLocationChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((location: any) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-slate-600">Zone:</label>
                <Select value={selectedZoneId} onValueChange={setSelectedZoneId}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    {locations.map((location: any) => {
                        return location.zones.map((zone: any) => {
                            return (

                                <SelectItem key={zone.id} value={zone.id}>
                                  {zone.name}
                                </SelectItem>
                            )
                        }
                    )})}
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
                <TableHead>Aisle Name</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Bins Count</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map((location: any) => {
                return location.zones.map((zone: any) => {
                    return zone.aisles.map((aisle: any) => {
                        return (
                            <TableRow key={aisle.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{aisle.name}</div>
                        <div className="text-sm text-slate-500">{aisle.code}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{zone?.name}</div>
                        <div className="text-sm text-slate-500">{zone?.code}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{location?.name}</div>
                        <div className="text-sm text-slate-500">{location?.type}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {aisle.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{aisle?.bins.length} bins</Badge>
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
                          <DropdownMenuItem onClick={() => handleEditAisle(aisle)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Aisle
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteAisle(aisle.id, aisle?.bins.length)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Aisle
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                        );
                    });
                });
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateAisleModal
        locations={locations}
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {editingAisle && (
        <EditAisleModal
            locations={locations}
          aisle={editingAisle}
          isOpen={!!editingAisle}
          onClose={() => setEditingAisle(null)}
        />
      )}
    </div>
  );
}
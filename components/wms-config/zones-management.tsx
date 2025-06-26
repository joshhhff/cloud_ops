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
import CreateZoneModal from '@/components/wms-config/create-zone-modal';
import EditZoneModal from '@/components/wms-config/edit-zone-modal';
import { Plus, MoreHorizontal, Edit, Trash2, MapPin } from 'lucide-react';

export default function ZonesManagement({ locations }: any) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingZone, setEditingZone] = useState<any>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('all');

  const handleEditZone = (zone: any) => {
    setEditingZone(zone);
  };

  const handleDeleteZone = async (zoneId: string, numberOfAisles: number) => {
    console.log('Deleting zone:', zoneId);

    if (numberOfAisles > 0) {
      alert('Cannot delete zone with existing aisles. Please remove aisles first.');
      return;
    }

    const deleteZoneRequest = await fetch(`/api/other/wms-config/zones?id=${zoneId}`, {
      method: 'DELETE',
    });

    const deleteZoneResponse = await deleteZoneRequest.json();

    if (!deleteZoneRequest.ok) {
      alert(`Error deleting zone: ${deleteZoneResponse.error}`);
      return;
    }

    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Zones Management</h2>
          <p className="text-slate-600 mt-1">Manage zones within your warehouse locations.</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Zone
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>All Zones</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-slate-600">Filter by Location:</label>
              <Select value={selectedLocationId} onValueChange={setSelectedLocationId}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select a location" />
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
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Aisles Count</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations
                .filter((location: any) =>
                  selectedLocationId === 'all' ? true : location.id === selectedLocationId
                )
                .flatMap((location: any) =>
                  location.zones.map((zone: any) => (
                    <TableRow key={zone.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-900">{zone.name}</div>
                          <div className="text-sm text-slate-500">{zone.code}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-900">{location?.name}</div>
                          <div className="text-sm text-slate-500">{location?.type}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{zone.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {zone.aisles.length} aisle{zone.aisles.length === 1 ? '' : 's'}
                        </Badge>
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
                            <DropdownMenuItem onClick={() => handleEditZone(zone)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Zone
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteZone(zone.id, zone.aisles.length)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Zone
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateZoneModal
        locations={locations}
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {editingZone && (
        <EditZoneModal
          zone={editingZone}
          locations={locations}
          isOpen={!!editingZone}
          onClose={() => setEditingZone(null)}
        />
      )}
    </div>
  );
}

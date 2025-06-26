'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Package } from 'lucide-react';

interface EditBinModalProps {
  locations: any[];
  bin: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditBinModal({ locations, bin, isOpen, onClose }: EditBinModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    aisleId: '',
    description: '',
    code: '',
  });

  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [selectedZoneId, setSelectedZoneId] = useState('');
  const [selectedAisleId, setSelectedAisleId] = useState('');

  useEffect(() => {
    if (bin) {
    const aisle = locations
      .flatMap((location: any) => location.zones)
      .flatMap((zone: any) => zone.aisles)
      .find((a: any) => a.id === bin.aisleId);

    const zone = locations
      .flatMap((location: any) => location.zones)
      .find((z: any) => z.id === aisle?.zoneId);

    const location = locations.find((loc: any) => loc.id === zone?.locationId);

      setFormData({
        name: bin.name || '',
        aisleId: bin.aisleId || '',
        description: bin.description || '',
        code: bin.code || '',
      });

      setSelectedLocationId(zone?.locationId || '');
      setSelectedZoneId(aisle?.zoneId || '');
      setSelectedAisleId(bin.aisleId || ''); // ✅ important to set this
    }
  }, [bin]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (locationId: string) => {
    setSelectedLocationId(locationId);
    setSelectedZoneId('');
    setSelectedAisleId('');
    setFormData(prev => ({ ...prev, aisleId: '' }));
  };

  const handleZoneChange = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    setSelectedAisleId('');
    setFormData(prev => ({ ...prev, aisleId: '' }));
  };

  const handleAisleChange = (aisleId: string) => {
    setSelectedAisleId(aisleId);
    setFormData(prev => ({ ...prev, aisleId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating bin:', bin.id, formData);
    
    const dataToSend = {
        name: formData.name,
        code: formData.code,
        description: formData.description,
        aisleId: formData.aisleId,
    }

    const updateBinRequest = await fetch(`/api/other/wms-config/bins`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: bin.id, ...dataToSend }),
    });

    const updateBinResponse = await updateBinRequest.json();

    if (!updateBinRequest.ok) {
      alert(`Error updating bin: ${updateBinResponse.error}`);
      return;
    } else {
      if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }

    onClose();
  };

  const zones = selectedLocationId
    ? locations.find((l) => l.id === selectedLocationId)?.zones ?? []
    : [];

  const aisles = selectedZoneId
    ? zones.find((z: any) => z.id === selectedZoneId)?.aisles ?? []
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit className="h-5 w-5" />
            <span>Edit Bin - {bin?.name}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Bin Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Bin Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., A1-01, B2-15, SHELF-001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="code">Bin Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    required
                    placeholder="e.g., SHELF-001"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Select
                    value={selectedLocationId}
                    onValueChange={handleLocationChange}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc.id} value={loc.id}>
                          {loc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zone">Zone *</Label>
                  <Select
                    value={selectedZoneId}
                    onValueChange={handleZoneChange}
                    disabled={!selectedLocationId}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {zones.map((zone: any) => (
                        <SelectItem key={zone.id} value={zone.id}>
                          {zone.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="aisleId">Aisle *</Label>
                  <Select
                    value={selectedAisleId}
                    onValueChange={handleAisleChange}
                    disabled={!selectedZoneId}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Aisle" />
                    </SelectTrigger>
                    <SelectContent>
                      {aisles.map((aisle: any) => (
                        <SelectItem key={aisle.id} value={aisle.id}>
                          {aisle.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the bin location and purpose"
                  rows={2}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Edit className="h-4 w-4 mr-2" />
              Update Bin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

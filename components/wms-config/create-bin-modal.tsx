'use client';

import { useState } from 'react';
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
import { aisles, zones, locations, getZoneById, getLocationById } from '@/lib/mock-data';
import { Plus, Package } from 'lucide-react';

interface CreateBinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBinModal({ isOpen, onClose }: CreateBinModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    aisleId: '',
    description: '',
    binType: '',
    capacity: '',
    weight: '',
    height: '',
    barcode: '',
    notes: '',
  });

  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [selectedZoneId, setSelectedZoneId] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (locationId: string) => {
    setSelectedLocationId(locationId);
    setSelectedZoneId('');
    setFormData(prev => ({ ...prev, aisleId: '' }));
  };

  const handleZoneChange = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    setFormData(prev => ({ ...prev, aisleId: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to create the new bin
    console.log('Creating new bin:', formData);

    // Reset form and close modal
    setFormData({
      name: '',
      aisleId: '',
      description: '',
      binType: '',
      capacity: '',
      weight: '',
      height: '',
      barcode: '',
      notes: '',
    });
    setSelectedLocationId('');
    setSelectedZoneId('');
    onClose();
  };

  // Only show locations that have advanced WMS enabled
  const wmsEnabledLocations = locations.filter(location => location.advancedWMS);

  // Filter zones by selected location
  const filteredZones = selectedLocationId 
    ? zones.filter(zone => zone.locationId === selectedLocationId)
    : [];

  // Filter aisles by selected zone
  const filteredAisles = selectedZoneId 
    ? aisles.filter(aisle => aisle.zoneId === selectedZoneId)
    : [];

  const binTypes = [
    'Standard Bin',
    'Shelf Bin',
    'Drawer Bin',
    'Pallet Location',
    'Floor Location',
    'Hanging Bin',
    'Bulk Bin',
    'Pick Bin'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add New Bin</span>
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
                  <Label htmlFor="binType">Bin Type</Label>
                  <Select value={formData.binType} onValueChange={(value) => handleInputChange('binType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bin type" />
                    </SelectTrigger>
                    <SelectContent>
                      {binTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Select value={selectedLocationId} onValueChange={handleLocationChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {wmsEnabledLocations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}
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
                    required
                    disabled={!selectedLocationId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={selectedLocationId ? "Select zone" : "Select location first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredZones.map((zone) => (
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
                    value={formData.aisleId} 
                    onValueChange={(value) => handleInputChange('aisleId', value)} 
                    required
                    disabled={!selectedZoneId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={selectedZoneId ? "Select aisle" : "Select zone first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredAisles.map((aisle) => (
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

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="capacity">Capacity (units)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Max Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="500"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (ft)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder="8.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="barcode">Barcode/QR Code</Label>
                <Input
                  id="barcode"
                  value={formData.barcode}
                  onChange={(e) => handleInputChange('barcode', e.target.value)}
                  placeholder="Barcode or QR code for this bin"
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional information about this bin"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Bin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
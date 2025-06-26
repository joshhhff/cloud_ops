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
import { zones, locations, getZoneById } from '@/lib/mock-data';
import { Edit, Grid3X3 } from 'lucide-react';

interface EditAisleModalProps {
  aisle: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditAisleModal({ aisle, isOpen, onClose }: EditAisleModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    zoneId: '',
    description: '',
    aisleType: '',
    length: '',
    width: '',
    height: '',
    notes: '',
  });

  const [selectedLocationId, setSelectedLocationId] = useState('');

  useEffect(() => {
    if (aisle) {
      const zone = getZoneById(aisle.zoneId);
      setFormData({
        name: aisle.name || '',
        zoneId: aisle.zoneId || '',
        description: aisle.description || '',
        aisleType: aisle.aisleType || '',
        length: aisle.length || '',
        width: aisle.width || '',
        height: aisle.height || '',
        notes: aisle.notes || '',
      });
      setSelectedLocationId(zone?.locationId || '');
    }
  }, [aisle]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (locationId: string) => {
    setSelectedLocationId(locationId);
    setFormData(prev => ({ ...prev, zoneId: '' })); // Reset zone when location changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to update the aisle
    console.log('Updating aisle:', aisle.id, formData);

    onClose();
  };

  // Only show locations that have advanced WMS enabled
  const wmsEnabledLocations = locations.filter(location => location.advancedWMS);

  // Filter zones by selected location
  const filteredZones = selectedLocationId 
    ? zones.filter(zone => zone.locationId === selectedLocationId)
    : [];

  const aisleTypes = [
    'Standard Aisle',
    'Wide Aisle',
    'Narrow Aisle',
    'Very Narrow Aisle (VNA)',
    'Drive-In Aisle',
    'Pick Aisle',
    'Bulk Storage Aisle'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit className="h-5 w-5" />
            <span>Edit Aisle - {aisle?.name}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Grid3X3 className="h-4 w-4" />
                <span>Aisle Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Aisle Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., A1, B2, Main-01"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="aisleType">Aisle Type</Label>
                  <Select value={formData.aisleType} onValueChange={(value) => handleInputChange('aisleType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select aisle type" />
                    </SelectTrigger>
                    <SelectContent>
                      {aisleTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="zoneId">Zone *</Label>
                  <Select 
                    value={formData.zoneId} 
                    onValueChange={(value) => handleInputChange('zoneId', value)} 
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
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the purpose and contents of this aisle"
                  rows={2}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="length">Length (ft)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    value={formData.length}
                    onChange={(e) => handleInputChange('length', e.target.value)}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label htmlFor="width">Width (ft)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    value={formData.width}
                    onChange={(e) => handleInputChange('width', e.target.value)}
                    placeholder="12"
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
                    placeholder="20"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional information about this aisle"
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
              <Edit className="h-4 w-4 mr-2" />
              Update Aisle
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
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
import { Plus, MapPin } from 'lucide-react';

interface CreateZoneModalProps {
    locations: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateZoneModal({ locations, isOpen, onClose }: CreateZoneModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    locationId: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to create the new zone
    console.log('Creating new zone:', formData);

    const newZoneRequest = await fetch('/api/other/wms-config/zones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const newZoneResponse = await newZoneRequest.json();

    if (!newZoneRequest.ok) {
        alert(`Error creating zone: ${newZoneResponse.error}`);
        return;
    } else {
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }

    // Reset form and close modal
    setFormData({
      name: '',
      code: '',
      locationId: '',
      description: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add New Zone</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Zone Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Zone Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Zone A, Cold Storage 1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="locationId">Location *</Label>
                  <Select value={formData.locationId} onValueChange={(value) => handleInputChange('locationId', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location: any) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                  <Label htmlFor="name">Zone Code *</Label>
                  <Input
                    id="name"
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    placeholder="e.g., ZONE-001, COLD-001"
                    required
                  />
                </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the purpose and contents of this zone"
                  rows={2}
                />
              </div>

              {/* <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zoneType">Zone Type</Label>
                  <Select value={formData.zoneType} onValueChange={(value) => handleInputChange('zoneType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select zone type" />
                    </SelectTrigger>
                    <SelectContent>
                      {zoneTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="capacity">Capacity (sq ft)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    placeholder="1000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional information about this zone"
                  rows={2}
                />
              </div> */}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Zone
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
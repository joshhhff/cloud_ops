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
import { zones, locations, getLocationById } from '@/lib/mock-data';
import { Plus, Grid3X3 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CreateAisleModalProps {
    locations: any[];
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateAisleModal({ locations, isOpen, onClose }: CreateAisleModalProps) {
    const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    zoneId: '',
    description: '',
  });

  const [selectedLocationId, setSelectedLocationId] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (locationId: string) => {
    setSelectedLocationId(locationId);
    setFormData(prev => ({ ...prev, zoneId: '' })); // Reset zone when location changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to create the new aisle
    console.log('Creating new aisle:', formData);

    const newAisleRequest = await fetch('/api/other/wms-config/aisles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const newAisleResponse = await newAisleRequest.json();

    if (!newAisleRequest.ok) {
        alert(`Error creating zone: ${newAisleResponse.error}`);
        return;
    } else {
        router.push('/other/wms-config?activeTab=aisles');
    }

    // Reset form and close modal
    setFormData({
      name: '',
      code: '',
      zoneId: '',
      description: '',
    });
    setSelectedLocationId('');
    onClose();
  };

  const aisleTypes = [
    'Standard Aisle',
    'Wide Aisle',
    'Narrow Aisle',
    'Very Narrow Aisle (VNA)',
    'Drive-In Aisle',
    'Pick Aisle',
    'Bulk Storage Aisle'
  ];

  console.log('locations:', locations);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add New Aisle</span>
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
                  <Label htmlFor="name">Aisle Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    placeholder="e.g., A1, B2, Main-01"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Select value={selectedLocationId} onValueChange={handleLocationChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location first" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
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
                        {/* 
                        
                        - this is just because typescript complains about selectedLocationId being undefined at first
                        - however all zones won't ever be listed - front end logic exists to only enable this field once there is a selected location
                        */}
                    {(selectedLocationId
                        ? locations.find((location: any) => location.id === selectedLocationId)?.zones
                        : locations.flatMap((location: any) => location.zones)
                    ).map((zone: any) => (
                        <SelectItem key={zone.id} value={zone.id}>
                            {zone.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the purpose and contents of this aisle"
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
              Create Aisle
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
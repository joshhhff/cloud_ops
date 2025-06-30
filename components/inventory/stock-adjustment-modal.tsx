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
import { 
  getItemById, 
  locations, 
  getStockByItem,
  zones,
  aisles,
  bins,
  getZonesByLocation,
  getAislesByZone,
  getBinsByAisle,
  getLocationById,
  getZoneById,
  getAisleById,
  getBinById
} from '@/lib/mock-data';
import { Settings, Plus, Minus, ArrowRightLeft } from 'lucide-react';

interface StockAdjustmentModalProps {
  item: any;
  isOpen: boolean;
  onClose: () => void;
}

export default async function StockAdjustmentModal({ item, isOpen, onClose }: StockAdjustmentModalProps) {
  const [adjustmentType, setAdjustmentType] = useState<'increase' | 'decrease' | 'transfer'>('increase');
  const [locationId, setLocationId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [aisleId, setAisleId] = useState('');
  const [binId, setBinId] = useState('');
  const [toLocationId, setToLocationId] = useState('');
  const [toZoneId, setToZoneId] = useState('');
  const [toAisleId, setToAisleId] = useState('');
  const [toBinId, setToBinId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [reference, setReference] = useState('');
  const [notes, setNotes] = useState('');
    const [stockLevels, setStockLevels] = useState<any[]>([]);


  if (!item) return null;

  // Get available zones, aisles, and bins based on selections
  const availableZones = locationId ? getZonesByLocation(locationId) : [];
  const availableAisles = zoneId ? getAislesByZone(zoneId) : [];
  const availableBins = aisleId ? getBinsByAisle(aisleId) : [];

  const toAvailableZones = toLocationId ? getZonesByLocation(toLocationId) : [];
  const toAvailableAisles = toZoneId ? getAislesByZone(toZoneId) : [];
  const toAvailableBins = toAisleId ? getBinsByAisle(toAisleId) : [];

  const handleLocationChange = (newLocationId: string) => {
    setLocationId(newLocationId);
    setZoneId('');
    setAisleId('');
    setBinId('');
  };

  const handleZoneChange = (newZoneId: string) => {
    setZoneId(newZoneId);
    setAisleId('');
    setBinId('');
  };

  const handleAisleChange = (newAisleId: string) => {
    setAisleId(newAisleId);
    setBinId('');
  };

  const handleToLocationChange = (newLocationId: string) => {
    setToLocationId(newLocationId);
    setToZoneId('');
    setToAisleId('');
    setToBinId('');
  };

  const handleToZoneChange = (newZoneId: string) => {
    setToZoneId(newZoneId);
    setToAisleId('');
    setToBinId('');
  };

  const handleToAisleChange = (newAisleId: string) => {
    setToAisleId(newAisleId);
    setToBinId('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to create the stock adjustment
    console.log('Stock adjustment:', {
      //itemId,
      adjustmentType,
      locationId,
      zoneId,
      aisleId,
      binId,
      toLocationId,
      toZoneId,
      toAisleId,
      toBinId,
      quantity: parseInt(quantity),
      reason,
      reference,
      notes,
    });

    // Reset form and close modal
    setAdjustmentType('increase');
    setLocationId('');
    setZoneId('');
    setAisleId('');
    setBinId('');
    setToLocationId('');
    setToZoneId('');
    setToAisleId('');
    setToBinId('');
    setQuantity('');
    setReason('');
    setReference('');
    setNotes('');
    onClose();
  };

  const getAdjustmentIcon = () => {
    switch (adjustmentType) {
      case 'increase':
        return <Plus className="h-4 w-4" />;
      case 'decrease':
        return <Minus className="h-4 w-4" />;
      case 'transfer':
        return <ArrowRightLeft className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const reasonOptions = {
    increase: [
      'New stock received',
      'Purchase order',
      'Return from customer',
      'Production completed',
      'Inventory count adjustment',
      'Other'
    ],
    decrease: [
      'Sale/shipment',
      'Damaged goods',
      'Expired items',
      'Theft/loss',
      'Quality control rejection',
      'Other'
    ],
    transfer: [
      'Location transfer',
      'Rebalancing stock',
      'Customer request',
      'Seasonal adjustment',
      'Other'
    ]
  };

  // Get current stock for selected bin
  const currentStock = binId && Array.isArray(stockLevels) && stockLevels.length > 0
    ? stockLevels.find((s: any) => s.binId === binId)
    : null;


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Stock Adjustment - {item.name}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                {getAdjustmentIcon()}
                <span>Adjustment Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adjustmentType">Adjustment Type</Label>
                  <Select value={adjustmentType} onValueChange={(value: any) => setAdjustmentType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="increase">
                        <div className="flex items-center space-x-2">
                          <Plus className="h-4 w-4 text-green-600" />
                          <span>Increase Stock</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="decrease">
                        <div className="flex items-center space-x-2">
                          <Minus className="h-4 w-4 text-red-600" />
                          <span>Decrease Stock</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="transfer">
                        <div className="flex items-center space-x-2">
                          <ArrowRightLeft className="h-4 w-4 text-blue-600" />
                          <span>Transfer Stock</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    required
                  />
                </div>
              </div>

              {/* From Location Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">
                  {adjustmentType === 'transfer' ? 'From Location' : 'Location'}
                </h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select value={locationId} onValueChange={handleLocationChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
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
                    <Label htmlFor="zone">Zone</Label>
                    <Select value={zoneId} onValueChange={handleZoneChange} disabled={!locationId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select zone" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableZones.map((zone) => (
                          <SelectItem key={zone.id} value={zone.id}>
                            {zone.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="aisle">Aisle</Label>
                    <Select value={aisleId} onValueChange={handleAisleChange} disabled={!zoneId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select aisle" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableAisles.map((aisle) => (
                          <SelectItem key={aisle.id} value={aisle.id}>
                            {aisle.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bin">Bin</Label>
                    <Select value={binId} onValueChange={setBinId} disabled={!aisleId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bin" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableBins.map((bin) => (
                          <SelectItem key={bin.id} value={bin.id}>
                            {bin.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* To Location Selection (for transfers) */}
              {adjustmentType === 'transfer' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900">To Location</h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="toLocation">Location</Label>
                      <Select value={toLocationId} onValueChange={handleToLocationChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations
                            .filter(location => location.id !== locationId)
                            .map((location) => (
                              <SelectItem key={location.id} value={location.id}>
                                {location.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="toZone">Zone</Label>
                      <Select value={toZoneId} onValueChange={handleToZoneChange} disabled={!toLocationId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select zone" />
                        </SelectTrigger>
                        <SelectContent>
                          {toAvailableZones.map((zone) => (
                            <SelectItem key={zone.id} value={zone.id}>
                              {zone.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="toAisle">Aisle</Label>
                      <Select value={toAisleId} onValueChange={handleToAisleChange} disabled={!toZoneId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select aisle" />
                        </SelectTrigger>
                        <SelectContent>
                          {toAvailableAisles.map((aisle) => (
                            <SelectItem key={aisle.id} value={aisle.id}>
                              {aisle.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="toBin">Bin</Label>
                      <Select value={toBinId} onValueChange={setToBinId} disabled={!toAisleId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bin" />
                        </SelectTrigger>
                        <SelectContent>
                          {toAvailableBins.map((bin) => (
                            <SelectItem key={bin.id} value={bin.id}>
                              {bin.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reason">Reason</Label>
                  <Select value={reason} onValueChange={setReason} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {reasonOptions[adjustmentType].map((reasonOption) => (
                        <SelectItem key={reasonOption} value={reasonOption}>
                          {reasonOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="PO number, ticket, etc."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional notes about this adjustment..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {currentStock && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Stock Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-600">
                    Location: {getLocationById(currentStock.locationId)?.name} → 
                    {getZoneById(currentStock.zoneId!)?.name} → 
                    {getAisleById(currentStock.aisleId!)?.name} → 
                    {getBinById(currentStock.binId!)?.name}
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-semibold text-blue-600">
                        {currentStock.quantity}
                      </div>
                      <div className="text-sm text-slate-600">On Hand</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-semibold text-green-600">
                        {currentStock.available}
                      </div>
                      <div className="text-sm text-slate-600">Available</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-lg font-semibold text-orange-600">
                        {currentStock.quarantine}
                      </div>
                      <div className="text-sm text-slate-600">Quarantine</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-semibold text-purple-600">
                        {currentStock.onOrder}
                      </div>
                      <div className="text-sm text-slate-600">On Order</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Adjustment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
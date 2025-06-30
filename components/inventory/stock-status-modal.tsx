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
import { getItemById, getLocationById } from '@/lib/mock-data';
import { ArrowRightLeft, Package, MapPin } from 'lucide-react';

interface StockStatusModalProps {
  itemId: string;
  locationStock: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function StockStatusModal({ itemId, locationStock, isOpen, onClose }: StockStatusModalProps) {
  const [adjustmentType, setAdjustmentType] = useState<'available-to-quarantine' | 'quarantine-to-available'>('available-to-quarantine');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const item = getItemById(itemId);
  const location = getLocationById(locationStock?.locationId);

  if (!item || !location || !locationStock) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to adjust the stock status
    console.log('Stock status adjustment:', {
      itemId,
      locationId: locationStock.locationId,
      adjustmentType,
      quantity: parseInt(quantity),
      reason,
      notes,
    });

    // Reset form and close modal
    setAdjustmentType('available-to-quarantine');
    setQuantity('');
    setReason('');
    setNotes('');
    onClose();
  };

  const maxQuantity = adjustmentType === 'available-to-quarantine' 
    ? locationStock.available 
    : locationStock.quarantine;

  const reasonOptions = {
    'available-to-quarantine': [
      'Quality control hold',
      'Damage inspection required',
      'Recall notice',
      'Expiry date check',
      'Customer return inspection',
      'Regulatory compliance',
      'Other'
    ],
    'quarantine-to-available': [
      'Quality control passed',
      'Inspection completed',
      'Issue resolved',
      'Regulatory approval received',
      'Damage assessment cleared',
      'Other'
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ArrowRightLeft className="h-5 w-5" />
            <span>Adjust Stock Status</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item and Location Info */}

          {/* Current Stock Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Stock Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-semibold text-blue-600">
                    {locationStock.quantity}
                  </div>
                  <div className="text-sm text-slate-600">On Hand</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-semibold text-green-600">
                    {locationStock.available}
                  </div>
                  <div className="text-sm text-slate-600">Available</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="text-lg font-semibold text-orange-600">
                    {locationStock.quarantine}
                  </div>
                  <div className="text-sm text-slate-600">Quarantine</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adjustment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status Adjustment</CardTitle>
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
                        <SelectItem value="available-to-quarantine">
                          <div className="flex items-center space-x-2">
                            <ArrowRightLeft className="h-4 w-4 text-orange-600" />
                            <span>Available → Quarantine</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="quarantine-to-available">
                          <div className="flex items-center space-x-2">
                            <ArrowRightLeft className="h-4 w-4 text-green-600" />
                            <span>Quarantine → Available</span>
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
                      max={maxQuantity}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder={`Max: ${maxQuantity}`}
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Maximum available: {maxQuantity} units
                    </p>
                  </div>
                </div>

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
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional notes about this status change..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Adjust Status
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
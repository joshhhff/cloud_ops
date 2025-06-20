'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import ItemSelect from '@/components/ui/item-select';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

type SaleItem = {
  itemID: number | null;
  itemSKU: string | null;
  itemDisplay: string | null;
  rate: number;
  quantity: number;
  grossAmount: number;
  taxAmount: number;
  totalAmount: number;
};

type SelectedItem = { id: string; name: string } | null;

export default function ItemListEditor() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [rate, setRate] = useState<string>('0');
  const [taxRate] = useState<number>(0.1);
  const [items, setItems] = useState<SaleItem[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const numericRate = parseFloat(rate) || 0;
  const grossAmount = quantity * numericRate;
  const taxAmount = grossAmount * taxRate;
  const totalAmount = grossAmount + taxAmount;

  const orderSubtotal = items.reduce((sum, item) => sum + item.grossAmount, 0);
  const orderTaxTotal = items.reduce((sum, item) => sum + item.taxAmount, 0);
  const orderTotal = items.reduce((sum, item) => sum + item.totalAmount, 0);

  const resetForm = () => {
    setSelectedItem(null);
    setRate('0');
    setQuantity(1);
    setEditIndex(null);
  };

  const handleSaveItem = () => {
    if (!selectedItem) return;
    const newItem = {
      itemID: Number(selectedItem.id),
      itemSKU: selectedItem.id, // Assuming SKU is the same as ID for simplicity
      itemDisplay: selectedItem.name,
      rate: numericRate,
      quantity,
      grossAmount,
      taxAmount,
      totalAmount
    };

    const updatedItems = [...items];
    if (editIndex !== null) {
      updatedItems[editIndex] = newItem;
    } else {
      updatedItems.push(newItem);
    }
    setItems(updatedItems);
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEditItem = (index: number) => {
    const item = items[index];
    setSelectedItem(item.itemID ? { id: String(item.itemID), name: item.itemDisplay || '' } : null);
    setRate(item.rate.toString());
    setQuantity(item.quantity);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="space-y-6">
      {items.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="px-4 py-2 text-left font-semibold">SKU</th>
                <th className="px-4 py-2 text-left font-semibold">Description</th>
                <th className="px-4 py-2 text-right font-semibold">Rate</th>
                <th className="px-4 py-2 text-right font-semibold">Qty</th>
                <th className="px-4 py-2 text-right font-semibold">Subtotal</th>
                <th className="px-4 py-2 text-right font-semibold">Tax</th>
                <th className="px-4 py-2 text-right font-semibold">Total</th>
                <th className="px-4 py-2 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                    <td className="px-4 py-2">{item.itemID}</td>
                  <td className="px-4 py-2">{item.itemDisplay}</td>
                  <td className="px-4 py-2 text-right">£{item.rate.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">£{item.grossAmount.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">£{item.taxAmount.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">£{item.totalAmount.toFixed(2)}</td>
                  <td className="px-2 py-2 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditItem(index)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRemoveItem(index)}>
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}
          >
            Add Item
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editIndex !== null ? 'Edit Item' : 'Add New Item'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <ItemSelect
                selectedItem={selectedItem?.name}
                setSelectedItem={setSelectedItem}
                setRate={setRate}
              />
            </div>
            <div>
              <Label>Rate</Label>
              <Input
                type="number"
                min={0}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            <div>
              <Label>Gross Amount</Label>
              <Input type="number" value={grossAmount.toFixed(2)} readOnly />
            </div>
            <div>
              <Label>Tax Amount</Label>
              <Input type="number" value={taxAmount.toFixed(2)} readOnly />
            </div>
            <div>
              <Label>Total Amount</Label>
              <Input type="number" value={totalAmount.toFixed(2)} readOnly />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSaveItem}>
              {editIndex !== null ? 'Save Changes' : 'Add Item'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-6 bg-gray-100 rounded-md p-4 shadow-sm w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>£{orderSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax Total:</span>
          <span>£{orderTaxTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2 border-t pt-2">
          <span>Total:</span>
          <span>£{orderTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

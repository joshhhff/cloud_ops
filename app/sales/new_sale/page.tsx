'use client';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewSalesOrderPage() {
  type SaleItem = {
    item: string | null;
    rate: number;
    quantity: number;
    grossAmount: number;
    taxAmount: number;
    totalAmount: number;
  };

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [rate, setRate] = useState<string>('0');
  const [taxRate] = useState<number>(0.1); // 10% tax
  const [items, setItems] = useState<SaleItem[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const numericRate = parseFloat(rate) || 0;
  const grossAmount = quantity * numericRate;
  const taxAmount = grossAmount * taxRate;
  const totalAmount = grossAmount + taxAmount;

  // calculate order totals (aggregate from all items)
  const orderSubtotal = items.reduce((sum, item) => sum + item.grossAmount, 0);
  const orderTaxTotal = items.reduce((sum, item) => sum + item.taxAmount, 0);
  const orderTotal = items.reduce((sum, item) => sum + item.totalAmount, 0);

  const handleSaveItem = () => {
    if (!selectedItem) return; // basic validation

    const newItem = {
      item: selectedItem,
      rate: numericRate,
      quantity,
      grossAmount,
      taxAmount,
      totalAmount
    };
    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }
    // Reset fields
    setSelectedItem(null);
    setQuantity(1);
    setRate('0');
    setIsDialogOpen(false);
  };

  const handleEditItem = (index: number) => {
    const item = items[index];
    setSelectedItem(item.item);
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
    <div className="max-w-6xl mx-auto p-0 space-y-6">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center space-x-4">
          <Link href='/sales' className="inline-flex p-1">
            <ArrowLeft />
          </Link>
          <h1 className="text-3xl font-bold">New Sales Order</h1>
        </div>
      </div>

    <div className="flex gap-6">
      <Card className="flex-1">
        <CardContent className="grid grid-cols-3 gap-4 p-6">
        <div>
          <Label>Transaction #</Label>
          <Input placeholder="Auto-generated" disabled />
        </div>
        <div>
          <Label>Date</Label>
          <Input type="date" />
        </div>
        <div>
          <Label>Customer</Label>
          <Select>
            <SelectTrigger>
            <SelectValue placeholder="Select Customer" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="cust1">Customer A</SelectItem>
            <SelectItem value="cust2">Customer B</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Memo</Label>
          <Input />
        </div>
        <div>
          <Label>Category</Label>
          <Input />
        </div>
        <div>
          <Label>Sales Class</Label>
          <Input />
        </div>
        </CardContent>
      </Card>
      <Card className="w-80 self-start">
        <div className="bg-gray-100 rounded-md p-4 shadow-sm">
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
      </Card>
    </div>

      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          <Card>
            <CardContent className="p-6 space-y-4">
              {items.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Items</h3>
                  <div className="grid grid-cols-8 gap-4 font-semibold">
                    <div>SKU</div>
                    <div>Rate</div>
                    <div>Qty</div>
                    <div>Subtotal</div>
                    <div>Tax</div>
                    <div>Total</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  {items.map((item, index) => (
                    <div key={index} className="grid grid-cols-8 gap-4 py-2 border-b">
                      <div>{item.item}</div>
                      <div>{item.rate}</div>
                      <div>{item.quantity}</div>
                      <div>{item.grossAmount.toFixed(2)}</div>
                      <div>{item.taxAmount.toFixed(2)}</div>
                      <div>{item.totalAmount.toFixed(2)}</div>
                      <Button variant="outline" onClick={() => handleEditItem(index)}>Edit</Button>
                      <Button variant="destructive" onClick={() => handleRemoveItem(index)}>Remove</Button>
                    </div>
                  ))}
                </div>
              )}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className='bg-blue-600 hover:bg-blue-700 text-white'
                    id="add-item-trigger"
                    onClick={() => {
                      setEditIndex(null);
                      setSelectedItem(null);
                      setQuantity(1);
                      setRate('0');
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
                      <Label>Item</Label>
                      <Select
                        value={selectedItem ?? undefined}
                        onValueChange={(val) => {
                          setSelectedItem(val);
                          setRate('100'); // Mock rate
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Item" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="item1">Item 1</SelectItem>
                          <SelectItem value="item2">Item 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Rate</Label>
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={rate}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
                            setRate(val);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label>Subtotal</Label>
                      <Input value={grossAmount.toFixed(2)} disabled />
                    </div>
                    <div>
                      <Label>Tax (10%)</Label>
                      <Input value={taxAmount.toFixed(2)} disabled />
                    </div>
                    <div>
                      <Label>Total</Label>
                      <Input value={totalAmount.toFixed(2)} disabled />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button className='bg-blue-600 hover:bg-blue-700 text-white' onClick={handleSaveItem}>
                      {editIndex !== null ? 'Update Item' : 'Add Item'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardContent className="p-6 space-y-4 grid grid-cols-2 gap-4">
              <div>
                <Label>Shipping Address</Label>
                <Input />
              </div>
              <div>
                <Label>Shipping Method</Label>
                <Input />
              </div>
              <div>
                <Label>Shipping Date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Tracking Number</Label>
                <Input />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardContent className="p-6 space-y-4 grid grid-cols-2 gap-4">
              <div>
                <Label>Billing Address</Label>
                <Input />
              </div>
              <div>
                <Label>Billing Contact</Label>
                <Input />
              </div>
              <div>
                <Label>Payment Terms</Label>
                <Input />
              </div>
              <div>
                <Label>Invoice Date</Label>
                <Input type="date" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

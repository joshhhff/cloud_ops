"use client";

import { useState } from "react";
import OrderTabs from "@/components/transactions/order-tabs";
import OrderSummary from "@/components/transactions/order-summary";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function CreateOrder() {
  const [items, setItems] = useState([{ id: 1, name: "", sku: "", quantity: 1, unitPrice: 0 }]);
  const [notes, setNotes] = useState("");
  const [shippingAddress, setShippingAddress] = useState({ line1: "", line2: "", line3: "", city: "", postcode: "", method: "", date: "", trackingNumber: "" });
  const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = subtotal * 0.08;
  const shippingCost = 25;
  const grandTotal = subtotal + tax + shippingCost;

  const handleSubmit = () => {
    console.log("Order submitted", { items, notes, subtotal, tax, grandTotal });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
          <Link href="/sales" className="inline-flex p-1">
            <ArrowLeft />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Order</h1>
          </div>
        </div>
        <div className="flex items-center justify-start space-x-2 mt-4">
          <Button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
          >
            <Save className="w-5 h-5" />
            <span className="font-medium">Save Order</span>
          </Button>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OrderTabs
            notes={notes}
            setNotes={setNotes}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            isShippingDialogOpen={isShippingDialogOpen}
            setIsShippingDialogOpen={setIsShippingDialogOpen}
          />
        </div>
        <div className="space-y-6">
          <OrderSummary
            subtotal={subtotal}
            tax={tax}
            shippingCost={shippingCost}
            grandTotal={grandTotal}
          />
        </div>
      </div>
    </div>
  );
}

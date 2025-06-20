import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function OrderSummary({ subtotal, tax, shippingCost, grandTotal }: any) {
  return (
    <Card>
      <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
        <div className="border-t pt-3 flex justify-between font-semibold text-lg">
          <span>Total</span><span>${grandTotal.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

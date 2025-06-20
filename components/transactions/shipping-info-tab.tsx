import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ShippingInfoTab({ shippingAddress, setShippingAddress, isShippingDialogOpen, setIsShippingDialogOpen }: any) {
  return (
    <Card>
      <CardHeader><CardTitle>Shipping Information</CardTitle></CardHeader>
      <CardContent>
        <div
          className="cursor-pointer border rounded-md p-4 hover:bg-gray-50 w-[30%]"
          onClick={() => setIsShippingDialogOpen(true)}
        >
          {Object.entries(shippingAddress).map(([key, value]) => (
            <p key={key}>{String(value) || ''}</p>
          ))}
        </div>

        <Dialog open={isShippingDialogOpen} onOpenChange={setIsShippingDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Shipping Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {["Shipping Address 1", "Shipping Address 2", "Shipping Address 3", "City", "Postcode"].map((field) => (
                <div key={field}>
                  <Label>{field}</Label>
                  <Input
                    value={shippingAddress[field]}
                    onChange={(e) =>
                      setShippingAddress((prev: any) => ({ ...prev, [field]: e.target.value }))
                    }
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsShippingDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

import { useState } from "react";
import { Label } from "./label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { Input } from "./input";
import { Button } from "./button";

export default function EnterAddress({ label, locationData, setLocationData, isEdit = false }: any) {
    const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);

    if (!isEdit) {
        return (
            <>
            <Label>{label}</Label>
            <div className="w-[30%]">
                {locationData?.address
                    ? Object.entries(locationData.address).map(([key, value]) => (
                        <p key={key}>{String(value) || ''}</p>
                      ))
                    : <p>No address provided</p>
                }
            </div>
            </>
        );
    }

    if (!locationData) {
        return (
            <div className="w-[30%]">
                <p>No address data available</p>
            </div>
        );
    }
    return (
        <>
        <Label>{label}</Label>
        <div
          className="cursor-pointer border rounded-md p-4 hover:bg-gray-50 w-[30%]"
          onClick={() => setIsShippingDialogOpen(true)}
        >
          {locationData?.address
            ? Object.entries(locationData.address).map(([key, value]) => (
                <p key={key}>{String(value) || ''}</p>
              ))
            : <p>No address provided</p>
          }
        </div>

        <Dialog open={isShippingDialogOpen} onOpenChange={setIsShippingDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Address Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {[
                { label: "Address 1", key: "addressLine1" },
                { label: "Address 2", key: "addressLine2" },
                { label: "Address 3", key: "addressLine3" },
                { label: "City", key: "city" },
                { label: "State", key: "state" },
                { label: "Postcode", key: "postalCode" },
                { label: 'Country', key: 'country' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Input
                    value={locationData?.address?.[key] || ""}
                    onChange={(e) => {
                      setLocationData((prev: any) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          [key]: e.target.value
                        }
                      }));
                    }}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsShippingDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </>
    )
}
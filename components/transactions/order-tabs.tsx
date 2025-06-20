import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OrderInfoTab from "./order-info-tab";
import CustomerInfoTab from "./customer-info-tab";
import ShippingInfoTab from "./shipping-info-tab";

export default function OrderTabs(props: any) {
  return (
    <Tabs defaultValue="order" className="space-y-6">
      <TabsList>
        <TabsTrigger value="order">Order Information</TabsTrigger>
        <TabsTrigger value="customer">Customer Information</TabsTrigger>
        <TabsTrigger value="shipping">Shipping Information</TabsTrigger>
      </TabsList>

      <TabsContent value="order">
        <OrderInfoTab {...props} />
      </TabsContent>

      <TabsContent value="customer">
        <CustomerInfoTab />
      </TabsContent>

      <TabsContent value="shipping">
        <ShippingInfoTab {...props} />
      </TabsContent>
    </Tabs>
  );
}

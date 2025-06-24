"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralInfoTab from "./tabs/general-info";
import AddressTab from "./tabs/address";
import WarehouseTab from "./tabs/warehouse";
import OpsFinanceTab from "./tabs/ops-finance";
import MetadataTab from "./tabs/metadata";

export default function LocationTabs({ locationData, setLocationData }: any) {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="general">General Info</TabsTrigger>
        <TabsTrigger value="address">Address</TabsTrigger>
        <TabsTrigger value="warehouse">Warehouse</TabsTrigger>
        <TabsTrigger value="ops">Operations & Finance</TabsTrigger>
        <TabsTrigger value="metadata">Metadata</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <GeneralInfoTab locationData={locationData} setLocationData={setLocationData} />
      </TabsContent>
      <TabsContent value="address">
        <AddressTab locationData={locationData} setLocationData={setLocationData} />
      </TabsContent>
      <TabsContent value="warehouse">
        <WarehouseTab locationData={locationData} setLocationData={setLocationData} />
      </TabsContent>
      <TabsContent value="ops">
        <OpsFinanceTab locationData={locationData} setLocationData={setLocationData} />
      </TabsContent>
      <TabsContent value="metadata">
        <MetadataTab locationData={locationData} setLocationData={setLocationData} />
      </TabsContent>
    </Tabs>
  );
}

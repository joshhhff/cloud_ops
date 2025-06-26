'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ZonesManagement from '@/components/wms-config/zones-management';
import AislesManagement from '@/components/wms-config/aisles-management';
import BinsManagement from '@/components/wms-config/bins-management';
import { MapPin, Grid3X3, Package } from 'lucide-react';

export default function WMSConfigClient({ locations }: any) {
  const [activeTab, setActiveTab] = useState('zones');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">WMS Configuration</h1>
        <p className="text-slate-600 mt-2">Configure your warehouse zones, aisles, and bins for advanced inventory management.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="zones" className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Zones</span>
          </TabsTrigger>
          <TabsTrigger value="aisles" className="flex items-center space-x-2">
            <Grid3X3 className="h-4 w-4" />
            <span>Aisles</span>
          </TabsTrigger>
          <TabsTrigger value="bins" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Bins</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="zones" className="space-y-6">
          <ZonesManagement locations={locations} />
        </TabsContent>

        <TabsContent value="aisles" className="space-y-6">
          <AislesManagement locations={locations} />
        </TabsContent>

        <TabsContent value="bins" className="space-y-6">
          <BinsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
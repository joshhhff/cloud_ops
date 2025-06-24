'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

type Props = {
    locationData: any;
    setLocationData: (update: (prev: any) => any) => void;
    isEdit: boolean;
};

export default function WmsSettingsTab({ locationData, setLocationData, isEdit }: Props) {
    const update = (field: string, value: any) => {
        setLocationData((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-8">
            {/* Default Carriers at the Top */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div>
                    <Label>Default Inbound Carrier</Label>
                    {isEdit ? (
                        <Input
                            value={locationData.defaultInboundCarrier || ''}
                            onChange={(e) => update('defaultInboundCarrier', e.target.value)}
                        />
                    ) : (
                        <p>{locationData.defaultInboundCarrier}</p>
                    )}
                </div>
                <div>
                    <Label>Default Outbound Carrier</Label>
                    {isEdit ? (
                        <Input
                            value={locationData.defaultOutboundCarrier || ''}
                            onChange={(e) => update('defaultOutboundCarrier', e.target.value)}
                        />
                    ) : (
                        <p>{locationData.defaultOutboundCarrier}</p>
                    )}
                </div>
            </div>

            {/* Fulfillment & Logistics Toggles */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                    <Switch
                        checked={locationData.isFulfillable}
                        onCheckedChange={(val) => update('isFulfillable', val)}
                        disabled={!isEdit}
                    />
                    <Label>Is Fulfillable</Label>
                </div>
            </div>

            {/* WMS Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                    <Switch
                        checked={locationData.advancedWmsEnabled}
                        onCheckedChange={(val) => update('advancedWmsEnabled', val)}
                        disabled={!isEdit}
                    />
                    <Label>Advanced WMS Enabled</Label>
                </div>

                {locationData.advancedWmsEnabled && (
                    <div>
                        <Label>Zones</Label>
                        <p className="text-sm text-muted-foreground">Zones are managed separately when WMS is enabled. Navigate to <Link href='wms/zones' style={{ color: 'blue', textDecoration: 'underline' }}>Zones</Link> for more.</p>
                    </div>
                )}
            </div>

            {/* Operations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                    <Label>Last Inventory Check</Label>
                    {isEdit ? (
                        <Input
                            type="date"
                            value={
                                locationData.lastInventoryCheck
                                    ? new Date(locationData.lastInventoryCheck).toISOString().split('T')[0]
                                    : ''
                            }
                            onChange={(e) =>
                                update('lastInventoryCheck', new Date(e.target.value).toISOString())
                            }
                        />
                    ) : (
                        <p>
                            {locationData.lastInventoryCheck
                                ? new Date(locationData.lastInventoryCheck).toLocaleDateString()
                                : ''}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

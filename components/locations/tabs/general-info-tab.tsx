'use client';

import EnterAddress from '@/components/ui/enter-address';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

type Props = {
    locationData: any;
    setLocationData: (update: (prev: any) => any) => void;
    isEdit: boolean;
};

export default function GeneralInfoTab({ locationData, setLocationData, isEdit }: Props) {
    const update = (field: string, value: any) => {
        setLocationData((prev: any) => ({ ...prev, [field]: value }));
    };

    const locationTypes = [
        "Warehouse",
        "Distribution Center",
        "Retail Store",
        "Fulfillment Center",
        "Office / Headquarters",
        "Manufacturing Plant",
        "Service Center",
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <Label>Name</Label>
            {isEdit ? (
                <Input
                value={locationData.name || ''}
                onChange={(e) => update('name', e.target.value)}
                />
            ) : (
                <p>{locationData.name}</p>
            )}
            </div>

            <div>
            <Label>Short Name</Label>
            {isEdit ? (
                <Input
                value={locationData.shortName || ''}
                onChange={(e) => update('shortName', e.target.value)}
                />
            ) : (
                <p>{locationData.shortName}</p>
            )}
            </div>

            <div className="md:col-span-2">
            <Label>Description</Label>
            {isEdit ? (
                <Input
                value={locationData.description || ''}
                onChange={(e) => update('description', e.target.value)}
                />
            ) : (
                <p>{locationData.description}</p>
            )}
            </div>

            <div>
            <Label>Location Type</Label>
            {isEdit ? (
                <Select
                value={locationData.type || ""}
                onValueChange={(val) => update("type", val)}
                >
                <SelectTrigger>
                    <SelectValue placeholder="Select a location type" />
                </SelectTrigger>
                <SelectContent>
                    {locationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                        {type}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            ) : (
                <p>{locationData.type}</p>
            )}
            </div>

            <div>
            <Label>Parent Location ID</Label>
            {isEdit ? (
                <Input
                value={locationData.parentLocationId || ''}
                onChange={(e) => update('parentLocationId', e.target.value)}
                />
            ) : (
                <p>{locationData.parentLocationId}</p>
            )}
            </div>

            <div className="md:col-span-2 flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
                <Switch
                checked={locationData.isActive}
                onCheckedChange={(val) => update('isActive', val)}
                disabled={!isEdit}
                />
                <Label>Active</Label>
            </div>
            <div>
                <EnterAddress label="Location Address" locationData={locationData} setLocationData={setLocationData} isEdit={isEdit} />
            </div>
            </div>
        </div>
    );
}

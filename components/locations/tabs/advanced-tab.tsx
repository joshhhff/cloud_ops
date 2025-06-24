import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

type Props = {
    locationData: any;
    setLocationData: (update: (prev: any) => any) => void;
    isEdit: boolean;
};

export default function AdvancedTab({ locationData, setLocationData, isEdit }: Props) {
    const update = (field: string, value: any) => {
        setLocationData((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label>Business Hours</Label>
                {isEdit ? (
                    <Input
                        value={locationData.businessHours || ''}
                        onChange={(e) => update('businessHours', e.target.value)}
                    />
                ) : (
                    <p>{locationData.businessHours}</p>
                )}
            </div>
            <div>
                <Label>Operational Since</Label>
                {isEdit ? (
                    <Input
                        type="date"
                        value={
                            locationData.operationalSince
                                ? new Date(locationData.operationalSince).toISOString().split('T')[0]
                                : ''
                        }
                        onChange={(e) => update('operationalSince', new Date(e.target.value).toISOString())}
                    />
                ) : (
                    <p>
                        {locationData.operationalSince
                            ? new Date(locationData.operationalSince).toLocaleDateString()
                            : ''}
                    </p>
                )}
            </div>
            <div className="flex items-center space-x-3">
                <Switch
                    checked={locationData.advancedWmsEnabled}
                    onCheckedChange={(val) => update('advancedWmsEnabled', val)}
                    disabled={!isEdit}
                />
                <Label>Advanced WMS Enabled</Label>
            </div>
        </div>
    );
}

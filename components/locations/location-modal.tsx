'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import GeneralInfoTab from './tabs/general-info-tab';
import AdvancedTab from './tabs/advanced-tab';
import WmsSettingsTab from './tabs/wms-settings';

type Props = {
    location?: any;
    isOpen: boolean;
    onClose: () => void;
    isCreateMode?: boolean;
};

// You can define a default template for a new location if needed
const defaultLocationData = {
    // name: '',
    // address: '',
    // ...other fields
};

export default function LocationModal({ location, isOpen, onClose, isCreateMode = false }: Props) {
    const [edit, setEdit] = useState(isCreateMode);
    const [locationData, setLocationData] = useState<any | null>(isCreateMode ? { ...defaultLocationData } : null);

    useEffect(() => {
        if (isCreateMode) {
            setEdit(true);
            setLocationData({ ...defaultLocationData });
        } else if (location) {
            setEdit(false);
            setLocationData(location);
        } else {
            setLocationData(null);
        }
    }, [location, isCreateMode]);

    // Always render modal in create mode, even if locationData is empty
    if (!locationData && !isCreateMode) return null;

    const saveChanges = async () => {
        if (isCreateMode) {
            // Handle creation of a new location
            console.log('Creating new location with data:', locationData);
            const newLocation = await fetch('/api/locations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(locationData),
            });

            if (newLocation.ok) {
                console.log("Location created successfully");
            } else {
                alert('Error creating location');
            }
            onClose();
            if (typeof window !== 'undefined') {
                window.location.reload();
            }
            return;
        }
        // Handle update
        console.log('Saving location changes:', locationData);
        const newLocation = await fetch('/api/locations', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(locationData),
        });

        if (newLocation.ok) {
            console.log("Location updated successfully");
        } else {
            alert('Error updating location');
        }
        onClose();
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>
                        {isCreateMode ? <>Create Location</> : edit ? <>Edit Location</> : <>Location</>}
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="general" className="space-y-4">
                    <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="wms">WMS Settings</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general">
                        <GeneralInfoTab locationData={locationData} setLocationData={setLocationData} isEdit={edit} />
                    </TabsContent>

                    <TabsContent value="wms">
                        <WmsSettingsTab locationData={locationData} setLocationData={setLocationData} isEdit={edit} />
                    </TabsContent>

                    <TabsContent value="advanced">
                        <AdvancedTab locationData={locationData} setLocationData={setLocationData} isEdit={edit} />
                    </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={onClose}>
                        {isCreateMode ? 'Cancel' : edit ? 'Cancel' : 'Close'}
                    </Button>
                    {(edit || isCreateMode) ? (
                        <Button
                            onClick={saveChanges}
                        >
                            Save
                        </Button>
                    ) : (
                        <Button
                            onClick={() => setEdit(true)}
                        >
                            Edit
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

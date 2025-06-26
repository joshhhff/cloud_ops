'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import GeneralInfoTab from './tabs/general-info-tab';
import AdvancedTab from './tabs/advanced-tab';
import WmsSettingsTab from './tabs/wms-settings';
import { Building2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

type Props = {
    location?: any;
    isOpen: boolean;
    onClose: () => void;
    isCreateMode?: boolean;
    locations: any[];
};

// You can define a default template for a new location if needed
const defaultLocationData = {
    // name: '',
    // address: '',
    // ...other fields
};

export default function LocationModal({ location, isOpen, onClose, isCreateMode = false, locations }: Props) {
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
                    <TabsList className="grid grid-cols-4 w-full">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="wms">WMS Settings</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                        <TabsTrigger value="childlocations">Child Locations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general">
                        <GeneralInfoTab locationData={locationData} setLocationData={setLocationData} isEdit={edit} locations={locations} />
                    </TabsContent>

                    <TabsContent value="wms">
                        <WmsSettingsTab locationData={locationData} setLocationData={setLocationData} isEdit={edit} />
                    </TabsContent>

                    <TabsContent value="advanced">
                        <AdvancedTab locationData={locationData} setLocationData={setLocationData} isEdit={edit} />
                    </TabsContent>

                    <TabsContent value="childlocations">
                        {location?.childLocations && location.childLocations.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Short Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Is Fulfillable</TableHead>
                                        <TableHead>Advanced WMS Enabled</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {location.childLocations.map((child: any) => (
                                        <TableRow key={child.id}>
                                            <TableCell className="font-medium">{child.name}</TableCell>
                                            <TableCell>{child.shortName || '-'}</TableCell>
                                            <TableCell>{child.type || '-'}</TableCell>
                                            <TableCell>{child.isFulfillable ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>{child.advancedWmsEnabled ? 'Yes' : 'No'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center p-10 border rounded-2xl bg-muted/30">
                                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                                <h2 className="text-xl font-semibold text-muted-foreground mb-1">No Child Locations</h2>
                                <p className="text-sm text-muted-foreground">This location doesn’t have any child locations yet.</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => {
                        if (isCreateMode) {
                            onClose();
                        } else {
                            if (edit) {
                                setEdit(false);
                            } else {
                                onClose();
                            }
                        }
                    }}>
                        {isCreateMode ? 'Cancel' : edit ? 'Cancel' : 'Close'}
                    </Button>
                    {(edit || isCreateMode) ? (
                        <>
                            {edit && !isCreateMode && (
                                <Button
                                    variant="destructive"
                                    onClick={async () => {
                                        if (window.confirm('Are you sure you want to delete this location?')) {
                                            console.log('Deleting location with ID:', locationData?.id);
                                            const res = await fetch(`/api/locations?id=${locationData?.id}`, {
                                                method: 'DELETE'
                                            });

                                            const data = await res.json();
                                            if (res.ok) {
                                                onClose();
                                                if (typeof window !== 'undefined') {
                                                    window.location.reload();
                                                }
                                            } else {
                                                alert('Error deleting location: ' + data.error);
                                            }
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                            )}
                            <Button
                                onClick={saveChanges}
                            >
                                Save
                            </Button>
                        </>
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

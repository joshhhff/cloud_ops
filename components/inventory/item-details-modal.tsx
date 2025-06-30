'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { AlertTriangle, CheckCircle, ChevronRight, MapPin, MoreHorizontal, Package, Settings, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { GroupedAisle, GroupedBin, GroupedLocation, GroupedZone, StockLevel } from '@/lib/interfaces/item-stock-interfaces';
import { locations } from '@/lib/mock-data';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import LocationStockModal from './location-stock-modal';
import StockAdjustmentModal from './stock-adjustment-modal';
import StockStatusModal from './stock-status-modal';

interface ItemDetailsModalProps {
    item: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function ItemDetailsModal({ item, isOpen, onClose }: ItemDetailsModalProps) {
    const router = useRouter();
    const [edit, setEdit] = useState(false);

    const [showStockAdjustment, setShowStockAdjustment] = useState(false);
    const [showStockStatus, setShowStockStatus] = useState(false);
    const [showLocationStock, setShowLocationStock] = useState(false);
    const [selectedLocationStock, setSelectedLocationStock] = useState<any>(null);
    const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

    const [itemData, setItemData] = useState({
        name: item.name || '',
        sku: item.sku || '',
        category: item.category || '',
        brand: item.brand || '',
        unitCost: item.unitCost || 0,
        sellingPrice: item.sellingPrice || 0,
        description: item.description || '',
        weight: item.weight || 0,
        dimensions: item.dimensions || '',
        supplierSku: item.supplierSku || '',
        maxStockLevel: item.maxStockLevel || 0,
        reorderLevel: item.reorderLevel || 0,
        isActive: item.isActive !== undefined ? item.isActive : true
    });

    if (!item) return null;

    // The following variables are placeholders. You will fetch and provide these yourself.
    const stockLevels: any[] = []; // <-- Provide your own stock data
    const adjustments: any[] = []; // <-- Provide your own adjustment data

    /*
    stockLevels = [
        {
            itemId: INTERNAL_ID,
            locationId: LOCATION_ID,
            locationType: LOCATION_TYPE,
            onHand: ON_HAND_QUANTITY,
            available: AVAILABLE_QUANTITY,
            quarantine: QUARANTINE_QUANTITY,
            preferredLevel: PREFERRED_LEVEL,
            onOrder: ON_ORDER_QUANTITY,
            zones: [
                {
                    zoneId: ZONE_ID,
                    zoneName: ZONE_NAME,
                    zoneDescription: ZONE_DESCRIPTION,
                    onHand: ZONE_ON_HAND_QUANTITY,
                    available: ZONE_AVAILABLE_QUANTITY,
                    quarantine: ZONE_QUARANTINE_QUANTITY,
                    preferredLevel: ZONE_PREFERRED_LEVEL,
                    aisles: [
                        {
                            aisleId: AISLE_ID,
                            aisleName: AISLE_NAME,
                            aisleDescription: AISLE_DESCRIPTION,
                            onHand: AISLE_ON_HAND_QUANTITY,
                            available: AISLE_AVAILABLE_QUANTITY,
                            quarantine: AISLE_QUARANTINE_QUANTITY,
                            preferredLevel: AISLE_PREFERRED_LEVEL
                            bins: [
                                {
                                    binId: BIN_ID,
                                    binName: BIN_NAME,
                                    binDescription: BIN_DESCRIPTION,
                                    onHand: BIN_ON_HAND_QUANTITY,
                                    available: BIN_AVAILABLE_QUANTITY,
                                    quarantine: BIN_QUARANTINE_QUANTITY,
                                    preferredLevel: BIN_PREFERRED_LEVEL
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
    */

    // Group stock by location for summary view
    function groupStockLevels(stockLevels: StockLevel[]): GroupedLocation[] {
        const locationMap = new Map<string, {
            locationId: string;
            locationName: string;
            locationType: string;
            stockData: GroupedLocation['stockData'];
            zones: Map<string, {
                zoneId: string;
                zoneName: string;
                zoneDescription?: string;
                stockData: GroupedZone['stockData'];
                aisles: Map<string, {
                    aisleId: string;
                    aisleName: string;
                    aisleDescription?: string;
                    stockData: GroupedAisle['stockData'];
                    bins: GroupedBin[];
                }>;
            }>;
        }>();

        for (const stock of stockLevels) {
            const { locationId, locationName, locationType, onHand, available, quarantine, preferredLevel, onOrder, zones } = stock;

            if (!locationMap.has(locationId)) {
                locationMap.set(locationId, {
                    locationId,
                    locationName,
                    locationType,
                    stockData: { onHand, available, quarantine, preferredLevel, onOrder },
                    zones: new Map(),
                });
            }

            const location = locationMap.get(locationId)!;

            for (const zone of zones || []) {
                const { zoneId, zoneName, zoneDescription, onHand, available, quarantine, preferredLevel, aisles } = zone;

                if (!location.zones.has(zoneId)) {
                    location.zones.set(zoneId, {
                        zoneId,
                        zoneName,
                        zoneDescription,
                        stockData: { onHand, available, quarantine, preferredLevel },
                        aisles: new Map(),
                    });
                }

                const zoneEntry = location.zones.get(zoneId)!;

                for (const aisle of aisles || []) {
                    const { aisleId, aisleName, aisleDescription, onHand, available, quarantine, preferredLevel, bins } = aisle;

                    if (!zoneEntry.aisles.has(aisleId)) {
                        zoneEntry.aisles.set(aisleId, {
                            aisleId,
                            aisleName,
                            aisleDescription,
                            stockData: { onHand, available, quarantine, preferredLevel },
                            bins: [],
                        });
                    }

                    const aisleEntry = zoneEntry.aisles.get(aisleId)!;

                    for (const bin of bins || []) {
                        const { binId, binName, binDescription, onHand, available, quarantine, preferredLevel } = bin;

                        aisleEntry.bins.push({
                            binId,
                            binName,
                            binDescription,
                            stockData: { onHand, available, quarantine, preferredLevel },
                        });
                    }
                }
            }
        }

        // Convert nested maps to arrays
        return Array.from(locationMap.values()).map(location => ({
            ...location,
            zones: Array.from(location.zones.values()).map(zone => ({
                ...zone,
                aisles: Array.from(zone.aisles.values()),
            })),
        }));
    }

    const stockByLocation = groupStockLevels(stockLevels);
    console.log('Grouped Stock Levels by Location:', stockByLocation);
    item.stockByLocation = stockByLocation;

    const totalStock = stockLevels.reduce((sum, stock) => sum + stock.quantity, 0);
    const totalAvailable = stockLevels.reduce((sum, stock) => sum + stock.available, 0);
    const totalQuarantine = stockLevels.reduce((sum, stock) => sum + stock.quarantine, 0);
    const totalOnOrder = stockLevels.reduce((sum, stock) => sum + stock.onOrder, 0);

    const isLowStock = totalStock <= item.reorderLevel;
    const outOfStock = totalAvailable === 0 && totalQuarantine === 0;

    const handleStockStatusAdjustment = (stock: any) => {
        setSelectedLocationStock(stock);
        setShowStockStatus(true);
    };

    const handleLocationClick = (locationId: string) => {
        setSelectedLocationId(locationId);
        setShowLocationStock(true);
    };

    const handleToggleLocationStatus = (itemId: string, locationId: string, currentStatus: boolean) => {
        // Implement your own logic here
    };

    const handleInputChange = (field: string, value: string) => {
        setItemData(prev => ({ ...prev, [field]: value }));
    };

    // for updating item data
    const saveChanges = async () => {
        // Implement your own save logic here
        console.log('Saving changes for item:', item);

        // double check context is edit (function is only accessible when edit is true anyway but this is just a safety check)
        if (edit) {
            const dataToSend = {
                id: item.id,
                ...itemData
            }

            const updateItemRequest = await fetch('/api/inventory', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const updateItemResponse = await updateItemRequest.json();

            if (!updateItemRequest.ok) {
                alert(`Error updating item: ${updateItemResponse.error}`);
                return;
            }

            setEdit(false);
            onClose();

            router.refresh();
        }
    }

    return (
        <>
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <Package className="h-5 w-5" />
                        <span>{item.name}</span>
                        {outOfStock && (
                            <Badge variant="destructive" className="ml-2">
                                <XCircle className="h-3 w-3 mr-1" />
                                Out of Stock
                            </Badge>
                        )}
                        {isLowStock && !outOfStock && (
                            <Badge variant="destructive" className="ml-2">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Low Stock
                            </Badge>
                        )}
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="locations">Stock by Locations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Item Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Item Name</label>
                                            {edit ? (
                                                <Input
                                                    type="text"
                                                    value={itemData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    className="w-full p-2 border rounded"
                                                    placeholder="Enter item name"
                                                />
                                            ) : (
                                                <p className="text-slate-900">{item.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">SKU</label>
                                            {edit ? (
                                                <Input
                                                    type="text"
                                                    value={item.sku}
                                                    onChange={(e) => item.sku = e.target.value}
                                                    className="w-full p-2 border rounded"
                                                    placeholder="Enter SKU"
                                                />
                                            ) : (
                                                <p className="text-slate-900">{item.sku}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Category</label>
                                            {edit ? (
                                                <Input
                                                    type="text"
                                                    value={item.category}
                                                    onChange={(e) => item.category = e.target.value}
                                                    className="w-full p-2 border rounded"
                                                    placeholder="Enter category"
                                                />
                                            ) : (
                                                <p className="text-slate-900">{item.category}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Brand</label>
                                            {edit ? (
                                                <Input
                                                    type="text"
                                                    value={item.brand}
                                                    onChange={(e) => item.brand = e.target.value}
                                                    className="w-full p-2 border rounded"
                                                    placeholder="Enter brand"
                                                />
                                            ) : (
                                                <p className="text-slate-900">{item.brand}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <label className="text-sm font-medium text-slate-600">Active</label>
                                            <Switch
                                                checked={item.isActive}
                                                /* onCheckedChange={(val) => update('isActive', val)} */
                                                disabled={!edit}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Supplier</label>
                                            <p className="text-slate-900">{item.supplier}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-600">Description</label>
                                        <p className="text-slate-900">{item.description}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Stock Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">{totalStock}</div>
                                            <div className="text-sm text-slate-600">Total Stock</div>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">{totalAvailable}</div>
                                            <div className="text-sm text-slate-600">Available</div>
                                        </div>
                                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                                            <div className="text-2xl font-bold text-orange-600">{totalQuarantine}</div>
                                            <div className="text-sm text-slate-600">Quarantine</div>
                                        </div>
                                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                                            <div className="text-2xl font-bold text-purple-600">{totalOnOrder}</div>
                                            <div className="text-sm text-slate-600">On Order</div>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => setShowStockAdjustment(true)}
                                        className="w-full"
                                    >
                                        <Settings className="h-4 w-4 mr-2" />
                                        Adjust Stock
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Pricing & Costs</CardTitle>
                                    <CardDescription className="text-sm text-slate-500">
                                        Last Purchase Price is automatically updated when receiving stock.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Last Purchase Price</label>
                                            <p className="text-lg font-semibold text-slate-900">£{item.unitCost}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Selling Price</label>
                                            <p className="text-lg font-semibold text-slate-900">£{item.sellingPrice}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Total Value</label>
                                            <p className="text-lg font-semibold text-green-600">
                                                £0
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Margin</label>
                                            <p className="text-lg font-semibold text-blue-600">
                                                {(((item.sellingPrice - item.unitCost) / item.sellingPrice) * 100).toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Physical Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Weight</label>
                                            {edit ? (
                                                <Input
                                                    type="number"
                                                    value={item.weight}
                                                    onChange={(e) => item.weight = parseFloat(e.target.value)}
                                                    className="w-full p-2 border rounded"
                                                    placeholder="Enter weight in kg"
                                                />
                                            ) : (
                                                <p className="text-slate-900">{item.weight > 0 ? `${item.weight} kg` : 'N/A'}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Dimensions</label>
                                            {edit ? (
                                                <Input
                                                    type="text"
                                                    value={item.dimensions}
                                                    onChange={(e) => item.dimensions = e.target.value}
                                                    className="w-full p-2 border rounded"
                                                    placeholder="Enter dimensions (L x W x H)"
                                                />
                                            ) : (
                                                <p className="text-slate-900">{item.dimensions}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Supplier SKU</label>
                                            {edit ? (
                                                <Input
                                                    type="text"
                                                    value={item.supplierSku}
                                                    onChange={(e) => item.supplierSku = e.target.value}
                                                    className="w-full p-2 border rounded"
                                                    placeholder="Enter supplier SKU"
                                                />
                                            ) : (
                                                <p className="text-slate-900">{item.supplierSku}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Max Stock Level</label>
                                            {edit ? (
                                                <Input
                                                    type="number"
                                                    value={item.maxStockLevel}
                                                    onChange={(e) => item.maxStockLevel = parseInt(e.target.value)}
                                                    className="w-full p-2 border rounded"
                                                    placeholder="Enter max stock level"
                                                />
                                            ) : (
                                                <p className="text-slate-900">{item.maxStockLevel}</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="locations" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Stock by Location</h3>
                            <Button onClick={() => setShowStockAdjustment(true)}>
                                <Settings className="h-4 w-4 mr-2" />
                                Adjust Stock
                            </Button>
                        </div>
                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Location</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>On Hand</TableHead>
                                            <TableHead>Available</TableHead>
                                            <TableHead>Quarantine</TableHead>
                                            <TableHead>Preferred Level</TableHead>
                                            <TableHead>On Order</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {stockByLocation.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={9} className="text-center text-slate-500">
                                                    No stock available for this item.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {stockByLocation.map((locationData) => {
                                            const isLocationLowStock = locationData.stockData.onHand <= (item.reorderLevel / locations.length);
                                            const isBelowPreferred = locationData.stockData.onHand < locationData.stockData.preferredLevel;

                                            return (
                                                <TableRow
                                                    key={locationData.locationId}
                                                    className="cursor-pointer hover:bg-slate-50"
                                                    onClick={() => handleLocationClick(locationData.locationId)}
                                                >
                                                    <TableCell>
                                                        <div className="flex items-center space-x-2">
                                                            <MapPin className="h-4 w-4 text-slate-400" />
                                                            <div>
                                                                <div className="font-medium flex items-center space-x-1">
                                                                    <span>{locationData.locationId}</span>
                                                                    <ChevronRight className="h-4 w-4 text-slate-400" />
                                                                </div>
                                                                {/* <div className="text-sm text-slate-500">{locationData.location.address}</div> */}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{locationData.locationType}</TableCell>
                                                    <TableCell className="font-medium">{locationData.stockData.onHand}</TableCell>
                                                    <TableCell className="text-green-600">{locationData.stockData.available}</TableCell>
                                                    <TableCell className="text-orange-600">{locationData.stockData.quarantine}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center space-x-2">
                                                            <span>{locationData.stockData.preferredLevel}</span>
                                                            {isBelowPreferred && (
                                                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-purple-600">{locationData.stockData.onOrder}</TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Stock Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setShowStockAdjustment(true);
                                                                }}>
                                                                    <Settings className="mr-2 h-4 w-4" />
                                                                    Adjust Quantities
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuLabel>Location Settings</DropdownMenuLabel>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                <div className="flex space-x-2 pt-4">
                    {edit ? (
                        <Button variant="default" onClick={() => saveChanges()}>Save Changes</Button>
                    ) : (
                        <>
                            <Button variant="default" onClick={() => setEdit(true)}>Edit Item</Button>
                            <Button variant="outline">View Purchase History</Button>
                            <Button variant="outline">Generate Report</Button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>

        {/* THIS IS THE SECTION CAUSING ISSUES WITH PAGE-RELOADING/DELAY IN DATA LOADING WHEN CLICKING ON AN ITEM */}
        {/* <StockAdjustmentModal
            item={item}
            isOpen={showStockAdjustment}
            onClose={() => setShowStockAdjustment(false)}
        />

            {selectedLocationStock && (
                <StockStatusModal
                    itemId={item.id}
                    locationStock={selectedLocationStock}
                    isOpen={showStockStatus}
                    onClose={() => {
                        setShowStockStatus(false);
                        setSelectedLocationStock(null);
                    }}
                />
            )} */}

        {selectedLocationId && (
            <LocationStockModal
                itemId={item.id}
                locationId={selectedLocationId}
                isOpen={showLocationStock}
                onClose={() => {
                    setShowLocationStock(false);
                    setSelectedLocationId(null);
                }}
            />
            )}
        </>
    );
}

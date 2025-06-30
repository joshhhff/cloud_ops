'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import StockAdjustmentModal from '@/components/inventory/stock-adjustment-modal';
import StockStatusModal from '@/components/inventory/stock-status-modal';
import { 
  getItemById,
  getLocationById,
  getStockByItemAndLocation,
  getZonesByLocation,
  getAislesByZone,
  getBinsByAisle,
  getZoneById,
  getAisleById,
  getBinById
} from '@/lib/mock-data';
import { 
  MapPin, 
  Package, 
  Settings, 
  MoreHorizontal,
  ArrowRightLeft,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

interface LocationStockModalProps {
  itemId: string;
  locationId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationStockModal({ itemId, locationId, isOpen, onClose }: LocationStockModalProps) {
  const [showStockAdjustment, setShowStockAdjustment] = useState(false);
  const [showStockStatus, setShowStockStatus] = useState(false);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'zones' | 'aisles' | 'bins'>('zones');
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [selectedAisleId, setSelectedAisleId] = useState<string | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<Array<{type: string, id: string, name: string}>>([]);

  const item = getItemById(itemId);
  const location = getLocationById(locationId);
  const stockLevels = getStockByItemAndLocation(itemId, locationId);

  if (!item || !location) return null;

  // Get zones for this location
  const zones = getZonesByLocation(locationId);
  
  // Group stock by zones
  const stockByZones = zones.map(zone => {
    const zoneStock = stockLevels.filter(stock => stock.zoneId === zone.id);
    const totalQuantity = zoneStock.reduce((sum, stock) => sum + stock.quantity, 0);
    const totalAvailable = zoneStock.reduce((sum, stock) => sum + stock.available, 0);
    const totalQuarantine = zoneStock.reduce((sum, stock) => sum + stock.quarantine, 0);
    const totalOnOrder = zoneStock.reduce((sum, stock) => sum + stock.onOrder, 0);
    const preferredLevel = zoneStock.reduce((sum, stock) => sum + stock.preferredLevel, 0);
    const hasActiveStock = zoneStock.some(stock => stock.isActive);

    return {
      zone,
      totalQuantity,
      totalAvailable,
      totalQuarantine,
      totalOnOrder,
      preferredLevel,
      hasActiveStock,
      stockCount: zoneStock.length
    };
  }).filter(z => z.stockCount > 0);

  // Get aisles for selected zone
  const aisles = selectedZoneId ? getAislesByZone(selectedZoneId) : [];
  const stockByAisles = aisles.map(aisle => {
    const aisleStock = stockLevels.filter(stock => stock.aisleId === aisle.id);
    const totalQuantity = aisleStock.reduce((sum, stock) => sum + stock.quantity, 0);
    const totalAvailable = aisleStock.reduce((sum, stock) => sum + stock.available, 0);
    const totalQuarantine = aisleStock.reduce((sum, stock) => sum + stock.quarantine, 0);
    const totalOnOrder = aisleStock.reduce((sum, stock) => sum + stock.onOrder, 0);
    const preferredLevel = aisleStock.reduce((sum, stock) => sum + stock.preferredLevel, 0);
    const hasActiveStock = aisleStock.some(stock => stock.isActive);

    return {
      aisle,
      totalQuantity,
      totalAvailable,
      totalQuarantine,
      totalOnOrder,
      preferredLevel,
      hasActiveStock,
      stockCount: aisleStock.length
    };
  }).filter(a => a.stockCount > 0);

  // Get bins for selected aisle
  const bins = selectedAisleId ? getBinsByAisle(selectedAisleId) : [];
  const stockByBins = bins.map(bin => {
    const binStock = stockLevels.find(stock => stock.binId === bin.id);
    return binStock ? { bin, stock: binStock } : null;
  }).filter(Boolean);

  const handleZoneClick = (zoneId: string) => {
    const zone = getZoneById(zoneId);
    if (zone) {
      setSelectedZoneId(zoneId);
      setCurrentView('aisles');
      setBreadcrumb([{ type: 'zone', id: zoneId, name: zone.name }]);
    }
  };

  const handleAisleClick = (aisleId: string) => {
    const aisle = getAisleById(aisleId);
    if (aisle) {
      setSelectedAisleId(aisleId);
      setCurrentView('bins');
      setBreadcrumb(prev => [...prev, { type: 'aisle', id: aisleId, name: aisle.name }]);
    }
  };

  const handleBackClick = () => {
    if (currentView === 'bins') {
      setCurrentView('aisles');
      setSelectedAisleId(null);
      setBreadcrumb(prev => prev.slice(0, -1));
    } else if (currentView === 'aisles') {
      setCurrentView('zones');
      setSelectedZoneId(null);
      setBreadcrumb([]);
    }
  };

  const handleStockStatusAdjustment = (stock: any) => {
    setSelectedStock(stock);
    setShowStockStatus(true);
  };

  const renderBreadcrumb = () => (
    <div className="flex items-center space-x-2 text-sm text-slate-600 mb-4">
      <MapPin className="h-4 w-4" />
      <span>{location.name}</span>
      {breadcrumb.map((crumb, index) => (
        <div key={crumb.id} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          <span>{crumb.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>{item.name} - {location.name} Stock Details</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {renderBreadcrumb()}

            {currentView !== 'zones' && (
              <Button variant="outline" onClick={handleBackClick} className="mb-4">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}

            {currentView === 'zones' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Zones in {location.name}</span>
                    <Button onClick={() => setShowStockAdjustment(true)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Adjust Stock
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Zone</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>On Hand</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead>Quarantine</TableHead>
                        <TableHead>Preferred Level</TableHead>
                        <TableHead>On Order</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stockByZones.map((zoneData) => {
                        const isLowStock = zoneData.totalQuantity <= (item.reorderLevel / zones.length);
                        const isBelowPreferred = zoneData.totalQuantity < zoneData.preferredLevel;
                        
                        return (
                          <TableRow 
                            key={zoneData.zone.id}
                            className="cursor-pointer hover:bg-slate-50"
                            onClick={() => handleZoneClick(zoneData.zone.id)}
                          >
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div>
                                  <div className="font-medium flex items-center space-x-1">
                                    <span>{zoneData.zone.name}</span>
                                    <ChevronRight className="h-4 w-4 text-slate-400" />
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-slate-600">{zoneData.zone.description}</TableCell>
                            <TableCell className="font-medium">{zoneData.totalQuantity}</TableCell>
                            <TableCell className="text-green-600">{zoneData.totalAvailable}</TableCell>
                            <TableCell className="text-orange-600">{zoneData.totalQuarantine}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span>{zoneData.preferredLevel}</span>
                                {isBelowPreferred && (
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-purple-600">{zoneData.totalOnOrder}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {zoneData.hasActiveStock ? (
                                  <Badge variant="secondary" className="flex items-center space-x-1">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>Active</span>
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="flex items-center space-x-1">
                                    <XCircle className="h-3 w-3" />
                                    <span>Inactive</span>
                                  </Badge>
                                )}
                                {isLowStock && (
                                  <Badge variant="destructive">Low Stock</Badge>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {currentView === 'aisles' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Aisles in {getZoneById(selectedZoneId!)?.name}</span>
                    <Button onClick={() => setShowStockAdjustment(true)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Adjust Stock
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Aisle</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>On Hand</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead>Quarantine</TableHead>
                        <TableHead>Preferred Level</TableHead>
                        <TableHead>On Order</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stockByAisles.map((aisleData) => {
                        const isLowStock = aisleData.totalQuantity <= (item.reorderLevel / aisles.length);
                        const isBelowPreferred = aisleData.totalQuantity < aisleData.preferredLevel;
                        
                        return (
                          <TableRow 
                            key={aisleData.aisle.id}
                            className="cursor-pointer hover:bg-slate-50"
                            onClick={() => handleAisleClick(aisleData.aisle.id)}
                          >
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div>
                                  <div className="font-medium flex items-center space-x-1">
                                    <span>{aisleData.aisle.name}</span>
                                    <ChevronRight className="h-4 w-4 text-slate-400" />
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-slate-600">{aisleData.aisle.description}</TableCell>
                            <TableCell className="font-medium">{aisleData.totalQuantity}</TableCell>
                            <TableCell className="text-green-600">{aisleData.totalAvailable}</TableCell>
                            <TableCell className="text-orange-600">{aisleData.totalQuarantine}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span>{aisleData.preferredLevel}</span>
                                {isBelowPreferred && (
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-purple-600">{aisleData.totalOnOrder}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {aisleData.hasActiveStock ? (
                                  <Badge variant="secondary" className="flex items-center space-x-1">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>Active</span>
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="flex items-center space-x-1">
                                    <XCircle className="h-3 w-3" />
                                    <span>Inactive</span>
                                  </Badge>
                                )}
                                {isLowStock && (
                                  <Badge variant="destructive">Low Stock</Badge>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {currentView === 'bins' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Bins in {getAisleById(selectedAisleId!)?.name}</span>
                    <Button onClick={() => setShowStockAdjustment(true)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Adjust Stock
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bin</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>On Hand</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead>Quarantine</TableHead>
                        <TableHead>Preferred Level</TableHead>
                        <TableHead>On Order</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stockByBins.map((binData) => {
                        if (!binData) return null;
                        const { bin, stock } = binData;
                        const isLowStock = stock.quantity <= (item.reorderLevel / bins.length);
                        const isBelowPreferred = stock.quantity < stock.preferredLevel;
                        
                        return (
                          <TableRow key={bin.id}>
                            <TableCell>
                              <div className="font-medium">{bin.name}</div>
                            </TableCell>
                            <TableCell className="text-sm text-slate-600">{bin.description}</TableCell>
                            <TableCell className="font-medium">{stock.quantity}</TableCell>
                            <TableCell className="text-green-600">{stock.available}</TableCell>
                            <TableCell className="text-orange-600">{stock.quarantine}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span>{stock.preferredLevel}</span>
                                {isBelowPreferred && (
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-purple-600">{stock.onOrder}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {stock.isActive ? (
                                  <Badge variant="secondary" className="flex items-center space-x-1">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>Active</span>
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="flex items-center space-x-1">
                                    <XCircle className="h-3 w-3" />
                                    <span>Inactive</span>
                                  </Badge>
                                )}
                                {isLowStock && (
                                  <Badge variant="destructive">Low Stock</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Stock Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleStockStatusAdjustment(stock)}>
                                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                                    Adjust Stock Status
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => setShowStockAdjustment(true)}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Adjust Quantities
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuLabel>Bin Settings</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    {stock.isActive ? (
                                      <>
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Deactivate Bin
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Activate Bin
                                      </>
                                    )}
                                  </DropdownMenuItem>
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
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      <StockAdjustmentModal
        item={itemId}
        isOpen={showStockAdjustment}
        onClose={() => setShowStockAdjustment(false)}
      />

      {selectedStock && (
        <StockStatusModal
          itemId={itemId}
          locationStock={selectedStock}
          isOpen={showStockStatus}
          onClose={() => {
            setShowStockStatus(false);
            setSelectedStock(null);
          }}
        />
      )}
    </>
  );
}
import { Suspense } from 'react';
import WMSConfigClient from '@/components/wms-config/wms-config-client';
import { GetAll, GetDataByField, TableMap } from '@/lib/services/database/database-controller';
import SystemLoadingPage from '@/components/ui/system-loading-page';

// Grouping utility
function groupBy<T extends Record<string, any>>(items: T[] | undefined, key: keyof T): Record<string, T[]> {
    if (!Array.isArray(items)) return {};
    return items.reduce((acc, item) => {
        const groupKey = String(item[key]);
        acc[groupKey] = acc[groupKey] || [];
        acc[groupKey].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}

export default async function WMSConfig() {
    const locationData = async () => {
        // Step 1: Get all locations
        const result = await GetAll('location');
        if (!result.success) {
            console.error("Failed to fetch locations:", result.errorMessage);
            return [];
        }

        // Step 2: Enrich locations with address
        const enrichedLocations = await Promise.all(
            result.data.map(async (location: any) => {
                const addressData = await GetDataByField('locationId', location.id, 'locationAddress' as keyof TableMap);
                if (addressData.success && addressData.data.length > 0) {
                    location.address = addressData.data[0];
                    const { locationId, id, createdAt, updatedAt, recordType, ...cleanedAddress } = location.address;
                    location.address = cleanedAddress;

                    Object.keys(location.address).forEach(key => {
                        if (
                            location.address[key] === null ||
                            location.address[key] === undefined ||
                            location.address[key] === ''
                        ) {
                            delete location.address[key];
                        }
                    });
                } else {
                    console.warn(`No address found for location ${location.id}:`, addressData.errorMessage);
                    location.address = null;
                }

                return location;
            })
        );

        // Step 3: Filter for advanced WMS locations
        const filteredLocations = enrichedLocations.filter(loc => loc.advancedWmsEnabled);

        // Step 4: Fetch all zones, aisles, bins once
        const [zonesResult, aislesResult, binsResult] = await Promise.all([
            GetAll('zone' as keyof TableMap),
            GetAll('aisle' as keyof TableMap),
            GetAll('bin' as keyof TableMap),
        ]);

        if (!zonesResult.success || !aislesResult.success || !binsResult.success) {
            console.error('Failed to fetch WMS components:', {
                zones: zonesResult.errorMessage,
                aisles: aislesResult.errorMessage,
                bins: binsResult.errorMessage,
            });
            return filteredLocations;
        }

        // Step 5: Group data
        const zonesByLocation = groupBy(zonesResult.data !== 'No data found' ? zonesResult.data : [], 'locationId');
        const aislesByZone = groupBy(aislesResult.data !== 'No data found' ? aislesResult.data : [], 'zoneId');
        const binsByAisle = groupBy(binsResult.data !== 'No data found' ? binsResult.data : [], 'aisleId');

        // Step 6: Build hierarchy
        const locationsWithHierarchy = filteredLocations.map((location: any) => {
            const locationZones = zonesByLocation[location.id] || [];

            const enrichedZones = locationZones.map((zone: any) => {
                const zoneAisles = aislesByZone[zone.id] || [];

                const enrichedAisles = zoneAisles.map((aisle: any) => {
                    const aisleBins = binsByAisle[aisle.id] || [];
                    return {
                        ...aisle,
                        bins: aisleBins,
                    };
                });

                return {
                    ...zone,
                    aisles: enrichedAisles,
                };
            });

            return {
                ...location,
                zones: enrichedZones,
            };
        });

        return locationsWithHierarchy;
    };

    const locationsResult = await locationData();

    return (
        <Suspense fallback={<SystemLoadingPage />}>
            <WMSConfigClient locations={locationsResult ?? []} />
        </Suspense>
    );
}

import { Suspense } from 'react';
import LocationsClient from '@/components/locations/locations-client';
import SystemLoadingPage from '@/components/ui/system-loading-page';
import { GetAll, GetDataByField, TableMap } from '@/lib/services/database/database-controller';

export default async function Locations() {
   const locationData = async () => {
  const result = await GetAll('location');

  if (!result.success) {
    console.error("Failed to fetch locations:", result.errorMessage);
    return [];
  }

  console.log("Locations fetched successfully:", result.data);

  const enrichedLocations = await Promise.all(
    result.data.map(async (location: any) => {
      const addressData = await GetDataByField('locationId', location.id, 'locationAddress' as keyof TableMap);

      if (addressData.success) {
        console.log(`Address for location ${location.id}:`, addressData);
        location.address = addressData.data[0]

        // Remove unwanted fields from address using destructuring
        const { locationId, id, createdAt, updatedAt, recordType, ...cleanedAddress } = location.address;
        location.address = cleanedAddress;

        // Remove any null, undefined, or empty string values from the address object
        Object.keys(location.address).forEach(key => {
          if (location.address[key] === null || location.address[key] === undefined || location.address[key] === '') {
            delete location.address[key];
          }
        });
      } else {
        console.error(`Failed to fetch address for location ${location.id}:`, addressData.errorMessage);
        location.address = null;
      }

      return location;
    })
  );

  return enrichedLocations;
}
    const locationsResult = await locationData();
    console.log("Rendering LocationsClient with data:", locationsResult);

  return (
    <Suspense fallback={<SystemLoadingPage />}>
      <LocationsClient locationData={locationsResult || []} />
    </Suspense>
  );
}
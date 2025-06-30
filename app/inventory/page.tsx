import { Suspense } from 'react';
import InventoryClient from '@/components/inventory/inventory-client';
import { GetAll, TableMap } from '@/lib/services/database/database-controller';
import SystemLoadingPage from '@/components/ui/system-loading-page';
import DatabaseFetchError from '@/components/ui/database-fetch-error';

export default async function Inventory() {

    const itemsResult = await GetAll('item' as keyof TableMap);

    if (!itemsResult.success) {
        return <DatabaseFetchError title='There was an error fetching items' errorMessage={itemsResult.errorMessage || 'An unexpected error occured. Please contact your System Administrator'} />
    }

    console.log("Fetched items:", itemsResult.data);

    return (
        <Suspense fallback={<SystemLoadingPage />}>
            <InventoryClient inventoryItems={itemsResult.data ?? []} />
        </Suspense>
    );
}
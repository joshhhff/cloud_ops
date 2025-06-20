'use client';
import React, { useState } from "react";
import DataTable from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Location = {
    id: number;
    name: string;
    active: boolean;
    fulfillable: boolean;
};

const initialLocations: Location[] = [
    { id: 1, name: "Warehouse A", active: true, fulfillable: true },
    { id: 2, name: "Storefront B", active: false, fulfillable: false },
    { id: 3, name: "Distribution Center C", active: true, fulfillable: false },
];

const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { 
        key: 'active', 
        label: 'Active', 
        sortable: true,
        render: (row: Location) => (
            <span className={`inline-flex items-center gap-2 ${row.active ? 'text-green-600' : 'text-red-600'}`}>
                <span className={`w-3 h-3 rounded-full ${row.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {row.active ? 'Active' : 'Inactive'}
            </span>
        )
    },
    { 
        key: 'fulfillable', 
        label: 'Fulfillable', 
        sortable: true,
        render: (row: Location) => (
            <span className={row.fulfillable ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {row.fulfillable ? 'Yes' : 'No'}
            </span>
        )
    },
];

export default function LocationsPage() {
    const [locations, setLocations] = useState<Location[]>(initialLocations);

    const handleCreateLocation = () => {
        const newLocation: Location = {
            id: locations.length + 1,
            name: `New Location ${locations.length + 1}`,
            active: true,
            fulfillable: false,
        };
        setLocations([newLocation, ...locations]);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Locations</h1>
                <p className="text-slate-600 mt-2">Manage your business locations and fulfillment centers.</p>
                <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white mt-4"
                    onClick={handleCreateLocation}
                >
                    + New Location
                </Button>
            </div>
            <DataTable
                data={locations}
                columns={columns}
                title="Locations"
                searchKey="name"
            />
        </div>
    );
}

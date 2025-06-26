'use server';

import { NextResponse } from 'next/server';
import { RecordController } from '@/lib/services/modules/record/record-controller';
import { GetAll, GetDataByField, TableMap } from '@/lib/services/database/database-controller';

// create new wms zone
export async function POST(request: Request) {
    try {
        console.log("Received POST request to create a new zone");
        const body = await request.json();

        console.log("Request body:", body);

        const newZone = await RecordController.create('zone', body);
        console.log("New zone created:", newZone);

        if (newZone.success) {

            return NextResponse.json(
                { zoneCreated: true, zone: newZone.data },
                { status: 200 }
            );
        } else {
            console.error("Failed to create zone:", newZone.errorMessage);
            return NextResponse.json(
                { error: newZone.errorMessage },
                { status: 500 }
            );
        }

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create zone" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        console.log("Received PATCH request to update a zone");
        const body = await request.json();

        console.log("Request body:", body);

        if (!body.id) {
            return NextResponse.json(
                { error: "Zone ID is required" },
                { status: 400 }
            );
        }

        const existingZone = await RecordController.load(body.id, 'zone');

        if (!existingZone) {
            return NextResponse.json(
                { error: "Zone not found" },
                { status: 404 }
            );
        }

        // Update the zone with the new data
        Object.keys(body).forEach(key => {
            if (body[key] === null || body[key] === undefined) {
                delete body[key];
            }

            existingZone.setValue(key, body[key]);
        });

        const updateZone = await existingZone.save();

        console.log("Zone updated:", updateZone);

        return NextResponse.json(
            { zoneUpdated: true, zone: existingZone },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating zone:", error);
        return NextResponse.json(
            { error: "Failed to update zone" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        console.log("Received DELETE request to delete a zone");
        const url = new URL(request.url);
        const zoneId = url.searchParams.get('id');

        if (!zoneId) {
            return NextResponse.json(
                { error: "Zone ID is required" },
                { status: 400 }
            );
        }

        console.log(`Deleting zone with ID: ${zoneId}`);
        const deleteResult = await RecordController.delete(zoneId, 'zone');

        if (deleteResult.success) {
            return NextResponse.json(
                { zoneDeleted: true },
                { status: 200 }
            );
        } else {
            console.error("Failed to delete zone:", deleteResult.errorMessage);
            return NextResponse.json(
                { error: deleteResult.errorMessage },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error("Error deleting zone:", error);
        return NextResponse.json(
            { error: "Failed to delete zone" },
            { status: 500 }
        );
    }
}
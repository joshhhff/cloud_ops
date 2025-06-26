'use server';

import { NextResponse } from 'next/server';
import { RecordController } from '@/lib/services/modules/record/record-controller';
import { GetAll, GetDataByField, TableMap } from '@/lib/services/database/database-controller';

// create new wms aisle
export async function POST(request: Request) {
    try {
        console.log("Received POST request to create a new aisle");
        const body = await request.json();

        console.log("Request body:", body);

        const newAisle = await RecordController.create('aisle', body);
        console.log("New aisle created:", newAisle);

        if (newAisle.success) {

            return NextResponse.json(
                { aisleCreated: true, aisle: newAisle.data },
                { status: 200 }
            );
        } else {
            console.error("Failed to create aisle:", newAisle.errorMessage);
            return NextResponse.json(
                { error: newAisle.errorMessage },
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
        console.log("Received PATCH request to update an aisle");
        const body = await request.json();

        console.log("Request body:", body);

        if (!body.id) {
            return NextResponse.json(
                { error: "Aisle ID is required" },
                { status: 400 }
            );
        }

        const existingAisle = await RecordController.load(body.id, 'aisle');

        if (!existingAisle) {
            return NextResponse.json(
                { error: "Aisle not found" },
                { status: 404 }
            );
        }

        // Update the aisle with the new data
        Object.keys(body).forEach(key => {
            if (body[key] === null || body[key] === undefined) {
                delete body[key];
            }

            existingAisle.setValue(key, body[key]);
        });

        if (existingAisle.getValue('zone')) {
            // if zoneId has been pulled into record object by loading, remove it before we re-save (prisma complains)
            existingAisle.deleteProperty('zone');
        }

        const updateAisle = await existingAisle.save();

        console.log("Aisle updated:", updateAisle);

        return NextResponse.json(
            { aisleUpdated: true, aisle: existingAisle },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating aisle:", error);
        return NextResponse.json(
            { error: "Failed to update aisle" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        console.log("Received DELETE request to delete an aisle");
        const url = new URL(request.url);
        const aisleId = url.searchParams.get('id');

        if (!aisleId) {
            return NextResponse.json(
                { error: "Aisle ID is required" },
                { status: 400 }
            );
        }

        console.log(`Deleting aisle with ID: ${aisleId}`);
        const deleteResult = await RecordController.delete(aisleId, 'aisle');

        if (deleteResult.success) {
            return NextResponse.json(
                { aisleDeleted: true },
                { status: 200 }
            );
        } else {
            console.error("Failed to delete aisle:", deleteResult.errorMessage);
            return NextResponse.json(
                { error: deleteResult.errorMessage },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error("Error deleting aisle:", error);
        return NextResponse.json(
            { error: "Failed to delete aisle" },
            { status: 500 }
        );
    }
}
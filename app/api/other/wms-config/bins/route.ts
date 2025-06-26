'use server';

import { NextResponse } from 'next/server';
import { RecordController } from '@/lib/services/modules/record/record-controller';
import { GetAll, GetDataByField, TableMap } from '@/lib/services/database/database-controller';

// create new wms bin
export async function POST(request: Request) {
    try {
        console.log("Received POST request to create a new bin");
        const body = await request.json();

        console.log("Request body:", body);

        const newBin = await RecordController.create('bin', body);
        console.log("New bin created:", newBin);

        if (newBin.success) {

            return NextResponse.json(
                { binCreated: true, zone: newBin.data },
                { status: 200 }
            );
        } else {
            console.error("Failed to create bin:", newBin.errorMessage);
            return NextResponse.json(
                { error: newBin.errorMessage },
                { status: 500 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create bin" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        console.log("Received PATCH request to update a bin");
        const body = await request.json();

        console.log("Request body:", body);

        if (!body.id) {
            return NextResponse.json(
                { error: "Bin ID is required" },
                { status: 400 }
            );
        }

        const existingBin = await RecordController.load(body.id, 'bin');

        if (!existingBin) {
            return NextResponse.json(
                { error: "Bin not found" },
                { status: 404 }
            );
        }

        // Update the zone with the new data
        Object.keys(body).forEach(key => {
            if (body[key] === null || body[key] === undefined) {
                delete body[key];
            }

            existingBin.setValue(key, body[key]);
        });

        if (existingBin.getValue('aisle')) {
            // if zoneId has been pulled into record object by loading, remove it before we re-save (prisma complains)
            existingBin.deleteProperty('aisle');
        }

        const updateBin = await existingBin.save();

        console.log("Bin updated:", updateBin);

        return NextResponse.json(
            { binUpdated: true, zone: existingBin },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating bin:", error);
        return NextResponse.json(
            { error: "Failed to update bin" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        console.log("Received DELETE request to delete a bin");
        const url = new URL(request.url);
        const binId = url.searchParams.get('id');

        if (!binId) {
            return NextResponse.json(
                { error: "Bin ID is required" },
                { status: 400 }
            );
        }

        // TODO : Future enhancement - check if bin has no stock before deleting

        console.log(`Deleting bin with ID: ${binId}`);
        const deleteResult = await RecordController.delete(binId, 'bin');

        if (deleteResult.success) {
            return NextResponse.json(
                { binDeleted: true },
                { status: 200 }
            );
        } else {
            console.error("Failed to delete bin:", deleteResult.errorMessage);
            return NextResponse.json(
                { error: deleteResult.errorMessage },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error("Error deleting bin:", error);
        return NextResponse.json(
            { error: "Failed to delete bin" },
            { status: 500 }
        );
    }
}
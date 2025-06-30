'use server';

import { NextResponse } from 'next/server';
import { RecordController as record } from '@/lib/services/modules/record/record-controller';
import { GetAll, TableMap } from '@/lib/services/database/database-controller';

// Fetch all items or a specific item by ID
export async function GET(request: Request) {
    try {
        console.log("Received GET request to fetch items");
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const itemId = searchParams.get('id');

        if (itemId) {
            console.log(`Fetching item with ID: ${itemId}`);
            const item = await record.load(itemId, 'item');
            if (item) {
                console.log("Item found:", item);
                return NextResponse.json(item.JSON(), { status: 200 });
            } else {
                console.error("Item not found");
                return NextResponse.json({ error: "Item not found" }, { status: 500 });
            }
        } else {
            console.log("Fetching all items");
            const itemsResult = await GetAll('item' as keyof TableMap);
            if (itemsResult.success) {
                console.log("Items fetched successfully:", itemsResult.data);
                return NextResponse.json(itemsResult.data, { status: 200 });
            } else {
                console.error("Failed to fetch items:", itemsResult.errorMessage);
                return NextResponse.json({ error: itemsResult.errorMessage }, { status: 500 });
            }
        }
    } catch (error) {
        console.error("Error fetching items:", error);
        return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
    }
}

// create new items
export async function POST(request: Request) {
    try {
        console.log("Received POST request to create a new item");
        const body = await request.json();

        console.log("Request body:", body);
        
        Object.keys(body).forEach(key => {
            if (body[key] === null || body[key] === undefined || body[key] === '') {
                delete body[key];
            } else if (key === 'unitCost' || key === 'sellingPrice' || key === 'weight') {
                body[key] = parseFloat(body[key]);
            } else if (key === 'reorderLevel' || key === 'maxStockLevel') {
                body[key] = parseInt(body[key]);
            }
        });

        const newItem = await record.create('item', body);

        if (newItem.success) {
            console.log("New item created:", newItem);
    
            return NextResponse.json({ locationCreated: true }, { status: 200 });
        } else {
            console.error("Failed to create item:", newItem.errorMessage);
            return NextResponse.json({ error: newItem.errorMessage }, { status: 500 });
        }
    } catch (error) {
        console.error("Error in sending email:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}

// Update existing items
export async function PATCH(request: Request) {
    try {
        const body = await request.json();

        if (!body.id) {
            return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
        }

        console.log("Received PATCH request to update an item with ID:", body.id);

        const existingItem = await record.load(body.id, 'item');

        if (!existingItem) {
            console.error("Item not found with ID:", body.id);
            return NextResponse.json({ error: "Item not found" }, { status: 500 });
        }

        // Update the item with the new data
        Object.keys(body).forEach(key => {
            if (body[key] === null || body[key] === undefined) {
                delete body[key];
            }

            existingItem.setValue(key, body[key]);
        });

        const updateItem = await existingItem.save();

        console.log("Bin updated:", updateItem);

        return NextResponse.json(
            { binUpdated: true, zone: updateItem },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating item:", error);
        return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
    }
}
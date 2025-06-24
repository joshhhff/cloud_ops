'use server';

import { NextResponse } from 'next/server';
import { RecordController } from '@/lib/services/modules/record/record-controller';
import { GetAll, GetDataByField, TableMap } from '@/lib/services/database/database-controller';
import { add } from 'date-fns';

// Fetch all locations or a specific location by ID
export async function GET(request: Request) {
    try {
        console.log("Received GET request to fetch locations");
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const locationId = searchParams.get('id');

        if (locationId) {
            console.log(`Fetching location with ID: ${locationId}`);
            const location = await RecordController.load(locationId, 'location');
            if (location) {
                console.log("Location found:", location);
                return NextResponse.json(location.JSON(), { status: 200 });
            } else {
                console.error("Location not found");
                return NextResponse.json({ error: "Location not found" }, { status: 404 });
            }
        } else {
            console.log("Fetching all locations");
            const locationsResult = await GetAll('location');
            if (locationsResult.success) {
                console.log("Locations fetched successfully:", locationsResult.data);
                return NextResponse.json(locationsResult.data, { status: 200 });
            } else {
                console.error("Failed to fetch locations:", locationsResult.errorMessage);
                return NextResponse.json({ error: locationsResult.errorMessage }, { status: 500 });
            }
        }
    } catch (error) {
        console.error("Error fetching locations:", error);
        return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
    }
}

// create new locations
export async function POST(request: Request) {
    try {
        console.log("Received POST request to create a new location");
        const body = await request.json();

        console.log("Request body:", body);
        const addressData = body.address;

        delete body.address; // Remove address from the main body to avoid duplication
        
        Object.keys(body).forEach(key => {
            if (body[key] === null || body[key] === undefined || body[key] === '') {
                delete body[key]; // Remove null or undefined fields
            }
        });

        // if no parent location ID is provided, remove the parentLocation field
        if (body.parentLocation?.connect?.id === '') {
            delete body.parentLocation;
            }
        console.log("Creating new location with data:", body);

        const newLocation = await RecordController.create('location', body);

        if (newLocation.success) {
            console.log("New location created:", newLocation);

            // TODO: create LocationAddress record now that we have the location ID
            let addressCanBeCreated = false;
            Object.keys(addressData).forEach(key => {
                if (addressData[key] !== null && addressData[key] !== undefined && addressData[key] !== '') {
                    addressCanBeCreated = true; // At least one field is valid
                } else {
                    delete addressData[key]; // Remove null or undefined fields
                }
            });
            if (addressCanBeCreated) {
                addressData.location = { connect: { id: newLocation.data.id } };
                console.log("Creating address with data:", addressData);
                const addressCreationResult = await RecordController.create('locationAddress', addressData);

                if (addressCreationResult.success) {
                    console.log("Address created successfully:", addressCreationResult);
                } else {
                    console.error("Failed to create address:", addressCreationResult.errorMessage);
                    return NextResponse.json({ error: `Location created but there was an error saving the address information! Error: ${addressCreationResult.errorMessage}` }, { status: 500 });
                }
            } else {
                console.warn("No valid address fields provided, skipping address creation.");
            }
    
            return NextResponse.json({ locationCreated: true }, { status: 200 });
        } else {
            console.error("Failed to create location:", newLocation.errorMessage);
            return NextResponse.json({ error: newLocation.errorMessage }, { status: 500 });
        }
    } catch (error) {
        console.error("Error in sending email:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        console.log("Received PATCH request to update a location");
        const body = await request.json();

        console.log("Request body:", body);
        const addressData = body.address;

        delete body.address; // Remove address from the main body to avoid duplication
        
        Object.keys(body).forEach(key => {
            if (body[key] === null || body[key] === undefined || body[key] === '') {
                delete body[key]; // Remove null or undefined fields
            }
        });

        // if no parent location ID is provided, remove the parentLocation field
        if (body.parentLocation?.connect?.id === '') {
            delete body.parentLocation;
            }

        console.log("Updating location with data:", body);

        const updateLocation = await RecordController.load(body.id, 'location');
        console.log("Loaded location for update:", updateLocation);

        if (!updateLocation) {
            console.error("Location not found for update");
            return NextResponse.json({ error: "Location not found" }, { status: 404 });
        }

        const isValidDate = (value: any) => {
            return value instanceof Date && !isNaN(value.getTime());
        }

        let changesMade = false;
        Object.keys(body).forEach(key => {
            let previousValue = updateLocation.getValue(key);
            let currentValue = body[key];

            if (isValidDate(new Date(body[key]))) {
                previousValue = new Date(previousValue);
                currentValue = new Date(body[key]);
            }

            const excludedFields = ['id', 'createdAt', 'updatedAt'];

            if (previousValue !== currentValue && excludedFields.includes(key) === false) {
                console.log(`Updating field ${key}: ${previousValue} -> ${body[key]}`);
                updateLocation.setValue(key, body[key]);
                changesMade = true;
            }
        });

        // Remove null or undefined fields, but preserve empty strings for clearing fields
Object.keys(addressData).forEach(key => {
    if (addressData[key] === null || addressData[key] === undefined) {
        delete addressData[key];
    }
});

const existingAddress = await GetDataByField('locationId', body.id, 'locationAddress' as keyof TableMap);

if (existingAddress.success && existingAddress.data.length > 0) {
    // Update existing address (even with empty fields)
    const addressUpdateResult = await RecordController.load(existingAddress.data[0].id, 'locationAddress');

    if (!addressUpdateResult) {
        console.error("Existing address not found for update");
        return NextResponse.json({ error: "Existing address not found" }, { status: 404 });
    }

    let addressChangesMade = false;

    Object.keys(addressData).forEach(key => {
        let previousValue = addressUpdateResult.getValue(key);
        let currentValue = addressData[key];

        if (isValidDate(new Date(currentValue))) {
            previousValue = new Date(previousValue);
            currentValue = new Date(currentValue);
        }

        if (previousValue !== currentValue) {
            console.log(`Updating address field ${key}: ${previousValue} -> ${currentValue}`);
            addressUpdateResult.setValue(key, currentValue);
            addressChangesMade = true;
        }
    });

    if (addressChangesMade) {
        console.log("Changes made to address, preparing to save.");
        await addressUpdateResult.save();
    } else {
        console.log("No changes made to address.");
    }
} else if (Object.keys(addressData).length > 0) {
    // Create a new address only if there’s something to create
    addressData.location = { connect: { id: body.id } };
    const addressCreationResult = await RecordController.create('locationAddress', addressData);

    if (addressCreationResult.success) {
        console.log("Address created successfully:", addressCreationResult);
    } else {
        console.error("Failed to create address:", addressCreationResult.errorMessage);
        return NextResponse.json({ error: `Location updated but there was an error saving the address information! Error: ${addressCreationResult.errorMessage}` }, { status: 500 });
    }
} else {
    console.warn("No address fields provided, and no existing address to update.");
}


        if (!changesMade) {
            console.log("No changes made to the location");
            return NextResponse.json({ message: "No changes made to the location" }, { status: 200 });
        }

        const updatedLocation = await updateLocation.save();

        if (updatedLocation instanceof Error) {
            console.error("Failed to update location:", updatedLocation.message);
            return NextResponse.json({ error: updatedLocation.message }, { status: 500 });
        }

        console.log("Location updated successfully:", updatedLocation);
        return NextResponse.json({ locationUpdated: true }, { status: 200 });
    } catch (error) {
        console.error("Error updating location:", error);
        return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
    }
}
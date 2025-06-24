'use server';
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../prisma"
import Result from "../../models/result"
import { PrismaClientOptions } from "@prisma/client/runtime/library";

export type TableMap = {
    user: typeof prisma.user,
    location: typeof prisma.location,
};

/* export async function GetAllUsers(companyId: number): Promise<Result> {
    try {
        const users = await prisma.user.findMany({
            where: { companyid: companyId },
            select: {
                id: true,
                email: true,
                forename: true,
                surename: true,
                role: true,
            },
        });

        return Result.ok(true, users);
    } catch (error: any) {
        console.error("Error fetching users:", error);
        return Result.fail(error);
    }
} */

export async function GetAll<T extends keyof TableMap>(table: T): Promise<Result> {
    try {
        const data = await (prisma[table] as any).findMany();
        console.log(`Fetched ${data.length} records from ${table} table`);

        if (data.length > 0) {
            return Result.ok(data);
        } else {
            return Result.fail("No data found");
        }
    } catch (error: any) {
        console.error("Error fetching data:", error);
        return Result.fail(error);
    }
}

export async function GetData<T extends keyof TableMap>(id: string, table: T, extraConditions?: any): Promise<Result> {
    try {
        const whereClause = extraConditions
            ? { id, ...extraConditions }
            : { id };

        const data = await (prisma[table] as any).findUnique({
            where: whereClause,
        });

        if (data) {
            return Result.ok(data);
        } else {
            return Result.fail("Data not found");
        }
    } catch (error: any) {
        console.error("Error fetching data:", error);
        return Result.fail(error);
    }
}

export async function GetDataByField<T extends keyof TableMap>(field: string, value: any, table: T): Promise<Result> {
    try {
        const data = await (prisma[table] as any).findMany({
            where: {
                [field]: value,
            },
        });

        if (data.length > 0) {
            return Result.ok(data);
        } else {
            return Result.fail("No data found");
        }
    } catch (error: any) {
        console.error("Error fetching data by field:", error);
        return Result.fail(error);
    }
}

export async function Create<T extends keyof TableMap>(table: T, data: Record<string, any>): Promise<Result> {
    try {
        const createdData = await (prisma[table] as any).create({
            data: data as any
        });
        const createdRecordId = createdData.id;
        console.log("Created data ID:", createdRecordId);

        return Result.ok(createdRecordId);
    } catch (error: any) {
        console.error("Error creating data:", error);
        return Result.fail(error);
    }
}

export async function Update<T extends keyof TableMap>(id: string, table: T, data: Record<string, any>): Promise<Result> {
    try {
        const updatedData = await (prisma[table] as any).update({
            where: { id: id },
            data: data,
        });
        console.log("Updated data ID:", updatedData);

        return Result.ok(updatedData);
    } catch (error: any) {
        console.error("Error updating data:", error);
        return Result.fail(error);
    }
}

export async function Delete<T extends keyof TableMap>(id: string, table: T): Promise<Result> {
    try {
        const deletedData = await (prisma[table] as any).delete({
            where: { id: id },
        });

        return Result.ok(deletedData);
    } catch (error: any) {
        console.error("Error deleting data:", error);
        return Result.fail(error);
    }
}

// INVENTORY SPECIFIC FUNCTIONS
export async function GetAllStockLevelsForItem(itemId: string): Promise<Result> {
    try {
        const stockLevels = await prisma.itemBinStock.findMany({
            where: { itemId: itemId },
            include: {
                bin: {
                    include: {
                        aisle: {
                            include: {
                                zone: {
                                    include: {
                                        location: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        console.log('Fetched stock levels for item:', itemId, stockLevels);

        return Result.ok(stockLevels);
    } catch (error: any) {
        console.error("Error fetching stock levels:", error);
        return Result.fail(error);
    }
}
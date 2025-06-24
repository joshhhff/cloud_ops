import * as db_controller from "../../database/database-controller"
import { RecordObject } from "../../../models/record-object"
import { prisma } from "../../../../lib/prisma";
import Result from "@/lib/models/result";

export abstract class RecordController {

    static async create(type: string, data: any): Promise<Result> {
        console.log('Creating new record of type:', type);
        
        const id = await db_controller.Create(type as keyof db_controller.TableMap, data);
        console.log('Create operation result:', id);
        
        if (!id.success) return Result.fail(id.errorMessage ?? 'Failed to create record', id.errorCode);

        return Result.ok(new RecordObject(id.data, type, data));
    }

    static async load(id: string, type: string): Promise<RecordObject | null> {
        const fetchData = await db_controller.GetData(id, type as keyof db_controller.TableMap);

        if (!fetchData.success || !fetchData) {
            return null;
        }

        return new RecordObject(id, type, fetchData.data);
    }

    static async delete(id: number, type: string): Promise<boolean> {
        return true;
    }

    static async copy(id: number, type: string): Promise<RecordObject | null> {
        return null;
    }
}
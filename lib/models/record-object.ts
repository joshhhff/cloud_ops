import { PrismaClient } from "@prisma/client/extension";
import * as db_controller from "../services/database/database-controller";

export class RecordObject {
    private id?: string; // ID can be string or number depending on the database schema
    private type: string;
    private data?: Record<string, any>;

    constructor(id: string, type: string, data?: object) {
        this.id = id;
        this.type = type;
        this.data = data;
    }

    setValue(key: string, value: any): RecordObject | Error {
        if (!this.data) this.data = {}

        this.data[key] = value;
        console.log(`Updated field ${key} with value:`, value);
        
        return this;
    }

    getValue(key: string): any {
        return this.data ? this.data[key] : undefined;
    }

    JSON(): Record<string, any> {
        return {
            id: this.id,
            type: this.type,
            data: this.data
        };
    }

    async save(): Promise<string | Error> {
        console.log('Saving changes to record:', this.JSON());
        if (this.id) {
            // Update existing record
            await db_controller.Update(this.id, this.type as PrismaClient, this.data ? this.data : {});
        } else {
            // Create new record
            if (!this.data) {
                throw new Error('Data is required to create a new record');
            }
            const newRecord = await db_controller.Create(this.type as PrismaClient, this.data);
            
            if (newRecord.success) {
                this.id = newRecord.data.id;
            } else {
                return new Error('Failed to create record', newRecord.data);
            }
        }

        return this.id ? this.id : 'Not saved';
    }
}
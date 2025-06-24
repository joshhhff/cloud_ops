-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "description" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isFulfillable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isStocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parentLocationId" TEXT,
ADD COLUMN     "recordType" TEXT NOT NULL DEFAULT 'location',
ADD COLUMN     "timezone" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "recordType" TEXT NOT NULL DEFAULT 'user';

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_parentLocationId_fkey" FOREIGN KEY ("parentLocationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `addressLine1` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `addressLine2` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `addressLine3` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `isStocked` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "addressLine1",
DROP COLUMN "addressLine2",
DROP COLUMN "addressLine3",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "isStocked",
DROP COLUMN "postalCode",
DROP COLUMN "state",
DROP COLUMN "timezone",
ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "businessHours" TEXT,
ADD COLUMN     "defaultCurrency" TEXT,
ADD COLUMN     "defaultInboundCarrier" TEXT,
ADD COLUMN     "defaultOutboundCarrier" TEXT,
ADD COLUMN     "inventoryTrackingEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastInventoryCheck" TIMESTAMP(3),
ADD COLUMN     "operationalSince" TIMESTAMP(3),
ADD COLUMN     "taxRegionId" TEXT;

-- CreateTable
CREATE TABLE "LocationAddress" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "addressLine3" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recordType" TEXT NOT NULL DEFAULT 'location_address',

    CONSTRAINT "LocationAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocationAddress_locationId_key" ON "LocationAddress"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_addressId_key" ON "Location"("addressId");

-- AddForeignKey
ALTER TABLE "LocationAddress" ADD CONSTRAINT "LocationAddress_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

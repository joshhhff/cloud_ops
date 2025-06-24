-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "category" TEXT DEFAULT 'Software',
    "brand" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recordType" TEXT NOT NULL DEFAULT 'item',
    "unitCost" DOUBLE PRECISION,
    "sellingPrice" DOUBLE PRECISION,
    "reorderLevel" INTEGER,
    "maxStockLevel" BIGINT,
    "weight" DOUBLE PRECISION,
    "dimensions" TEXT,
    "supplier" TEXT,
    "supplierSku" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

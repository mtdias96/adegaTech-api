-- CreateTable
CREATE TABLE "financial_records" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalSales" DOUBLE PRECISION NOT NULL,
    "adegaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financial_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "financial_records_adegaId_date_key" ON "financial_records"("adegaId", "date");

-- CreateIndex
CREATE INDEX "orders_createdAt_idx" ON "orders"("createdAt");

-- CreateIndex
CREATE INDEX "orders_userId_createdAt_idx" ON "orders"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "stock_history_createdAt_idx" ON "stock_history"("createdAt");

-- CreateIndex
CREATE INDEX "stock_history_adegaId_type_idx" ON "stock_history"("adegaId", "type");

-- CreateIndex
CREATE INDEX "stocks_adegaId_quantity_idx" ON "stocks"("adegaId", "quantity");

-- AddForeignKey
ALTER TABLE "financial_records" ADD CONSTRAINT "financial_records_adegaId_fkey" FOREIGN KEY ("adegaId") REFERENCES "adegas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

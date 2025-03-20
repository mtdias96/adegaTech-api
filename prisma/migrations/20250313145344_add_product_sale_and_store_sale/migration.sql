-- CreateTable
CREATE TABLE "store_sales_summary" (
    "id" TEXT NOT NULL,
    "adegaId" TEXT NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "store_sales_summary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_sales_summary" (
    "id" TEXT NOT NULL,
    "adegaId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "totalSold" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_sales_summary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "store_sales_summary_adegaId_key" ON "store_sales_summary"("adegaId");

-- CreateIndex
CREATE UNIQUE INDEX "product_sales_summary_adegaId_productId_key" ON "product_sales_summary"("adegaId", "productId");

-- AddForeignKey
ALTER TABLE "store_sales_summary" ADD CONSTRAINT "store_sales_summary_adegaId_fkey" FOREIGN KEY ("adegaId") REFERENCES "adegas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_sales_summary" ADD CONSTRAINT "product_sales_summary_adegaId_fkey" FOREIGN KEY ("adegaId") REFERENCES "adegas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_sales_summary" ADD CONSTRAINT "product_sales_summary_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `adegaId` to the `stock_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adegaId` to the `stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stock_history" ADD COLUMN     "adegaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stocks" ADD COLUMN     "adegaId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_adegaId_fkey" FOREIGN KEY ("adegaId") REFERENCES "adegas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_history" ADD CONSTRAINT "stock_history_adegaId_fkey" FOREIGN KEY ("adegaId") REFERENCES "adegas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

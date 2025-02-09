/*
  Warnings:

  - Changed the type of `type` on the `stock_history` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StockChangeType" AS ENUM ('INCREMENT', 'DECREMENT');

-- AlterTable
ALTER TABLE "stock_history" ADD COLUMN     "reason" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "StockChangeType" NOT NULL;

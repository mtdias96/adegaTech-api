/*
  Warnings:

  - You are about to drop the column `adega_id` on the `categories` table. All the data in the column will be lost.
  - Added the required column `adegaId` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_adega_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "adega_id",
ADD COLUMN     "adegaId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_adegaId_fkey" FOREIGN KEY ("adegaId") REFERENCES "adegas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

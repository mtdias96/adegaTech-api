/*
  Warnings:

  - A unique constraint covering the columns `[adegaId,name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "categories_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "categories_adegaId_name_key" ON "categories"("adegaId", "name");

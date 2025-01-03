/*
  Warnings:

  - You are about to drop the column `address` on the `adegas` table. All the data in the column will be lost.
  - Added the required column `city` to the `adegas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `adegas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `adegas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `adegas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `adegas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adegas" DROP COLUMN "address",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "state" VARCHAR(2) NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `cashIn` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cashOut` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "cashIn" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cashOut" DOUBLE PRECISION NOT NULL;

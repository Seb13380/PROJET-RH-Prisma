/*
  Warnings:

  - You are about to drop the column `firstName` on the `rh` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `rh` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[siret]` on the table `RH` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `RH` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raisonSociale` to the `RH` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siret` to the `RH` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rh` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `raisonSociale` VARCHAR(191) NOT NULL,
    ADD COLUMN `siret` VARCHAR(14) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `RH_siret_key` ON `RH`(`siret`);

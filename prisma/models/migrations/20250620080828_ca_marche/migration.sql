/*
  Warnings:

  - You are about to drop the column `age` on the `employe` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `employe` table. All the data in the column will be lost.
  - You are about to drop the column `dateAchat` on the `ordinateurs` table. All the data in the column will be lost.
  - You are about to drop the column `dateFinGarantie` on the `ordinateurs` table. All the data in the column will be lost.
  - Added the required column `poste` to the `employe` table without a default value. This is not possible if the table is not empty.
  - Made the column `genre` on table `employe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rhId` on table `employe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rhId` on table `ordinateurs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `employe` DROP FOREIGN KEY `employe_rhId_fkey`;

-- DropForeignKey
ALTER TABLE `ordinateurs` DROP FOREIGN KEY `ordinateurs_rhId_fkey`;

-- DropIndex
DROP INDEX `employe_rhId_fkey` ON `employe`;

-- DropIndex
DROP INDEX `ordinateurs_rhId_fkey` ON `ordinateurs`;

-- AlterTable
ALTER TABLE `employe` DROP COLUMN `age`,
    DROP COLUMN `password`,
    ADD COLUMN `poste` VARCHAR(191) NOT NULL,
    MODIFY `genre` VARCHAR(191) NOT NULL DEFAULT 'autre',
    MODIFY `rhId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ordinateurs` DROP COLUMN `dateAchat`,
    DROP COLUMN `dateFinGarantie`,
    MODIFY `macAddress` VARCHAR(191) NOT NULL,
    MODIFY `statut` VARCHAR(191) NOT NULL DEFAULT 'Disponible',
    MODIFY `rhId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `employe` ADD CONSTRAINT `employe_rhId_fkey` FOREIGN KEY (`rhId`) REFERENCES `RH`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordinateurs` ADD CONSTRAINT `ordinateurs_rhId_fkey` FOREIGN KEY (`rhId`) REFERENCES `RH`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

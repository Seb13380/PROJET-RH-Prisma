/*
  Warnings:

  - You are about to drop the column `rhId` on the `ordinateurs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ordinateurs` DROP FOREIGN KEY `ordinateurs_rhId_fkey`;

-- DropIndex
DROP INDEX `ordinateurs_rhId_fkey` ON `ordinateurs`;

-- AlterTable
ALTER TABLE `ordinateurs` DROP COLUMN `rhId`;

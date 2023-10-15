/*
  Warnings:

  - You are about to drop the column `serverId` on the `Server` table. All the data in the column will be lost.
  - Added the required column `modpackId` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Server` DROP FOREIGN KEY `Server_serverId_fkey`;

-- AlterTable
ALTER TABLE `Server` DROP COLUMN `serverId`,
    ADD COLUMN `modpackId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Server` ADD CONSTRAINT `Server_modpackId_fkey` FOREIGN KEY (`modpackId`) REFERENCES `ModPack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

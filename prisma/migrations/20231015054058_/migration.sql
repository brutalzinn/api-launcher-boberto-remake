-- CreateTable
CREATE TABLE `ModpackMetadata` (
    `id` VARCHAR(191) NOT NULL,
    `modpackId` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ModpackMetadata_modpackId_key_key`(`modpackId`, `key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ModpackMetadata` ADD CONSTRAINT `ModpackMetadata_modpackId_fkey` FOREIGN KEY (`modpackId`) REFERENCES `ModPack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

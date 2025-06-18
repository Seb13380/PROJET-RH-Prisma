-- CreateTable
CREATE TABLE `RH` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `raisonSociale` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `siret` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RH_mail_key`(`mail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `age` INTEGER NULL,
    `genre` VARCHAR(191) NULL,
    `rhId` INTEGER NULL,

    UNIQUE INDEX `employe_mail_key`(`mail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ordinateurs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `macAddress` VARCHAR(17) NOT NULL,
    `marque` VARCHAR(191) NOT NULL,
    `modele` VARCHAR(191) NOT NULL,
    `dateAchat` DATETIME(3) NOT NULL,
    `dateFinGarantie` DATETIME(3) NULL,
    `statut` VARCHAR(191) NOT NULL,
    `employeId` INTEGER NULL,
    `disponible` BOOLEAN NOT NULL DEFAULT true,
    `rhId` INTEGER NULL,

    UNIQUE INDEX `ordinateurs_macAddress_key`(`macAddress`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employe` ADD CONSTRAINT `employe_rhId_fkey` FOREIGN KEY (`rhId`) REFERENCES `RH`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordinateurs` ADD CONSTRAINT `ordinateurs_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `employe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordinateurs` ADD CONSTRAINT `ordinateurs_rhId_fkey` FOREIGN KEY (`rhId`) REFERENCES `RH`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

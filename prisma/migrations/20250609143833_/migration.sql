-- CreateTable
CREATE TABLE `employes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(255) NOT NULL,
    `dateNaissance` DATETIME(3) NOT NULL,
    `dateEntree` DATETIME(3) NOT NULL,
    `dateSortie` DATETIME(3) NULL,

    UNIQUE INDEX `employes_mail_key`(`mail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

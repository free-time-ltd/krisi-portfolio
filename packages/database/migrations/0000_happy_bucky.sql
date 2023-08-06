CREATE TABLE `Account` (
	`id` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`type` varchar(191) NOT NULL,
	`provider` varchar(191) NOT NULL,
	`providerAccountId` varchar(191) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(191),
	`scope` varchar(191),
	`id_token` text,
	`session_state` varchar(191),
	CONSTRAINT `Account_id` PRIMARY KEY(`id`),
	CONSTRAINT `Account_provider_providerAccountId_key` UNIQUE(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `admin_permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`action` varchar(255),
	`subject` varchar(255),
	`properties` json,
	`conditions` json,
	`created_at` datetime(6),
	`updated_at` datetime(6),
	`created_by_id` int,
	`updated_by_id` int,
	CONSTRAINT `admin_permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin_permissions_role_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`permission_id` int,
	`role_id` int,
	`permission_order` double UNSIGNED,
	CONSTRAINT `admin_permissions_role_links_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_permissions_role_links_unique` UNIQUE(`permission_id`,`role_id`)
);
--> statement-breakpoint
CREATE TABLE `admin_roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`code` varchar(255),
	`description` varchar(255),
	`created_at` datetime(6),
	`updated_at` datetime(6),
	`created_by_id` int,
	`updated_by_id` int,
	CONSTRAINT `admin_roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstname` varchar(255),
	`lastname` varchar(255),
	`username` varchar(255),
	`email` varchar(255),
	`password` varchar(255),
	`reset_password_token` varchar(255),
	`registration_token` varchar(255),
	`is_active` tinyint,
	`blocked` tinyint,
	`prefered_language` varchar(255),
	`created_at` datetime(6),
	`updated_at` datetime(6),
	`created_by_id` int,
	`updated_by_id` int,
	CONSTRAINT `admin_users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin_users_roles_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`role_id` int,
	`role_order` double UNSIGNED,
	`user_order` double UNSIGNED,
	CONSTRAINT `admin_users_roles_links_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_users_roles_links_unique` UNIQUE(`user_id`,`role_id`)
);
--> statement-breakpoint
CREATE TABLE `Category` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(191),
	`slug` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`isHeader` tinyint NOT NULL DEFAULT 0,
	`isHomepage` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `Category_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`alternative_text` varchar(255),
	`caption` varchar(255),
	`width` int,
	`height` int,
	`formats` json,
	`hash` varchar(255),
	`ext` varchar(255),
	`mime` varchar(255),
	`size` decimal(10,2),
	`url` varchar(255),
	`preview_url` varchar(255),
	`provider` varchar(255),
	`provider_metadata` json,
	`folder_path` varchar(255),
	`created_at` datetime(6),
	`updated_at` datetime(6),
	`created_by_id` int,
	`updated_by_id` int,
	CONSTRAINT `files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `files_folder_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`file_id` int,
	`folder_id` int,
	`file_order` double UNSIGNED,
	CONSTRAINT `files_folder_links_id` PRIMARY KEY(`id`),
	CONSTRAINT `files_folder_links_unique` UNIQUE(`file_id`,`folder_id`)
);
--> statement-breakpoint
CREATE TABLE `files_related_morphs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`file_id` int,
	`related_id` int,
	`related_type` varchar(255),
	`field` varchar(255),
	`order` double UNSIGNED,
	CONSTRAINT `files_related_morphs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Image` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`userId` varchar(191),
	`name` varchar(191),
	`description` text,
	`mature` tinyint NOT NULL DEFAULT 0,
	`isVisible` tinyint NOT NULL DEFAULT 1,
	`position` varchar(191),
	`origin` varchar(191) NOT NULL DEFAULT 'local',
	`dimensions` varchar(191) NOT NULL,
	`filename` varchar(191) NOT NULL,
	`extension` varchar(191),
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`views` int NOT NULL DEFAULT 0,
	`hasPinterest` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `Image_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ImageCategory` (
	`id` varchar(191) NOT NULL,
	`imageId` bigint NOT NULL,
	`categoryId` int NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `ImageCategory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ImageTag` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(191),
	`imageId` bigint,
	`tag` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `ImageTag_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ImageThumbnail` (
	`id` varchar(191) NOT NULL,
	`imageId` bigint NOT NULL,
	`filename` varchar(191) NOT NULL,
	`dimensions` varchar(191) NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`type` varchar(191) NOT NULL DEFAULT 'lq',
	CONSTRAINT `ImageThumbnail_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Session` (
	`id` varchar(191) NOT NULL,
	`sessionToken` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`expires` datetime(3) NOT NULL,
	CONSTRAINT `Session_id` PRIMARY KEY(`id`),
	CONSTRAINT `Session_sessionToken_key` UNIQUE(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `Setting` (
	`id` varchar(191) NOT NULL,
	`key` varchar(191) NOT NULL,
	`type` varchar(191) NOT NULL DEFAULT 'text',
	`value` text NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`isPublic` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `Setting_id` PRIMARY KEY(`id`),
	CONSTRAINT `Setting_key_key` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `UploadStatus` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`hash` varchar(191) NOT NULL,
	`status` varchar(191) NOT NULL,
	`log` varchar(191),
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `UploadStatus_id` PRIMARY KEY(`id`),
	CONSTRAINT `UploadStatus_hash_key` UNIQUE(`hash`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191),
	`email` varchar(191),
	`emailVerified` datetime(3),
	`image` varchar(191),
	`role` enum('User','Administrator') NOT NULL DEFAULT 'User',
	CONSTRAINT `User_id` PRIMARY KEY(`id`),
	CONSTRAINT `User_email_key` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `VerificationToken` (
	`identifier` varchar(191) NOT NULL,
	`token` varchar(191) NOT NULL,
	`expires` datetime(3) NOT NULL,
	CONSTRAINT `VerificationToken_token_key` UNIQUE(`token`),
	CONSTRAINT `VerificationToken_identifier_token_key` UNIQUE(`identifier`,`token`)
);
--> statement-breakpoint
CREATE INDEX `Account_userId_idx` ON `Account` (`userId`);--> statement-breakpoint
CREATE INDEX `admin_permissions_created_by_id_fk` ON `admin_permissions` (`created_by_id`);--> statement-breakpoint
CREATE INDEX `admin_permissions_updated_by_id_fk` ON `admin_permissions` (`updated_by_id`);--> statement-breakpoint
CREATE INDEX `admin_permissions_role_links_fk` ON `admin_permissions_role_links` (`permission_id`);--> statement-breakpoint
CREATE INDEX `admin_permissions_role_links_inv_fk` ON `admin_permissions_role_links` (`role_id`);--> statement-breakpoint
CREATE INDEX `admin_permissions_role_links_order_inv_fk` ON `admin_permissions_role_links` (`permission_order`);--> statement-breakpoint
CREATE INDEX `admin_roles_created_by_id_fk` ON `admin_roles` (`created_by_id`);--> statement-breakpoint
CREATE INDEX `admin_roles_updated_by_id_fk` ON `admin_roles` (`updated_by_id`);--> statement-breakpoint
CREATE INDEX `admin_users_created_by_id_fk` ON `admin_users` (`created_by_id`);--> statement-breakpoint
CREATE INDEX `admin_users_updated_by_id_fk` ON `admin_users` (`updated_by_id`);--> statement-breakpoint
CREATE INDEX `admin_users_roles_links_fk` ON `admin_users_roles_links` (`user_id`);--> statement-breakpoint
CREATE INDEX `admin_users_roles_links_inv_fk` ON `admin_users_roles_links` (`role_id`);--> statement-breakpoint
CREATE INDEX `admin_users_roles_links_order_fk` ON `admin_users_roles_links` (`role_order`);--> statement-breakpoint
CREATE INDEX `admin_users_roles_links_order_inv_fk` ON `admin_users_roles_links` (`user_order`);--> statement-breakpoint
CREATE INDEX `upload_files_folder_path_index` ON `files` (`folder_path`);--> statement-breakpoint
CREATE INDEX `upload_files_created_at_index` ON `files` (`created_at`);--> statement-breakpoint
CREATE INDEX `upload_files_updated_at_index` ON `files` (`updated_at`);--> statement-breakpoint
CREATE INDEX `upload_files_name_index` ON `files` (`name`);--> statement-breakpoint
CREATE INDEX `upload_files_size_index` ON `files` (`size`);--> statement-breakpoint
CREATE INDEX `upload_files_ext_index` ON `files` (`ext`);--> statement-breakpoint
CREATE INDEX `files_created_by_id_fk` ON `files` (`created_by_id`);--> statement-breakpoint
CREATE INDEX `files_updated_by_id_fk` ON `files` (`updated_by_id`);--> statement-breakpoint
CREATE INDEX `files_folder_links_fk` ON `files_folder_links` (`file_id`);--> statement-breakpoint
CREATE INDEX `files_folder_links_inv_fk` ON `files_folder_links` (`folder_id`);--> statement-breakpoint
CREATE INDEX `files_folder_links_order_inv_fk` ON `files_folder_links` (`file_order`);--> statement-breakpoint
CREATE INDEX `files_related_morphs_fk` ON `files_related_morphs` (`file_id`);--> statement-breakpoint
CREATE INDEX `Image_userId_idx` ON `Image` (`userId`);--> statement-breakpoint
CREATE INDEX `ImageCategory_imageId_idx` ON `ImageCategory` (`imageId`);--> statement-breakpoint
CREATE INDEX `ImageCategory_categoryId_idx` ON `ImageCategory` (`categoryId`);--> statement-breakpoint
CREATE INDEX `ImageTag_userId_idx` ON `ImageTag` (`userId`);--> statement-breakpoint
CREATE INDEX `ImageTag_imageId_idx` ON `ImageTag` (`imageId`);--> statement-breakpoint
CREATE INDEX `ImageThumbnail_imageId_idx` ON `ImageThumbnail` (`imageId`);--> statement-breakpoint
CREATE INDEX `Session_userId_idx` ON `Session` (`userId`);
import {
  mysqlTable,
  index,
  primaryKey,
  unique,
  varchar,
  text,
  int,
  datetime,
  tinyint,
  bigint,
  mysqlEnum,
  json,
  decimal,
} from "drizzle-orm/mysql-core";
import { InferModel, relations, sql } from "drizzle-orm";
import unsignedDouble from "@portfolio/database/types/unsignedDouble";

export const account = mysqlTable(
  "Account",
  {
    id: varchar("id", { length: 191 }).notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    type: varchar("type", { length: 191 }).notNull(),
    provider: varchar("provider", { length: 191 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: int("expires_at"),
    tokenType: varchar("token_type", { length: 191 }),
    scope: varchar("scope", { length: 191 }),
    idToken: text("id_token"),
    sessionState: varchar("session_state", { length: 191 }),
  },
  (table) => {
    return {
      userIdIdx: index("Account_userId_idx").on(table.userId),
      accountId: primaryKey(table.id),
      accountProviderProviderAccountIdKey: unique(
        "Account_provider_providerAccountId_key"
      ).on(table.provider, table.providerAccountId),
    };
  }
);

export const category = mysqlTable(
  "Category",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 191 }),
    slug: varchar("slug", { length: 191 }).notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updatedAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    isHeader: tinyint("isHeader").default(0).notNull(),
    isHomepage: tinyint("isHomepage").default(0).notNull(),
  },
  (table) => {
    return {
      categoryId: primaryKey(table.id),
    };
  }
);

export type CategoryModel = InferModel<typeof category>;

export const image = mysqlTable(
  "Image",
  {
    id: bigint("id", { mode: "number" }).autoincrement().notNull(),
    userId: varchar("userId", { length: 191 }),
    name: varchar("name", { length: 191 }),
    description: text("description"),
    mature: tinyint("mature").default(0).notNull(),
    isVisible: tinyint("isVisible").default(1).notNull(),
    position: varchar("position", { length: 191 }),
    origin: varchar("origin", { length: 191 }).default("local").notNull(),
    dimensions: varchar("dimensions", { length: 191 }).notNull(),
    filename: varchar("filename", { length: 191 }).notNull(),
    extension: varchar("extension", { length: 191 }),
    sortOrder: int("sortOrder").default(0).notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updatedAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    views: int("views").default(0).notNull(),
    hasPinterest: tinyint("hasPinterest").default(0).notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("Image_userId_idx").on(table.userId),
      imageId: primaryKey(table.id),
    };
  }
);

export type ImageModel = InferModel<typeof image>;

export const imageCategory = mysqlTable(
  "ImageCategory",
  {
    id: varchar("id", { length: 191 }).notNull(),
    imageId: bigint("imageId", { mode: "number" })
      .notNull()
      .references(() => image.id),
    categoryId: int("categoryId")
      .notNull()
      .references(() => category.id),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updatedAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
  },
  (table) => {
    return {
      imageIdIdx: index("ImageCategory_imageId_idx").on(table.imageId),
      categoryIdIdx: index("ImageCategory_categoryId_idx").on(table.categoryId),
      imageCategoryId: primaryKey(table.id),
    };
  }
);

export const imageTag = mysqlTable(
  "ImageTag",
  {
    id: int("id").autoincrement().notNull(),
    userId: varchar("userId", { length: 191 }),
    imageId: bigint("imageId", { mode: "number" }),
    tag: varchar("tag", { length: 191 }).notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updatedAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("ImageTag_userId_idx").on(table.userId),
      imageIdIdx: index("ImageTag_imageId_idx").on(table.imageId),
      imageTagId: primaryKey(table.id),
    };
  }
);

export const imageThumbnail = mysqlTable(
  "ImageThumbnail",
  {
    id: varchar("id", { length: 191 }).notNull(),
    imageId: bigint("imageId", { mode: "number" })
      .notNull()
      .references(() => image.id),
    filename: varchar("filename", { length: 191 }).notNull(),
    dimensions: varchar("dimensions", { length: 191 }).notNull(),
    sortOrder: int("sortOrder").default(0).notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updatedAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    type: varchar("type", { length: 191 }).default("lq").notNull(),
  },
  (table) => {
    return {
      imageIdIdx: index("ImageThumbnail_imageId_idx").on(table.imageId),
      imageThumbnailId: primaryKey(table.id),
    };
  }
);

export type ImageThumbnailModel = InferModel<typeof imageThumbnail>;

export const imageRelations = relations(image, ({ many }) => ({
  tags: many(imageTag),
  categories: many(imageCategory),
  thumbnails: many(imageThumbnail),
  imageCategories: many(imageCategory),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  images: many(imageCategory),
}));

export const tagsRelations = relations(imageTag, ({ one }) => ({
  image: one(image, {
    fields: [imageTag.imageId],
    references: [image.id],
  }),
}));

export const thumbnailRelations = relations(imageThumbnail, ({ one }) => ({
  image: one(image, {
    fields: [imageThumbnail.imageId],
    references: [image.id],
  }),
}));

export const imageCategoryRelations = relations(imageCategory, ({ one }) => ({
  image: one(image, {
    fields: [imageCategory.imageId],
    references: [image.id],
  }),
  category: one(category, {
    fields: [imageCategory.categoryId],
    references: [category.id],
  }),
}));

export const session = mysqlTable(
  "Session",
  {
    id: varchar("id", { length: 191 }).notNull(),
    sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    expires: datetime("expires", { mode: "string", fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("Session_userId_idx").on(table.userId),
      sessionId: primaryKey(table.id),
      sessionSessionTokenKey: unique("Session_sessionToken_key").on(
        table.sessionToken
      ),
    };
  }
);

export const setting = mysqlTable(
  "Setting",
  {
    id: varchar("id", { length: 191 }).notNull(),
    key: varchar("key", { length: 191 }).notNull(),
    type: varchar("type", { length: 191 }).default("text").notNull(),
    value: text("value").notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updatedAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    isPublic: tinyint("isPublic").default(0).notNull(),
  },
  (table) => {
    return {
      settingId: primaryKey(table.id),
      settingKeyKey: unique("Setting_key_key").on(table.key),
    };
  }
);

export const uploadStatus = mysqlTable(
  "UploadStatus",
  {
    id: bigint("id", { mode: "number" }).autoincrement().notNull(),
    hash: varchar("hash", { length: 191 }).notNull(),
    status: varchar("status", { length: 191 }).notNull(),
    log: varchar("log", { length: 191 }),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updatedAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
  },
  (table) => {
    return {
      uploadStatusId: primaryKey(table.id),
      uploadStatusHashKey: unique("UploadStatus_hash_key").on(table.hash),
    };
  }
);

export const user = mysqlTable(
  "User",
  {
    id: varchar("id", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }),
    email: varchar("email", { length: 191 }),
    emailVerified: datetime("emailVerified", { mode: "string", fsp: 3 }),
    image: varchar("image", { length: 191 }),
    role: mysqlEnum("role", ["User", "Administrator"])
      .default("User")
      .notNull(),
  },
  (table) => {
    return {
      userId: primaryKey(table.id),
      userEmailKey: unique("User_email_key").on(table.email),
    };
  }
);

export const verificationToken = mysqlTable(
  "VerificationToken",
  {
    identifier: varchar("identifier", { length: 191 }).notNull(),
    token: varchar("token", { length: 191 }).notNull(),
    expires: datetime("expires", { mode: "string", fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      verificationTokenTokenKey: unique("VerificationToken_token_key").on(
        table.token
      ),
      verificationTokenIdentifierTokenKey: unique(
        "VerificationToken_identifier_token_key"
      ).on(table.identifier, table.token),
    };
  }
);

export const adminPermissions = mysqlTable(
  "admin_permissions",
  {
    id: int("id").autoincrement().notNull(),
    action: varchar("action", { length: 255 }),
    subject: varchar("subject", { length: 255 }),
    properties: json("properties"),
    conditions: json("conditions"),
    createdAt: datetime("created_at", { mode: "string", fsp: 6 }),
    updatedAt: datetime("updated_at", { mode: "string", fsp: 6 }),
    createdById: int("created_by_id"),
    updatedById: int("updated_by_id"),
  },
  (table) => {
    return {
      createdByIdFk: index("admin_permissions_created_by_id_fk").on(
        table.createdById
      ),
      updatedByIdFk: index("admin_permissions_updated_by_id_fk").on(
        table.updatedById
      ),
      adminPermissionsId: primaryKey(table.id),
    };
  }
);

export const adminPermissionsRoleLinks = mysqlTable(
  "admin_permissions_role_links",
  {
    id: int("id").autoincrement().notNull(),
    permissionId: int("permission_id"),
    roleId: int("role_id"),
    permissionOrder: unsignedDouble("permission_order"),
  },
  (table) => {
    return {
      fk: index("admin_permissions_role_links_fk").on(table.permissionId),
      invFk: index("admin_permissions_role_links_inv_fk").on(table.roleId),
      orderInvFk: index("admin_permissions_role_links_order_inv_fk").on(
        table.permissionOrder
      ),
      adminPermissionsRoleLinksId: primaryKey(table.id),
      adminPermissionsRoleLinksUnique: unique(
        "admin_permissions_role_links_unique"
      ).on(table.permissionId, table.roleId),
    };
  }
);

export const adminRoles = mysqlTable(
  "admin_roles",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 255 }),
    code: varchar("code", { length: 255 }),
    description: varchar("description", { length: 255 }),
    createdAt: datetime("created_at", { mode: "string", fsp: 6 }),
    updatedAt: datetime("updated_at", { mode: "string", fsp: 6 }),
    createdById: int("created_by_id"),
    updatedById: int("updated_by_id"),
  },
  (table) => {
    return {
      createdByIdFk: index("admin_roles_created_by_id_fk").on(
        table.createdById
      ),
      updatedByIdFk: index("admin_roles_updated_by_id_fk").on(
        table.updatedById
      ),
      adminRolesId: primaryKey(table.id),
    };
  }
);

export const adminUsers = mysqlTable(
  "admin_users",
  {
    id: int("id").autoincrement().notNull(),
    firstname: varchar("firstname", { length: 255 }),
    lastname: varchar("lastname", { length: 255 }),
    username: varchar("username", { length: 255 }),
    email: varchar("email", { length: 255 }),
    password: varchar("password", { length: 255 }),
    resetPasswordToken: varchar("reset_password_token", { length: 255 }),
    registrationToken: varchar("registration_token", { length: 255 }),
    isActive: tinyint("is_active"),
    blocked: tinyint("blocked"),
    preferedLanguage: varchar("prefered_language", { length: 255 }),
    createdAt: datetime("created_at", { mode: "string", fsp: 6 }),
    updatedAt: datetime("updated_at", { mode: "string", fsp: 6 }),
    createdById: int("created_by_id"),
    updatedById: int("updated_by_id"),
  },
  (table) => {
    return {
      createdByIdFk: index("admin_users_created_by_id_fk").on(
        table.createdById
      ),
      updatedByIdFk: index("admin_users_updated_by_id_fk").on(
        table.updatedById
      ),
      adminUsersId: primaryKey(table.id),
    };
  }
);

export const adminUsersRolesLinks = mysqlTable(
  "admin_users_roles_links",
  {
    id: int("id").autoincrement().notNull(),
    userId: int("user_id"),
    roleId: int("role_id"),
    roleOrder: unsignedDouble("role_order"),
    userOrder: unsignedDouble("user_order"),
  },
  (table) => {
    return {
      fk: index("admin_users_roles_links_fk").on(table.userId),
      invFk: index("admin_users_roles_links_inv_fk").on(table.roleId),
      orderFk: index("admin_users_roles_links_order_fk").on(table.roleOrder),
      orderInvFk: index("admin_users_roles_links_order_inv_fk").on(
        table.userOrder
      ),
      adminUsersRolesLinksId: primaryKey(table.id),
      adminUsersRolesLinksUnique: unique("admin_users_roles_links_unique").on(
        table.userId,
        table.roleId
      ),
    };
  }
);

export const files = mysqlTable(
  "files",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 255 }),
    alternativeText: varchar("alternative_text", { length: 255 }),
    caption: varchar("caption", { length: 255 }),
    width: int("width"),
    height: int("height"),
    formats: json("formats"),
    hash: varchar("hash", { length: 255 }),
    ext: varchar("ext", { length: 255 }),
    mime: varchar("mime", { length: 255 }),
    size: decimal("size", { precision: 10, scale: 2 }),
    url: varchar("url", { length: 255 }),
    previewUrl: varchar("preview_url", { length: 255 }),
    provider: varchar("provider", { length: 255 }),
    providerMetadata: json("provider_metadata"),
    folderPath: varchar("folder_path", { length: 255 }),
    createdAt: datetime("created_at", { mode: "string", fsp: 6 }),
    updatedAt: datetime("updated_at", { mode: "string", fsp: 6 }),
    createdById: int("created_by_id"),
    updatedById: int("updated_by_id"),
  },
  (table) => {
    return {
      uploadFilesFolderPathIdx: index("upload_files_folder_path_index").on(
        table.folderPath
      ),
      uploadFilesCreatedAtIdx: index("upload_files_created_at_index").on(
        table.createdAt
      ),
      uploadFilesUpdatedAtIdx: index("upload_files_updated_at_index").on(
        table.updatedAt
      ),
      uploadFilesNameIdx: index("upload_files_name_index").on(table.name),
      uploadFilesSizeIdx: index("upload_files_size_index").on(table.size),
      uploadFilesExtIdx: index("upload_files_ext_index").on(table.ext),
      createdByIdFk: index("files_created_by_id_fk").on(table.createdById),
      updatedByIdFk: index("files_updated_by_id_fk").on(table.updatedById),
      filesId: primaryKey(table.id),
    };
  }
);

export const filesFolderLinks = mysqlTable(
  "files_folder_links",
  {
    id: int("id").autoincrement().notNull(),
    fileId: int("file_id"),
    folderId: int("folder_id"),
    fileOrder: unsignedDouble("file_order"),
  },
  (table) => {
    return {
      fk: index("files_folder_links_fk").on(table.fileId),
      invFk: index("files_folder_links_inv_fk").on(table.folderId),
      orderInvFk: index("files_folder_links_order_inv_fk").on(table.fileOrder),
      filesFolderLinksId: primaryKey(table.id),
      filesFolderLinksUnique: unique("files_folder_links_unique").on(
        table.fileId,
        table.folderId
      ),
    };
  }
);

export const filesRelatedMorphs = mysqlTable(
  "files_related_morphs",
  {
    id: int("id").autoincrement().notNull(),
    fileId: int("file_id"),
    relatedId: int("related_id"),
    relatedType: varchar("related_type", { length: 255 }),
    field: varchar("field", { length: 255 }),
    order: unsignedDouble("order"),
  },
  (table) => {
    return {
      fk: index("files_related_morphs_fk").on(table.fileId),
      filesRelatedMorphsId: primaryKey(table.id),
    };
  }
);

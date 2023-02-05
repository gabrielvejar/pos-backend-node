-- -------------------------------------------------------------
-- TablePlus 5.3.0(486)
--
-- https://tableplus.com/
--
-- Database: test_node
-- Generation Time: 2023-02-04 14:12:09.6560
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Roles_id_seq";

-- Table Definition
CREATE TABLE "public"."Roles" (
    "id" int4 NOT NULL DEFAULT nextval('"Roles_id_seq"'::regclass),
    "roleName" varchar(255) NOT NULL,
    "cashier" bool NOT NULL DEFAULT false,
    "sales" bool NOT NULL DEFAULT false,
    "adminProducts" bool NOT NULL DEFAULT false,
    "adminUsers" bool NOT NULL DEFAULT false,
    "adminAdmins" bool NOT NULL DEFAULT false,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."Roles" ("id", "roleName", "cashier", "sales", "adminProducts", "adminUsers", "adminAdmins", "createdAt", "updatedAt") VALUES
(2, 'admin', 't', 't', 't', 't', 't', '2023-02-04 16:57:38.879106+00', '2023-02-04 16:57:38.879106+00'),
(3, 'supervisor', 't', 't', 't', 't', 'f', '2023-02-04 16:58:07.367053+00', '2023-02-04 16:58:07.367053+00'),
(4, 'cashier', 't', 'f', 't', 'f', 'f', '2023-02-04 16:58:51.19915+00', '2023-02-04 16:58:51.19915+00'),
(5, 'sales', 'f', 't', 'f', 'f', 'f', '2023-02-04 16:58:51.207308+00', '2023-02-04 16:58:51.207308+00');

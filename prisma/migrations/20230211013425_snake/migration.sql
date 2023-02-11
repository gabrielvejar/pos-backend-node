/*
  Warnings:

  - You are about to drop the column `activeFlag` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Users` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "activeFlag",
DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "updatedAt",
ADD COLUMN     "active_flag" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "created_at" TIMESTAMP NOT NULL,
ADD COLUMN     "first_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "last_name" VARCHAR(255),
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;

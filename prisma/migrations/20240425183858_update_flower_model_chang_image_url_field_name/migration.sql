/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Flower` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `Flower` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flower" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Flower" ("created_at", "description", "id", "name", "price", "slug") SELECT "created_at", "description", "id", "name", "price", "slug" FROM "Flower";
DROP TABLE "Flower";
ALTER TABLE "new_Flower" RENAME TO "Flower";
CREATE UNIQUE INDEX "Flower_name_key" ON "Flower"("name");
CREATE UNIQUE INDEX "Flower_slug_key" ON "Flower"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

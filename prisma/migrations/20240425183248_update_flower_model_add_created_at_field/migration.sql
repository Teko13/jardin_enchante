-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flower" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Flower" ("description", "id", "imageUrl", "name", "price", "slug") SELECT "description", "id", "imageUrl", "name", "price", "slug" FROM "Flower";
DROP TABLE "Flower";
ALTER TABLE "new_Flower" RENAME TO "Flower";
CREATE UNIQUE INDEX "Flower_name_key" ON "Flower"("name");
CREATE UNIQUE INDEX "Flower_slug_key" ON "Flower"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

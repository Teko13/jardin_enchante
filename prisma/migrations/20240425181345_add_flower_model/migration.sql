-- CreateTable
CREATE TABLE "Flower" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Flower_name_key" ON "Flower"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Flower_slug_key" ON "Flower"("slug");

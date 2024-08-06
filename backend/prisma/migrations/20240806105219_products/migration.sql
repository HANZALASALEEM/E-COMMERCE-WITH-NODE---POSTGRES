-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "brand" TEXT,
    "sellerName" TEXT,
    "price" INTEGER,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

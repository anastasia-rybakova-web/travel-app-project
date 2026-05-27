-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('guide', 'tourist');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending', 'confirmed', 'cancelled', 'rejected', 'done', 'cancel_requested');

-- CreateEnum
CREATE TYPE "CancelRequestBy" AS ENUM ('tourist', 'guide');

-- CreateTable
CREATE TABLE "error_logs" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "method" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "userId" INTEGER,
    "userRole" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    "body" JSONB,
    "query" JSONB,
    "params" JSONB,

    CONSTRAINT "error_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guides" (
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "photo" TEXT,
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,

    CONSTRAINT "guides_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "tourists" (
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT,

    CONSTRAINT "tourists_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "places" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "shortDescription" TEXT,
    "description" TEXT,
    "tags" TEXT[],
    "photos" TEXT[],
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "guideUserId" INTEGER,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT,
    "description" TEXT,
    "duration" TEXT,
    "people" TEXT,
    "price" TEXT,
    "type" TEXT,
    "photos" TEXT[],
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "guideUserId" INTEGER,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_places" (
    "routeId" INTEGER NOT NULL,
    "placeId" INTEGER NOT NULL,

    CONSTRAINT "route_places_pkey" PRIMARY KEY ("routeId","placeId")
);

-- CreateTable
CREATE TABLE "route_dates" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "route_dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "guideUserId" INTEGER NOT NULL,
    "touristUserId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "people" INTEGER NOT NULL,
    "fio" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "note" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cancel_requests" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "requestedBy" "CancelRequestBy" NOT NULL,
    "isRejection" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "cancel_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "place_reviews" (
    "id" SERIAL NOT NULL,
    "placeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "username" TEXT,
    "photo" TEXT,
    "rating" DECIMAL(3,2) NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "place_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_reviews" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "username" TEXT,
    "photo" TEXT,
    "rating" DECIMAL(3,2) NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "route_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guide_reviews" (
    "id" SERIAL NOT NULL,
    "guideUserId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "username" TEXT,
    "photo" TEXT,
    "rating" DECIMAL(3,2) NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guide_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "cancel_requests_bookingId_key" ON "cancel_requests"("bookingId");

-- AddForeignKey
ALTER TABLE "guides" ADD CONSTRAINT "guides_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tourists" ADD CONSTRAINT "tourists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_guideUserId_fkey" FOREIGN KEY ("guideUserId") REFERENCES "guides"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_guideUserId_fkey" FOREIGN KEY ("guideUserId") REFERENCES "guides"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_places" ADD CONSTRAINT "route_places_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_places" ADD CONSTRAINT "route_places_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_dates" ADD CONSTRAINT "route_dates_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_guideUserId_fkey" FOREIGN KEY ("guideUserId") REFERENCES "guides"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_touristUserId_fkey" FOREIGN KEY ("touristUserId") REFERENCES "tourists"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cancel_requests" ADD CONSTRAINT "cancel_requests_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_reviews" ADD CONSTRAINT "place_reviews_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_reviews" ADD CONSTRAINT "place_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_reviews" ADD CONSTRAINT "route_reviews_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_reviews" ADD CONSTRAINT "route_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guide_reviews" ADD CONSTRAINT "guide_reviews_guideUserId_fkey" FOREIGN KEY ("guideUserId") REFERENCES "guides"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guide_reviews" ADD CONSTRAINT "guide_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

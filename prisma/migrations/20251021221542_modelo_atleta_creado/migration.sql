-- CreateTable
CREATE TABLE "Athlete" (
    "id" SERIAL NOT NULL,
    "CI" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "addres" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "emergencyPhoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT true,
    "paymentType" TEXT NOT NULL,

    CONSTRAINT "Athlete_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Athlete_CI_key" ON "Athlete"("CI");

-- CreateIndex
CREATE UNIQUE INDEX "Athlete_email_key" ON "Athlete"("email");

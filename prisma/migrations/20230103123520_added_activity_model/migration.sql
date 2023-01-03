-- CreateEnum
CREATE TYPE "ActivityLocation" AS ENUM ('AUDITORIO_PRINCIPAL', 'AUDITORIO_LATERAL', 'SALA_DE_WORKSHOP');

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,
    "startAt" TIME(4) NOT NULL,
    "endAt" TIME(4) NOT NULL,
    "location" "ActivityLocation" NOT NULL,
    "vacancies" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

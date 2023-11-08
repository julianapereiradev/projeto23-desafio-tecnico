-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "amountWon" INTEGER,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "isFinished" SET DEFAULT false;

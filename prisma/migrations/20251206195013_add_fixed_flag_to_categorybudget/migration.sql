-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoryBudget" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "monthlyLimit" DECIMAL NOT NULL,
    "isFixed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CategoryBudget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CategoryBudget" ("category", "createdAt", "id", "monthlyLimit", "updatedAt", "userId") SELECT "category", "createdAt", "id", "monthlyLimit", "updatedAt", "userId" FROM "CategoryBudget";
DROP TABLE "CategoryBudget";
ALTER TABLE "new_CategoryBudget" RENAME TO "CategoryBudget";
CREATE INDEX "CategoryBudget_userId_idx" ON "CategoryBudget"("userId");
CREATE UNIQUE INDEX "CategoryBudget_userId_category_key" ON "CategoryBudget"("userId", "category");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

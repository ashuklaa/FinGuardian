import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  // This must match your DATABASE_URL used in prisma.config.ts
  url: "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

const year = new Date().getFullYear();

const d = (month: number, day: number) =>
  new Date(year, month, day, 12, 0, 0, 0);

async function main() {
  // Wipe existing data (for dev only!)
  await prisma.transaction.deleteMany({});
  await prisma.categoryBudget.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.user.deleteMany({});

  const user = await prisma.user.create({
    data: {
      email: "ashuklaa@panw.com",
      name: "AShukla PANW",
    },
  });

  const checking = await prisma.account.create({
    data: {
      userId: user.id,
      name: "Demo Everyday Checking",
      company: "Demo Bank",
      type: "CHECKING",
      last4: "9181",
    },
  });

  const creditCard = await prisma.account.create({
    data: {
      userId: user.id,
      name: "Rewards Credit Card",
      company: "Demo Card Co.",
      type: "REVOLVING",
      last4: "9876",
    },
  });

  // SEED DATA: AI Generated, Human Validated

  // ----------------------------------------------------------------------
  // Transactions: January – December (demo user)
  // ----------------------------------------------------------------------
  const txData = [
    // ---- JANUARY ----
    // Income
    {
      accountId: checking.id,
      userId: user.id,
      date: d(0, 1),
      merchant: "PANW",
      category: "Income",
      amount: 3400.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(0, 15),
      merchant: "PANW",
      category: "Income",
      amount: 3400.0,
    },
    // Rent & utilities
    {
      accountId: checking.id,
      userId: user.id,
      date: d(0, 3),
      merchant: "Sunset Apartments",
      category: "Rent",
      amount: -2700.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(0, 6),
      merchant: "PG&E",
      category: "Utilities",
      amount: -88.4,
    },
    // Groceries
    {
      accountId: checking.id,
      userId: user.id,
      date: d(0, 5),
      merchant: "Costco",
      category: "Groceries",
      amount: -135.2,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(0, 20),
      merchant: "Trader Joe's",
      category: "Groceries",
      amount: -86.3,
    },
    // Dining & Coffee
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(0, 4),
      merchant: "PANW Cafeteria",
      category: "Dining",
      amount: -10.5,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(0, 9),
      merchant: "Starbucks",
      category: "Coffee",
      amount: -5.75,
    },
    // Early subscriptions (baseline)
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(0, 2),
      merchant: "Netflix",
      category: "Subscriptions",
      amount: -15.99,
    },

    // ---- FEBRUARY ----
    // Income
    {
      accountId: checking.id,
      userId: user.id,
      date: d(1, 1),
      merchant: "PANW",
      category: "Income",
      amount: 3450.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(1, 15),
      merchant: "PANW",
      category: "Income",
      amount: 3450.0,
    },
    // Rent & utilities
    {
      accountId: checking.id,
      userId: user.id,
      date: d(1, 3),
      merchant: "Sunset Apartments",
      category: "Rent",
      amount: -2700.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(1, 6),
      merchant: "PG&E",
      category: "Utilities",
      amount: -90.9,
    },
    // Groceries
    {
      accountId: checking.id,
      userId: user.id,
      date: d(1, 4),
      merchant: "Whole Foods",
      category: "Groceries",
      amount: -120.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(1, 19),
      merchant: "Trader Joe's",
      category: "Groceries",
      amount: -82.5,
    },
    // Dining & Coffee
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(1, 7),
      merchant: "PANW Cafeteria",
      category: "Dining",
      amount: -12.0,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(1, 11),
      merchant: "Starbucks",
      category: "Coffee",
      amount: -6.25,
    },
    // Subscriptions (baseline + new gray charge)
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(1, 2),
      merchant: "Netflix",
      category: "Subscriptions",
      amount: -15.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(1, 9),
      merchant: "Apple iCloud 200GB",
      category: "Subscriptions",
      amount: -2.99,
    },

    // ---- MARCH ----
    // Income
    {
      accountId: checking.id,
      userId: user.id,
      date: d(2, 1),
      merchant: "PANW",
      category: "Income",
      amount: 3450.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(2, 15),
      merchant: "PANW",
      category: "Income",
      amount: 3450.0,
    },
    // Rent & utilities
    {
      accountId: checking.id,
      userId: user.id,
      date: d(2, 3),
      merchant: "Sunset Apartments",
      category: "Rent",
      amount: -2700.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(2, 6),
      merchant: "PG&E",
      category: "Utilities",
      amount: -94.2,
    },
    // Groceries
    {
      accountId: checking.id,
      userId: user.id,
      date: d(2, 5),
      merchant: "Costco",
      category: "Groceries",
      amount: -148.7,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(2, 19),
      merchant: "Trader Joe's",
      category: "Groceries",
      amount: -90.1,
    },
    // Dining & Coffee
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(2, 8),
      merchant: "PANW Cafeteria",
      category: "Dining",
      amount: -12.5,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(2, 13),
      merchant: "Starbucks",
      category: "Coffee",
      amount: -7.0,
    },
    // Subscriptions (new trial that becomes gray charge later)
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(2, 2),
      merchant: "Netflix",
      category: "Subscriptions",
      amount: -15.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(2, 9),
      merchant: "Apple iCloud 200GB",
      category: "Subscriptions",
      amount: -2.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(2, 18),
      merchant: "Hulu (Promo)",
      category: "Subscriptions",
      amount: -1.99,
    },

    // ---- APRIL ----
    // Income
    {
      accountId: checking.id,
      userId: user.id,
      date: d(3, 1),
      merchant: "PANW",
      category: "Income",
      amount: 3500.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(3, 15),
      merchant: "PANW",
      category: "Income",
      amount: 3500.0,
    },
    // Rent & utilities
    {
      accountId: checking.id,
      userId: user.id,
      date: d(3, 3),
      merchant: "Sunset Apartments",
      category: "Rent",
      amount: -2750.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(3, 6),
      merchant: "PG&E",
      category: "Utilities",
      amount: -97.0,
    },
    // Groceries
    {
      accountId: checking.id,
      userId: user.id,
      date: d(3, 7),
      merchant: "Whole Foods",
      category: "Groceries",
      amount: -130.4,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(3, 21),
      merchant: "Trader Joe's",
      category: "Groceries",
      amount: -92.6,
    },
    // Dining & Coffee
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(3, 5),
      merchant: "PANW Cafeteria",
      category: "Dining",
      amount: -13.0,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(3, 11),
      merchant: "Starbucks",
      category: "Coffee",
      amount: -7.85,
    },
    // Subscriptions (Hulu trial converts to paid)
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(3, 2),
      merchant: "Netflix",
      category: "Subscriptions",
      amount: -15.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(3, 9),
      merchant: "Apple iCloud 200GB",
      category: "Subscriptions",
      amount: -2.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(3, 18),
      merchant: "Hulu",
      category: "Subscriptions",
      amount: -7.99,
    },

    // ---- MAY ----
    // Income
    {
      accountId: checking.id,
      userId: user.id,
      date: d(4, 1),
      merchant: "PANW",
      category: "Income",
      amount: 3500.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(4, 15),
      merchant: "PANW",
      category: "Income",
      amount: 3500.0,
    },
    // Rent & utilities
    {
      accountId: checking.id,
      userId: user.id,
      date: d(4, 3),
      merchant: "Sunset Apartments",
      category: "Rent",
      amount: -2750.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(4, 6),
      merchant: "PG&E",
      category: "Utilities",
      amount: -99.8,
    },
    // Groceries
    {
      accountId: checking.id,
      userId: user.id,
      date: d(4, 4),
      merchant: "Costco",
      category: "Groceries",
      amount: -142.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(4, 19),
      merchant: "Trader Joe's",
      category: "Groceries",
      amount: -95.0,
    },
    // Dining & Coffee (slowly increasing)
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(4, 8),
      merchant: "PANW Cafeteria",
      category: "Dining",
      amount: -14.0,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(4, 12),
      merchant: "Starbucks",
      category: "Coffee",
      amount: -8.35,
    },
    // Subscriptions (gray charges accumulate)
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(4, 2),
      merchant: "Netflix",
      category: "Subscriptions",
      amount: -15.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(4, 9),
      merchant: "Apple iCloud 200GB",
      category: "Subscriptions",
      amount: -2.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(4, 18),
      merchant: "Hulu",
      category: "Subscriptions",
      amount: -7.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(4, 23),
      merchant: "Calm Premium",
      category: "Subscriptions",
      amount: -5.99,
    },

    // ---- JUNE ----
    // Income
    {
      accountId: checking.id,
      userId: user.id,
      date: d(5, 1),
      merchant: "PANW",
      category: "Income",
      amount: 3500.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(5, 15),
      merchant: "PANW",
      category: "Income",
      amount: 3500.0,
    },
    // Rent & utilities
    {
      accountId: checking.id,
      userId: user.id,
      date: d(5, 3),
      merchant: "Sunset Apartments",
      category: "Rent",
      amount: -2750.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(5, 6),
      merchant: "PG&E",
      category: "Utilities",
      amount: -101.2,
    },
    // Groceries
    {
      accountId: checking.id,
      userId: user.id,
      date: d(5, 5),
      merchant: "Whole Foods",
      category: "Groceries",
      amount: -138.9,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(5, 20),
      merchant: "Trader Joe's",
      category: "Groceries",
      amount: -97.4,
    },
    // Dining & Coffee (continuing upward trend)
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(5, 8),
      merchant: "PANW Cafeteria",
      category: "Dining",
      amount: -14.5,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(5, 13),
      merchant: "Starbucks",
      category: "Coffee",
      amount: -9.0,
    },
    // Subscriptions (more gray charges)
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(5, 2),
      merchant: "Netflix",
      category: "Subscriptions",
      amount: -15.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(5, 9),
      merchant: "Apple iCloud 200GB",
      category: "Subscriptions",
      amount: -2.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(5, 18),
      merchant: "Hulu",
      category: "Subscriptions",
      amount: -7.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(5, 23),
      merchant: "Calm Premium",
      category: "Subscriptions",
      amount: -5.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(5, 27),
      merchant: "NewsPlus",
      category: "Subscriptions",
      amount: -7.99,
    },

    // ---- JULY ----
    // Income
    {
      accountId: checking.id,
      userId: user.id,
      date: d(6, 1),
      merchant: "PANW",
      category: "Income",
      amount: 3500.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(6, 15),
      merchant: "PANW",
      category: "Income",
      amount: 3500.0,
    },
    // Rent & utilities
    {
      accountId: checking.id,
      userId: user.id,
      date: d(6, 3),
      merchant: "Sunset Apartments",
      category: "Rent",
      amount: -2800.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(6, 6),
      merchant: "PG&E",
      category: "Utilities",
      amount: -95.5,
    },
    // Groceries
    {
      accountId: checking.id,
      userId: user.id,
      date: d(6, 5),
      merchant: "Costco",
      category: "Groceries",
      amount: -145.2,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(6, 19),
      merchant: "Trader Joe's",
      category: "Groceries",
      amount: -92.8,
    },
    // Dining & Coffee
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(6, 4),
      merchant: "PANW Cafeteria",
      category: "Dining",
      amount: -11.5,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(6, 8),
      merchant: "Philz Coffee",
      category: "Coffee",
      amount: -6.25,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(6, 22),
      merchant: "Chipotle",
      category: "Dining",
      amount: -17.9,
    },
    // Transport
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(6, 10),
      merchant: "Uber",
      category: "Transport",
      amount: -24.5,
    },

    // ---- AUGUST ----
    // Income
    {
      accountId: checking.id,
      userId: user.id,
      date: d(7, 1),
      merchant: "PANW",
      category: "Income",
      amount: 3550.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(7, 15),
      merchant: "PANW",
      category: "Income",
      amount: 3550.0,
    },
    // Rent & utilities
    {
      accountId: checking.id,
      userId: user.id,
      date: d(7, 3),
      merchant: "Sunset Apartments",
      category: "Rent",
      amount: -2800.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(7, 6),
      merchant: "PG&E",
      category: "Utilities",
      amount: -102.3,
    },
    // Groceries
    {
      accountId: checking.id,
      userId: user.id,
      date: d(7, 7),
      merchant: "Whole Foods",
      category: "Groceries",
      amount: -126.4,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(7, 21),
      merchant: "Trader Joe's",
      category: "Groceries",
      amount: -88.1,
    },
    // Dining / Coffee (increasing pattern)
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(7, 5),
      merchant: "Tastea",
      category: "Coffee",
      amount: -7.1,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(7, 12),
      merchant: "Peet's Coffee",
      category: "Coffee",
      amount: -8.05,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(7, 18),
      merchant: "Uber Eats",
      category: "Dining",
      amount: -32.5,
    },
    // Subscriptions (recurring)
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(7, 2),
      merchant: "Netflix",
      category: "Subscriptions",
      amount: -15.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(7, 9),
      merchant: "Spotify",
      category: "Subscriptions",
      amount: -9.99,
    },

    // ---- SEPTEMBER ----
    // Income
    {
      accountId: checking.id,
      userId: user.id,
      date: d(8, 1),
      merchant: "PANW",
      category: "Income",
      amount: 3600.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(8, 15),
      merchant: "PANW",
      category: "Income",
      amount: 3600.0,
    },
    // Rent & utilities
    {
      accountId: checking.id,
      userId: user.id,
      date: d(8, 3),
      merchant: "Sunset Apartments",
      category: "Rent",
      amount: -2800.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(8, 6),
      merchant: "PG&E",
      category: "Utilities",
      amount: -110.2,
    },
    // Groceries
    {
      accountId: checking.id,
      userId: user.id,
      date: d(8, 4),
      merchant: "Costco",
      category: "Groceries",
      amount: -160.75,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(8, 19),
      merchant: "Trader Joe's",
      category: "Groceries",
      amount: -150.5,
    },
    // Coffee spike
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(8, 2),
      merchant: "HeyTea",
      category: "Coffee",
      amount: -7.5,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(8, 9),
      merchant: "Blue Bottle",
      category: "Coffee",
      amount: -9.25,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(8, 16),
      merchant: "Peet's Coffee",
      category: "Coffee",
      amount: -8.75,
    },
    // Health
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(8, 11),
      merchant: "CVS Pharmacy",
      category: "Health",
      amount: -42.3,
    },
    // Subscriptions
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(8, 2),
      merchant: "Netflix",
      category: "Subscriptions",
      amount: -15.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(8, 9),
      merchant: "Spotify",
      category: "Subscriptions",
      amount: -9.99,
    },

    // ---- OCTOBER ----
    // Income
    {
      accountId: checking.id,
      userId: user.id,
      date: d(9, 1),
      merchant: "PANW",
      category: "Income",
      amount: 3600.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(9, 15),
      merchant: "PANW",
      category: "Income",
      amount: 3600.0,
    },
    // Rent & utilities
    {
      accountId: checking.id,
      userId: user.id,
      date: d(9, 3),
      merchant: "Sunset Apartments",
      category: "Rent",
      amount: -2800.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(9, 6),
      merchant: "PG&E",
      category: "Utilities",
      amount: -108.7,
    },
    // Shopping spike (good for “behavioral change” coaching)
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(9, 5),
      merchant: "Amazon",
      category: "Shopping",
      amount: -220.0,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(9, 18),
      merchant: "Best Buy",
      category: "Shopping",
      amount: -315.49,
    },
    // Entertainment
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(9, 20),
      merchant: "AMC Theatres",
      category: "Entertainment",
      amount: -32.0,
    },
    // Subscriptions
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(9, 2),
      merchant: "Netflix",
      category: "Subscriptions",
      amount: -15.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(9, 9),
      merchant: "Spotify",
      category: "Subscriptions",
      amount: -9.99,
    },

    // ---- NOVEMBER ----
    // Income
    {
      accountId: checking.id,
      userId: user.id,
      date: d(10, 1),
      merchant: "PANW",
      category: "Income",
      amount: 3650.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(10, 15),
      merchant: "PANW",
      category: "Income",
      amount: 3650.0,
    },
    // Rent & utilities
    {
      accountId: checking.id,
      userId: user.id,
      date: d(10, 3),
      merchant: "Sunset Apartments",
      category: "Rent",
      amount: -2800.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(10, 6),
      merchant: "PG&E",
      category: "Utilities",
      amount: -120.1,
    },
    // Travel spike (great anomaly)
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(10, 10),
      merchant: "Delta Air Lines",
      category: "Travel",
      amount: -480.0,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(10, 12),
      merchant: "Marriott Hotels",
      category: "Travel",
      amount: -620.0,
    },
    // Dining / Coffee continues
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(10, 8),
      merchant: "Peets Cofee",
      category: "Coffee",
      amount: -8.25,
    },
    // Subscriptions
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(10, 2),
      merchant: "Netflix",
      category: "Subscriptions",
      amount: -15.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(10, 9),
      merchant: "Spotify",
      category: "Subscriptions",
      amount: -9.99,
    },

    // ---- DECEMBER (current month) ----
    {
      accountId: checking.id,
      userId: user.id,
      date: d(11, 1),
      merchant: "PANW",
      category: "Income",
      amount: 3700.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(11, 15),
      merchant: "PANW",
      category: "Income",
      amount: 3700.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(11, 3),
      merchant: "Sunset Apartments",
      category: "Rent",
      amount: -2800.0,
    },
    {
      accountId: checking.id,
      userId: user.id,
      date: d(11, 6),
      merchant: "PG&E",
      category: "Utilities",
      amount: -130.6,
    },
    // Holiday shopping burst
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(11, 5),
      merchant: "Amazon",
      category: "Shopping",
      amount: -260.0,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(11, 20),
      merchant: "Best Buy",
      category: "Shopping",
      amount: -540.0,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(11, 22),
      merchant: "Target",
      category: "Shopping",
      amount: -120.0,
    },
    // Savings transfer (good positive behavior)
    {
      accountId: checking.id,
      userId: user.id,
      date: d(11, 25),
      merchant: "High-Yield Savings",
      category: "Savings",
      amount: -300.0,
    },
    // Subscriptions
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(11, 2),
      merchant: "Netflix",
      category: "Subscriptions",
      amount: -15.99,
    },
    {
      accountId: creditCard.id,
      userId: user.id,
      date: d(11, 9),
      merchant: "Spotify",
      category: "Subscriptions",
      amount: -9.99,
    },
  ];

  await prisma.transaction.createMany({
    data: txData,
  });

  /* Category budgets for Budget Sentry */
  await prisma.categoryBudget.createMany({
    data: [
      {
        userId: user.id,
        category: "Groceries",
        monthlyLimit: 200.0,
        isFixed: true,
      },
      {
        userId: user.id,
        category: "Subscriptions",
        monthlyLimit: 20.0,
        isFixed: false,
      },

      {
        userId: user.id,
        category: "Dining",
        monthlyLimit: 150.0,
        isFixed: false,
      },
      {
        userId: user.id,
        category: "Coffee",
        monthlyLimit: 20.0,
        isFixed: false,
      },
      {
        userId: user.id,
        category: "Shopping",
        monthlyLimit: 200.0,
        isFixed: false,
      },
      {
        userId: user.id,
        category: "Travel",
        monthlyLimit: 300.0,
        isFixed: false,
      },
    ],
  });

  if (process.env.NODE_ENV === "development") console.log("Seeded demo user, accounts, transactions and budgets.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });




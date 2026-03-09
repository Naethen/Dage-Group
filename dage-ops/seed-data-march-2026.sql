-- =============================================================
-- SEED DATA: March 2–7, 2026 operational reports
-- Run this AFTER creating the activity_logs and dccu_daily_sheets tables
-- =============================================================

-- =====================
-- NEMOK LODGE REVENUE
-- =====================

-- March 2, 2026 (Monday)
INSERT INTO activity_logs (subsidiary, date, category, description, quantity, amount, payment_method) VALUES
('Nemok Lodge', '2026-03-02', 'accommodation', 'Rm 10 - Mr Gyasi (1 night stay)', 1, 400, 'cash'),
('Nemok Lodge', '2026-03-02', 'accommodation', 'Rm 7 - Mr Frank (1 night stay)', 1, 350, 'cash'),
('Nemok Lodge', '2026-03-02', 'drinks', 'Pineapple drink', 1, 20, 'cash');

-- March 3, 2026 (Tuesday)
INSERT INTO activity_logs (subsidiary, date, category, description, quantity, amount, payment_method) VALUES
('Nemok Lodge', '2026-03-03', 'accommodation', 'Rm 12 - Destiny (2 night stay)', 1, 700, 'cash'),
('Nemok Lodge', '2026-03-03', 'accommodation', 'Rm 10 - Mr Gyasi (1 night stay)', 1, 400, 'cash'),
('Nemok Lodge', '2026-03-03', 'food', 'Fried rice (1 plate)', 1, 70, 'cash'),
('Nemok Lodge', '2026-03-03', 'food', 'Jollof rice (2 plates)', 2, 140, 'momo'),
('Nemok Lodge', '2026-03-03', 'drinks', 'Smirnoff (1 bottle)', 1, 25, 'cash'),
('Nemok Lodge', '2026-03-03', 'drinks', 'Verna small bottle (2)', 2, 10, 'cash'),
('Nemok Lodge', '2026-03-03', 'drinks', 'Beta Malt', 1, 15, 'cash'),
('Nemok Lodge', '2026-03-03', 'drinks', 'Verna small bottle (2)', 2, 10, 'momo'),
('Nemok Lodge', '2026-03-03', 'drinks', 'Coke (1 bottle)', 1, 20, 'momo'),
('Nemok Lodge', '2026-03-03', 'drinks', 'Pineapple drink (2)', 2, 40, 'cash'),
('Nemok Lodge', '2026-03-03', 'drinks', 'Pineapple drink small (1)', 1, 15, 'cash');

-- March 3 expenses
INSERT INTO activity_logs (subsidiary, date, category, description, quantity, amount, payment_method, notes) VALUES
('Nemok Lodge', '2026-03-03', 'expense', 'Rice (2)', 2, 280, 'cash', 'Kitchen supplies'),
('Nemok Lodge', '2026-03-03', 'expense', 'Chicken fillet (1)', 1, 120, 'cash', 'Kitchen supplies'),
('Nemok Lodge', '2026-03-03', 'expense', 'Banku rubber', 1, 24, 'cash', 'Kitchen supplies'),
('Nemok Lodge', '2026-03-03', 'expense', 'Egg (1 crate)', 1, 60, 'cash', 'Kitchen supplies');

-- March 4, 2026 (Wednesday)
INSERT INTO activity_logs (subsidiary, date, category, description, quantity, amount, payment_method) VALUES
('Nemok Lodge', '2026-03-04', 'accommodation', 'Rm 10 - Mr Gyasi (1 night stay)', 1, 400, 'cash'),
('Nemok Lodge', '2026-03-04', 'accommodation', 'Rm 7 - Ebenezer (1 night stay)', 1, 350, 'momo'),
('Nemok Lodge', '2026-03-04', 'food', 'Breakfast', 1, 40, 'momo'),
('Nemok Lodge', '2026-03-04', 'food', 'Indomie-assorted', 1, 80, 'momo'),
('Nemok Lodge', '2026-03-04', 'food', 'Banku and Tilapia (1 plate)', 1, 90, 'cash'),
('Nemok Lodge', '2026-03-04', 'drinks', 'Verna small bottle (2)', 2, 10, 'momo'),
('Nemok Lodge', '2026-03-04', 'drinks', 'Can coke (1)', 1, 20, 'momo'),
('Nemok Lodge', '2026-03-04', 'drinks', 'Verna small bottle (1)', 1, 5, 'momo'),
('Nemok Lodge', '2026-03-04', 'drinks', 'Verna small bottle (4)', 4, 20, 'cash'),
('Nemok Lodge', '2026-03-04', 'drinks', 'Verna small bottle (1)', 1, 5, 'cash');

-- March 4 expenses
INSERT INTO activity_logs (subsidiary, date, category, description, quantity, amount, payment_method) VALUES
('Nemok Lodge', '2026-03-04', 'expense', 'Indomie', 1, 22, 'cash'),
('Nemok Lodge', '2026-03-04', 'expense', 'Tomatoes', 1, 10, 'cash');

-- March 7 storeroom items taken
INSERT INTO activity_logs (subsidiary, date, category, description, quantity, amount, payment_method, notes) VALUES
('Nemok Lodge', '2026-03-07', 'expense', 'Milo (from storeroom)', 12, 0, 'cash', 'Items taken from store room'),
('Nemok Lodge', '2026-03-07', 'expense', 'Soap (from storeroom)', 5, 0, 'cash', 'Items taken from store room'),
('Nemok Lodge', '2026-03-07', 'expense', 'T-roll (from storeroom)', 4, 0, 'cash', 'Items taken from store room');


-- =============================
-- AMOAH TRAITS — FACTORY PRODUCTION
-- =============================

-- Week of 2nd-7th March 2026 (6 inch blocks)
INSERT INTO activity_logs (subsidiary, date, category, description, quantity, amount, payment_method, notes) VALUES
('Amoah Traits', '2026-03-02', 'production', '6 inch blocks — 15 bags', 600, 0, NULL, '6 inch, 15 bags, 600 blocks'),
('Amoah Traits', '2026-03-04', 'production', '6 inch blocks — 15 bags', 600, 0, NULL, '6 inch, 15 bags, 600 blocks'),
('Amoah Traits', '2026-03-05', 'production', '6 inch blocks — 20 bags', 800, 0, NULL, '6 inch, 20 bags, 800 blocks'),
('Amoah Traits', '2026-03-06', 'production', '6 inch blocks — 21 bags', 840, 0, NULL, '6 inch, 21 bags, 840 blocks'),
('Amoah Traits', '2026-03-07', 'production', '6 inch blocks — 20 bags', 0, 0, NULL, '6 inch, 20 bags, blocks');


-- =============================
-- AMOAH TRAITS — TRANSACTIONS
-- =============================

-- Tuesday 03/03/26
INSERT INTO activity_logs (subsidiary, date, category, description, amount, payment_method, notes) VALUES
('Amoah Traits', '2026-03-03', 'income', 'Amount received from Foase', 4500, 'cash', NULL),
('Amoah Traits', '2026-03-03', 'expense', 'Weedicides (2)', 100, 'cash', NULL),
('Amoah Traits', '2026-03-03', 'expense', 'Driver Asiedu - Loading guys at Factory', 200, 'cash', NULL),
('Amoah Traits', '2026-03-03', 'expense', 'Blacksmith workmanship (center bolt)', 800, 'cash', NULL),
('Amoah Traits', '2026-03-03', 'expense', 'T&T to Sofoline (Mutala & Asiedu)', 20, 'cash', NULL),
('Amoah Traits', '2026-03-03', 'expense', 'T&T from Donyinah to Kokoben (Mutala)', 30, 'cash', NULL),
('Amoah Traits', '2026-03-03', 'payment', 'Amount given to Mr. Amoah', 3350, 'cash', NULL);

-- Invoice 05/03/26 (Invoice #004243 — Dealers in Plumbing & Hardwares)
INSERT INTO activity_logs (subsidiary, date, category, description, amount, payment_method, notes) VALUES
('Amoah Traits', '2026-03-05', 'invoice', '3500 pcs 5-solid blocks @ GH₵9', 31500, 'cash', 'Invoice #004243 - Dealers in Plumbing & Hardwares, Kumasi'),
('Amoah Traits', '2026-03-05', 'invoice', '100 bags rope 32.5 @ GH₵76', 7600, 'cash', 'Invoice #004243'),
('Amoah Traits', '2026-03-05', 'invoice', 'Loading', 200, 'cash', 'Invoice #004243');

-- Friday 06/03/26
INSERT INTO activity_logs (subsidiary, date, category, description, amount, payment_method, notes) VALUES
('Amoah Traits', '2026-03-06', 'income', 'Cement sales (cash portion)', 2080, 'cash', 'Total cement sales GH₵5720'),
('Amoah Traits', '2026-03-06', 'income', 'Cement sales (MoMo portion)', 3120, 'momo', 'Total cement sales GH₵5720'),
('Amoah Traits', '2026-03-06', 'income', 'Block sales', 900, 'momo', NULL),
('Amoah Traits', '2026-03-06', 'expense', 'Balance for Aboboyaa blocks (Michael Oppong)', 80, 'cash', NULL),
('Amoah Traits', '2026-03-06', 'expense', 'Loading guys pay (400 bags)', 400, 'cash', NULL);

-- 7th March order (not yet delivered)
INSERT INTO activity_logs (subsidiary, date, category, description, amount, payment_method, notes) VALUES
('Amoah Traits', '2026-03-07', 'income', '250 of 5 inch blocks ordered (not delivered)', 2250, 'cash', '250×9=2250, T&T=150, Total=2400. Paid cash to Mr Ahmed. Used as part payment to Foase workers.'),
('Amoah Traits', '2026-03-07', 'expense', 'T&T for 5 inch block delivery', 150, 'cash', NULL);

-- Order request: 1000 hollow blocks to Asuofia (Mr. Gabriel)
INSERT INTO activity_logs (subsidiary, date, category, description, amount, payment_method, notes) VALUES
('Amoah Traits', '2026-03-03', 'invoice', '1,000 hollow blocks to Asuofia (requested by Mr. Gabriel)', 0, NULL, 'Pending delivery');


-- =============================
-- DCCU DAILY BALANCE SHEET
-- =============================

-- Thursday 5th March, 2026
INSERT INTO dccu_daily_sheets (
  date, savings, withdrawals, net_savings,
  physical_cash, momo_collection,
  loan_disbursed, loan_repayments, net_loan_balance,
  total_income, total_expenses, profit_loss,
  bank_balance, momo_line_balance, total_available,
  petty_cash, operating_cash,
  total_shares, total_loans, total_members_deposit,
  income_breakdown, expense_breakdown, notes
) VALUES (
  '2026-03-05',
  17155, 22580, -5425,
  15005, 2150,
  0, 6425, 868802.70,
  1334, 270, 1064,
  103581.34, 5.10, 103586.44,
  2, 103588.44,
  93094, 868802.70, 975849.75,
  '{"Interest on Loans": 1334}',
  '{"Motor Fuel": 130, "Motor Engine Oil": 140}',
  'Approval requested for GH₵30,000 withdrawal for operations (holiday anticipated). Bank deposit total GH₵36,105. Bank cheque withdraw GH₵30,000.'
);

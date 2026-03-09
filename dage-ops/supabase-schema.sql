-- ============================================
-- DAGE GROUP — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================

-- 1. CITY XPRESS — Trucks
CREATE TABLE trucks (
  id BIGSERIAL PRIMARY KEY,
  plate TEXT NOT NULL,
  driver TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Available',
  route TEXT DEFAULT '—',
  last_update TEXT DEFAULT 'Today',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. CITY XPRESS — Fuel Logs
CREATE TABLE fuel_logs (
  id BIGSERIAL PRIMARY KEY,
  truck TEXT NOT NULL,
  date DATE NOT NULL,
  litres NUMERIC NOT NULL,
  cost NUMERIC NOT NULL,
  station TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. CITY XPRESS — Payments
CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  client TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  date DATE,
  status TEXT NOT NULL DEFAULT 'Pending',
  ref TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. CITY XPRESS — KPI Targets
CREATE TABLE kpi_targets (
  id BIGSERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  target NUMERIC NOT NULL,
  current NUMERIC NOT NULL DEFAULT 0,
  unit TEXT NOT NULL
);

-- 5. CITY XPRESS — Applicants
CREATE TABLE applicants (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  phone TEXT,
  date DATE,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. AMOAH TRAITS — Construction Leads
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  site TEXT NOT NULL,
  contact TEXT,
  phone TEXT,
  location TEXT,
  product TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. AMOAH TRAITS — Retailer Partners
CREATE TABLE retailers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  phone TEXT,
  products TEXT,
  status TEXT NOT NULL DEFAULT 'Prospect',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. AMOAH TRAITS — Materials Catalog
CREATE TABLE materials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock TEXT NOT NULL DEFAULT 'In Stock'
);

-- 9. SCHOOLS — Inspection Checklist
CREATE TABLE checklist_items (
  id BIGSERIAL PRIMARY KEY,
  school TEXT NOT NULL,
  category TEXT NOT NULL,
  item TEXT NOT NULL,
  done BOOLEAN DEFAULT false
);

-- 10. SCHOOLS — Staff Notes
CREATE TABLE staff_notes (
  id BIGSERIAL PRIMARY KEY,
  school TEXT NOT NULL,
  note TEXT NOT NULL,
  date DATE,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. NEMOK LODGE — Rooms
CREATE TABLE rooms (
  id BIGSERIAL PRIMARY KEY,
  number TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Available',
  guest TEXT DEFAULT '—',
  check_in TEXT DEFAULT '—',
  check_out TEXT DEFAULT '—'
);

-- 12. NEMOK LODGE — Hospitality Standards
CREATE TABLE hospitality_standards (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  item TEXT NOT NULL,
  done BOOLEAN DEFAULT false
);

-- 13. NEMOK LODGE — Notes
CREATE TABLE lodge_notes (
  id BIGSERIAL PRIMARY KEY,
  note TEXT NOT NULL,
  date DATE,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 14. GM REMINDERS (Dashboard)
CREATE TABLE reminders (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  done BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 15. WEBSITE — Contact Submissions
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  page TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- For now, allow all operations for authenticated users
-- ============================================

ALTER TABLE trucks ENABLE ROW LEVEL SECURITY;
ALTER TABLE fuel_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE retailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitality_standards ENABLE ROW LEVEL SECURITY;
ALTER TABLE lodge_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: allow all operations for authenticated users (the GM)
CREATE POLICY "Allow all for authenticated" ON trucks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON fuel_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON payments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON kpi_targets FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON applicants FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON retailers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON materials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON checklist_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON staff_notes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON rooms FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON hospitality_standards FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON lodge_notes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON reminders FOR ALL USING (auth.role() = 'authenticated');

-- Contact submissions: anyone can INSERT (website visitors), only authenticated can SELECT
CREATE POLICY "Anyone can submit" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can read" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');

-- 16. ISSUES (Dage Problems site)
CREATE TABLE issues (
  id BIGSERIAL PRIMARY KEY,
  subsidiary TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Problem',
  priority TEXT NOT NULL DEFAULT 'Medium',
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  name TEXT,
  contact TEXT,
  status TEXT NOT NULL DEFAULT 'Open',
  response TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE issues ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an issue (anonymous insert)
CREATE POLICY "Anyone can submit issues" ON issues FOR INSERT WITH CHECK (true);
-- Anyone can read a single issue by ID (for tracking)
CREATE POLICY "Anyone can track issues" ON issues FOR SELECT USING (true);
-- Only authenticated (GM) can update issues (respond, change status)
CREATE POLICY "Auth can update issues" ON issues FOR UPDATE USING (auth.role() = 'authenticated');
-- Only authenticated (GM) can delete issues
CREATE POLICY "Auth can delete issues" ON issues FOR DELETE USING (auth.role() = 'authenticated');

-- 17. ACTIVITY LOGS (daily transactions for all subsidiaries)
CREATE TABLE activity_logs (
  id BIGSERIAL PRIMARY KEY,
  subsidiary TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2),
  amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated" ON activity_logs FOR ALL USING (auth.role() = 'authenticated');

-- 18. DCCU DAILY SHEETS (Credit Union daily balancing)
CREATE TABLE dccu_daily_sheets (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  savings DECIMAL(12,2) DEFAULT 0,
  withdrawals DECIMAL(12,2) DEFAULT 0,
  net_savings DECIMAL(12,2) DEFAULT 0,
  physical_cash DECIMAL(12,2) DEFAULT 0,
  momo_collection DECIMAL(12,2) DEFAULT 0,
  loan_disbursed DECIMAL(12,2) DEFAULT 0,
  loan_repayments DECIMAL(12,2) DEFAULT 0,
  net_loan_balance DECIMAL(12,2) DEFAULT 0,
  total_income DECIMAL(12,2) DEFAULT 0,
  total_expenses DECIMAL(12,2) DEFAULT 0,
  profit_loss DECIMAL(12,2) DEFAULT 0,
  bank_balance DECIMAL(12,2) DEFAULT 0,
  momo_line_balance DECIMAL(12,2) DEFAULT 0,
  total_available DECIMAL(12,2) DEFAULT 0,
  petty_cash DECIMAL(12,2) DEFAULT 0,
  operating_cash DECIMAL(12,2) DEFAULT 0,
  total_shares DECIMAL(12,2) DEFAULT 0,
  total_loans DECIMAL(12,2) DEFAULT 0,
  total_members_deposit DECIMAL(12,2) DEFAULT 0,
  income_breakdown JSONB,
  expense_breakdown JSONB,
  bank_details JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE dccu_daily_sheets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated" ON dccu_daily_sheets FOR ALL USING (auth.role() = 'authenticated');

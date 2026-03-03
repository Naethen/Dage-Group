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

INSERT INTO trucks (plate, driver, status, route, last_update) VALUES
  ('GR 1234-22', 'Kofi Mensah', 'On Route', 'Accra → Kumasi', 'Today 08:30'),
  ('GR 5678-21', 'Yaw Asante', 'Available', '—', 'Today 07:00'),
  ('GR 9012-23', 'Kweku Boateng', 'Maintenance', '—', 'Yesterday'),
  ('GR 3456-20', 'Ama Owusu', 'On Route', 'Kumasi → Takoradi', 'Today 09:15');

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

INSERT INTO fuel_logs (truck, date, litres, cost, station) VALUES
  ('GR 1234-22', '2025-03-01', 120, 900, 'Total — Accra'),
  ('GR 5678-21', '2025-03-02', 95, 712, 'Shell — Kumasi'),
  ('GR 9012-23', '2025-03-03', 110, 825, 'Total — Takoradi');

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

INSERT INTO payments (client, amount, date, status, ref) VALUES
  ('Accra Retailers Ltd', 4500, '2025-03-01', 'Paid', 'CX-001'),
  ('Kumasi Wholesale', 3200, '2025-03-03', 'Pending', 'CX-002'),
  ('Takoradi Foods', 5800, '2025-03-05', 'Pending', 'CX-003'),
  ('Northern Supply Co.', 2100, '2025-02-28', 'Overdue', 'CX-004');

-- 4. CITY XPRESS — KPI Targets
CREATE TABLE kpi_targets (
  id BIGSERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  target NUMERIC NOT NULL,
  current NUMERIC NOT NULL DEFAULT 0,
  unit TEXT NOT NULL
);

INSERT INTO kpi_targets (label, target, current, unit) VALUES
  ('Monthly Deliveries', 200, 147, 'trips'),
  ('Monthly Revenue', 80000, 54300, 'GH₵'),
  ('Fleet Utilisation', 90, 75, '%'),
  ('On-Time Delivery Rate', 95, 88, '%');

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

INSERT INTO applicants (name, role, phone, date, status) VALUES
  ('Emmanuel Agyei', 'Truck Driver', '0241234567', '2025-03-01', 'Pending'),
  ('Joseph Asiedu', 'Loading Assistant', '0557654321', '2025-03-02', 'Interviewed'),
  ('Samuel Darko', 'Truck Driver', '0244445566', '2025-03-04', 'Hired');

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

INSERT INTO leads (site, contact, phone, location, product, status, date) VALUES
  ('Kasoa Housing Project', 'Mr. Adu', '0244001122', 'Kasoa', 'Blocks, Sand', 'Contacted', '2025-03-01'),
  ('East Legon Apartments', 'Mrs. Sarpong', '0557889900', 'East Legon', 'Blocks', 'Pending', '2025-03-03'),
  ('Tema Comm. 25 Road', 'Ing. Kwame', '0241234000', 'Tema', 'Gravel, Sand', 'Converted', '2025-02-28');

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

INSERT INTO retailers (name, location, phone, products, status) VALUES
  ('Acheampong Hardware', 'Kumasi', '0322001234', 'Blocks, Cement', 'Active'),
  ('Accra Building Supplies', 'Accra', '0302445566', 'Sand, Gravel', 'Active'),
  ('Takoradi Materials Depot', 'Takoradi', '0312778899', 'Blocks', 'Prospect');

-- 8. AMOAH TRAITS — Materials Catalog
CREATE TABLE materials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock TEXT NOT NULL DEFAULT 'In Stock'
);

INSERT INTO materials (name, unit, price, stock) VALUES
  ('Sandcrete Blocks (4")', 'Per Block', 3.50, 'In Stock'),
  ('Sandcrete Blocks (5")', 'Per Block', 4.20, 'In Stock'),
  ('Sandcrete Blocks (6")', 'Per Block', 5.00, 'In Stock'),
  ('Sharp Sand', 'Per Trip', 550, 'In Stock'),
  ('Laterite', 'Per Trip', 400, 'In Stock'),
  ('Coarse Gravel', 'Per Trip', 650, 'Low Stock'),
  ('Cement (Retail, 50kg bag)', 'Per Bag', 85, 'In Stock');

-- 9. SCHOOLS — Inspection Checklist
CREATE TABLE checklist_items (
  id BIGSERIAL PRIMARY KEY,
  school TEXT NOT NULL,
  category TEXT NOT NULL,
  item TEXT NOT NULL,
  done BOOLEAN DEFAULT false
);

INSERT INTO checklist_items (school, category, item, done) VALUES
  ('montessori', 'Ambience', 'Building exterior — clean and well-maintained', false),
  ('montessori', 'Ambience', 'Classrooms — adequate lighting and ventilation', true),
  ('montessori', 'Ambience', 'Signage and school branding visible from road', false),
  ('montessori', 'Ambience', 'Playground area — safe and hazard-free', false),
  ('montessori', 'People', 'All staff in correct dress code', true),
  ('montessori', 'People', 'Student attendance registers up to date', true),
  ('montessori', 'People', 'Staff welfare — check-in with head teacher', false),
  ('montessori', 'Assets', 'Teaching materials — adequate stock', true),
  ('montessori', 'Assets', 'Furniture — no damaged desks or chairs', false),
  ('montessori', 'Assets', 'Toilets — clean and functional', false),
  ('montessori', 'Stakeholders', 'Parent-teacher meeting scheduled for term', false),
  ('montessori', 'Stakeholders', 'GES compliance documents up to date', true),
  ('galaxy', 'Ambience', 'School gate and perimeter — secure', true),
  ('galaxy', 'Ambience', 'Notice boards updated with current info', false),
  ('galaxy', 'Ambience', 'Assembly grounds — clean and organised', true),
  ('galaxy', 'People', 'Teachers present and on time', true),
  ('galaxy', 'People', 'Student discipline — disciplinary log reviewed', false),
  ('galaxy', 'People', 'Dress code policy enforced uniformly', false),
  ('galaxy', 'Assets', 'ICT lab — equipment functional', true),
  ('galaxy', 'Assets', 'Library — books organised and accessible', false),
  ('galaxy', 'Stakeholders', 'Education office correspondence filed', true),
  ('galaxy', 'Stakeholders', 'SSNIT contributions — staff records updated', false);

-- 10. SCHOOLS — Staff Notes
CREATE TABLE staff_notes (
  id BIGSERIAL PRIMARY KEY,
  school TEXT NOT NULL,
  note TEXT NOT NULL,
  date DATE,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO staff_notes (school, note, date, resolved) VALUES
  ('Montessori', 'Mrs. Asante requested maternity leave from April', '2025-03-01', false),
  ('Galaxy', 'Mr. Boateng — recurring late arrivals, verbal warning given', '2025-03-02', false),
  ('Both', 'New dress code policy distributed — confirm receipt from all staff', '2025-03-03', true);

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

INSERT INTO rooms (number, type, status, guest, check_in, check_out) VALUES
  ('101', 'Standard', 'Occupied', 'Mr. Kwame Appiah', '2025-03-02', '2025-03-05'),
  ('102', 'Standard', 'Available', '—', '—', '—'),
  ('103', 'Deluxe', 'Occupied', 'Mrs. Ama Sarpong', '2025-03-03', '2025-03-06'),
  ('104', 'Deluxe', 'Cleaning', '—', '—', '—'),
  ('201', 'Executive Suite', 'Occupied', 'Ing. Darko', '2025-03-01', '2025-03-07'),
  ('202', 'Standard', 'Available', '—', '—', '—'),
  ('203', 'Standard', 'Maintenance', '—', '—', '—'),
  ('204', 'Deluxe', 'Available', '—', '—', '—');

-- 12. NEMOK LODGE — Hospitality Standards
CREATE TABLE hospitality_standards (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  item TEXT NOT NULL,
  done BOOLEAN DEFAULT false
);

INSERT INTO hospitality_standards (category, item, done) VALUES
  ('Neatness', 'Reception area — clean and welcoming', true),
  ('Neatness', 'All rooms — beds made and linen fresh', false),
  ('Neatness', 'Corridors and stairwells — swept and lit', true),
  ('Neatness', 'Bathrooms — sanitised and stocked', false),
  ('Safety', 'Fire extinguishers — inspected and accessible', true),
  ('Safety', 'Emergency exits — clearly marked', true),
  ('Safety', 'CCTV — operational and recording', false),
  ('Hospitality', 'Staff greeting guests at check-in', true),
  ('Hospitality', 'Breakfast service — on time and well-presented', false),
  ('Hospitality', 'Guest complaints — logged and addressed within 24h', false);

-- 13. NEMOK LODGE — Notes
CREATE TABLE lodge_notes (
  id BIGSERIAL PRIMARY KEY,
  note TEXT NOT NULL,
  date DATE,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO lodge_notes (note, date, resolved) VALUES
  ('Room 203 AC unit needs repair — technician called', '2025-03-01', false),
  ('Weekend event booking confirmed — 30 guests expected', '2025-03-02', false),
  ('New bedsheets ordered — delivery expected Friday', '2025-03-03', true);

-- 14. GM REMINDERS (Dashboard)
CREATE TABLE reminders (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  done BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO reminders (text, priority, done) VALUES
  ('Review City Xpress fuel logs for this week', 'high', false),
  ('Follow up on pending Amoah Traits construction site leads', 'high', false),
  ('Complete Montessori school inspection checklist', 'medium', false),
  ('Staff dress code policy — distribute to both schools', 'medium', false),
  ('Nemok Lodge — review hospitality standards report', 'low', false);

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

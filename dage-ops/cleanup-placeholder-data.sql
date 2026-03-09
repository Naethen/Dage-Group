-- =============================================================
-- CLEANUP: Delete all placeholder/dummy data from Supabase
-- Run this in Supabase SQL Editor to clear fake data
-- =============================================================

-- City Xpress
DELETE FROM trucks;
DELETE FROM fuel_logs;
DELETE FROM payments;
DELETE FROM kpi_targets;
DELETE FROM applicants;

-- Amoah Traits
DELETE FROM leads;
DELETE FROM retailers;
DELETE FROM materials;

-- Schools
DELETE FROM checklist_items;
DELETE FROM staff_notes;

-- Nemok Lodge
DELETE FROM rooms;
DELETE FROM hospitality_standards;
DELETE FROM lodge_notes;

-- Dashboard
DELETE FROM reminders;

-- NOTE: This does NOT delete from these tables (they have real data or are empty):
--   contact_submissions (real website submissions)
--   issues (real dage-problems submissions)
--   activity_logs (real operational data from seed-data-march-2026.sql)
--   dccu_daily_sheets (real credit union data)

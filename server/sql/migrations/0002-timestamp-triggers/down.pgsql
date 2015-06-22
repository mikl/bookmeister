-- Reverse migration for timestamp triggers.

DROP FUNCTION bookmeister_insert_timestamps() CASCADE;
DROP FUNCTION bookmeister_update_timestamps() CASCADE;

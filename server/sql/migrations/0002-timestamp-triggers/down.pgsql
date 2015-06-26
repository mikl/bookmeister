-- Reverse migration for timestamp triggers.

DROP FUNCTION bookmarks.insert_timestamps() CASCADE;
DROP FUNCTION bookmarks.update_timestamps() CASCADE;

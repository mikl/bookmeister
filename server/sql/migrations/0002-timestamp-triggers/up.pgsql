-- Create triggers to automatically update bookmark timestamps on
-- insert/update.

-- Set added_at to now, and optionally sets created_at to the same, if
-- not specified by the creating query.
CREATE OR REPLACE FUNCTION bookmarks.insert_timestamps()
RETURNS TRIGGER AS $$
BEGIN
    NEW.added_at = CURRENT_TIMESTAMP;

    IF NEW.created_at IS NULL THEN
      NEW.created_at = NEW.added_at;
    END IF;

    RETURN NEW;
END;
$$ language 'plpgsql';

-- When a row is changed, set its updated_at timestamp to now.
CREATE OR REPLACE FUNCTION bookmarks.update_timestamps()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;

    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER insert_timestamps
    BEFORE INSERT ON bookmarks.bookmarks
    FOR EACH ROW
    EXECUTE PROCEDURE bookmarks.insert_timestamps();

CREATE TRIGGER update_timestamps
    BEFORE UPDATE ON bookmarks.bookmarks
    FOR EACH ROW
    EXECUTE PROCEDURE bookmarks.update_timestamps();

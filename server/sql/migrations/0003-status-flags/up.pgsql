ALTER TABLE bookmarks.bookmarks
  ADD COLUMN private boolean NOT NULL DEFAULT FALSE,
  ADD COLUMN to_read boolean NOT NULL DEFAULT FALSE;

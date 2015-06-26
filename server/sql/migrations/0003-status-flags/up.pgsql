ALTER TABLE bookmarks.bookmarks
  ADD COLUMN private boolean DEFAULT FALSE,
  ADD COLUMN to_read boolean DEFAULT FALSE;

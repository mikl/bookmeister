ALTER TABLE bookmarks.bookmarks
  ADD COLUMN tags text[] NOT NULL DEFAULT '{}';

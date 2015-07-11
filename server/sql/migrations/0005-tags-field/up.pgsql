ALTER TABLE bookmarks.bookmarks
  ADD COLUMN tags text[] NOT NULL DEFAULT '{}';

CREATE INDEX tag_idx
  ON bookmarks.bookmarks USING GIN (tags);

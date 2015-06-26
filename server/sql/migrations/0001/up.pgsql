CREATE SCHEMA bookmarks;

CREATE TABLE bookmarks.bookmarks
(
  id uuid NOT NULL,
  url text NOT NULL,
  title text,
  description text,
  added_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone,
  CONSTRAINT bookmarks_pkey PRIMARY KEY (id)
);

CREATE INDEX url_idx
  ON bookmarks.bookmarks (url);

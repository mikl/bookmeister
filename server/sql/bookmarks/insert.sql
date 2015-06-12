INSERT INTO bookmarks (id, url, title, description, added_at, created_at)
VALUES ($1, $2, $3, $4, now(), now());

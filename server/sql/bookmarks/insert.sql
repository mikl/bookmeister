INSERT INTO bookmarks (id, url, title, description, private, to_read)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING added_at, created_at;

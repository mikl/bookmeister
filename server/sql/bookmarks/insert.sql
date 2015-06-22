INSERT INTO bookmarks (id, url, title, description)
VALUES ($1, $2, $3, $4)
RETURNING added_at, created_at;

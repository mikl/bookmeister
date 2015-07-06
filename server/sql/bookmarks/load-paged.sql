SELECT * FROM bookmarks.bookmarks
ORDER BY created_at, added_at DESC
LIMIT $1 OFFSET $2;

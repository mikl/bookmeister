UPDATE bookmarks
  SET url = $1,
      title = $2,
      description = $3,
      private = $4,
      to_read = $5
WHERE id = $6
RETURNING id, updated_at;

UPDATE bookmarks.bookmarks
  SET url = $1,
      title = $2,
      description = $3,
      private = $4,
      to_read = $5,
      tags = string_to_array($6, ',')
WHERE id = $7
RETURNING id, updated_at;

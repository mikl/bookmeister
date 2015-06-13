UPDATE bookmarks
  SET url = $1,
      title = $2,
      description = $3,
      updated_at = now()
WHERE id = $4
RETURNING updated_at;

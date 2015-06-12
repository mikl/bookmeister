UPDATE bookmarks
  SET url = $1,
      title = $2,
      description = $3
WHERE id = $4
RETURNING id;

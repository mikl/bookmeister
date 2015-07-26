INSERT INTO users.accounts (username, email)
VALUES ($1, $2)
RETURNING created_at;

CREATE SCHEMA users;

CREATE TABLE users.accounts
(
  username text NOT NULL PRIMARY KEY,
  email text UNIQUE,
  email_verified boolean NOT NULL default FALSE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  last_login_at timestamp with time zone
);

CREATE TABLE users.credentials
(
  id SERIAL PRIMARY KEY,
  username text NOT NULL
    REFERENCES users.accounts
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  credential_type text NOT NULL,
  secret text NOT NULL,
  metadata jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX username_credential_type
  ON users.credentials (username, credential_type);

-- Enforce that's there's only one password per user.
CREATE UNIQUE INDEX unique_password 
  ON users.credentials (username, credential_type)
  WHERE credential_type = 'password';

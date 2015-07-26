INSERT INTO users.credentials (username, credential_type, secret)
  VALUES ($1, 'password', crypt($2, gen_salt('bf', 14)));

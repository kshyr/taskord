pub enum AuthError {
    InvalidToken,
    InvalidCredentials,
    InvalidRole,
    MissingToken,
    MissingCredentials,
}

impl std::fmt::Display for AuthError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match *self {
            AuthError::InvalidToken => write!(f, "Invalid Token"),
            AuthError::InvalidCredentials => write!(f, "Invalid Credentials"),
            AuthError::InvalidRole => write!(f, "Invalid Role"),
            AuthError::MissingToken => write!(f, "Missing Token"),
            AuthError::MissingCredentials => write!(f, "Missing Credentials"),
        }
    }
}

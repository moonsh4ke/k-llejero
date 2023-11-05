src/models: definitions of user schema, and function defenitions for user model

src/routes:

    current-user: sends the current user as response or null

    signin: saves a session cookie with a jwt signed with user payloads

    signout: set the cookie session to null

    signup: saves user with hashed pw

src/services/password: provide a Password class to make password operations: hash & compare

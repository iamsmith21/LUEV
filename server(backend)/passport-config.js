const LocalStrategy = require("passport-local").Strategy;
const db = require("./db/query");
const bcrypt = require("bcryptjs");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await db.getUserByEmail(email);

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.getUserById(id);

      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = {
  initialize,
};

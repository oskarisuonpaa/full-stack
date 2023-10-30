const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const User = require("../models/user");

module.exports = (passport) => {
  let options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.SECRET;

  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.getUserById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

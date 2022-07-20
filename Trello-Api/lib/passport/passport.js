import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWTSECRET,
      },
      async (jwtPayload, done) => {
        try {
          const user = await User.findById(jwtPayload.userId);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
});

export default passport
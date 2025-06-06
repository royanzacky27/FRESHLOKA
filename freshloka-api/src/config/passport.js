const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

require('dotenv').config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                return done(err, false);
            }
        })
    );
};

const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport =require("passport")
const User = require("../models/user.js");
// import jwt from "jsonwebtoken";


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user
        
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            profilePhotoUrl: profile.photos[0].value,
          });
        }
        return done(null, user); // ✅ user goes to callback
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


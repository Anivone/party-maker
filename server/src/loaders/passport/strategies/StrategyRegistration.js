const container = require("../../../container");
const LocalStrategy = require('passport-local').Strategy;

const {postgres, to, crypto} = container.cradle;

module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        postgres.UserAccount
            .findOne(id)
            .then(user => {
                done(null, user);
                return null
            });
    });

    passport.use(
        'user-registration',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, email, password, next) => {
                const {
                    firstName,
                    lastName,
                    middleName,
                    birthDate,
                    city,
                    seekingParty = false
                } = req.body;

                process.nextTick(async () => {
                    const [errFind, userFind] = await to(
                        postgres.UserAccount.findOne(
                            {
                                where: {
                                    email
                                }
                            }
                        )
                    );

                    if (errFind) return next(errFind);
                    if (userFind)
                        return next(new Error('User with such email already exists.'));

                    const [errPerson, person] = await to(
                        postgres.Person.create({
                            firstName,
                            lastName,
                            middleName,
                            birthDate,
                            city,
                            seekingParty
                        })
                    );

                    if (errPerson) return next(errPerson);

                    const salt = crypto.randomBytes(64).toString('hex');

                    const pwd = postgres.UserAccount.encryptPassword(password, salt);

                    const [errNew, userNew] = await to(
                        postgres.UserAccount.create({
                            email,
                            password: pwd,
                            salt,
                            personId: person.id
                        })
                    );

                    if (errNew) return next(errNew);

                    return next(null);

                });
            }
        )
    )
}
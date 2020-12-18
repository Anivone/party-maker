const container = require("../../../container")();
const LocalStrategy = require('passport-local').Strategy;

const {postgres, to} = container.cradle;

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
                    postgresRepository
                } = req.container.cradle;

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
                        postgresRepository.findOne('UserAccount',{email})
                    );

                    if (errFind) return next(errFind);
                    if (userFind)
                        return next(new Error('User with such email already exists.'));

                    const [errPerson, person] = await to(
                        postgresRepository.create('Person',{
                            firstName,
                            lastName,
                            middleName,
                            birthDate,
                            city,
                            seekingParty
                        })
                    );

                    if (errPerson) return next(errPerson);

                    const [errNew, userNew] = await to(
                        postgresRepository.create('UserAccount', {email, password, personId: person.id})
                    );

                    if (errNew) return next(errNew);

                    return next(null);

                });
            }
        )
    )
}
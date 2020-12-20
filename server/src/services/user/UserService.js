module.exports = class UserService {

    constructor({postgresRepository, to, personService, personRatingService}) {
        this.postgresRepository = postgresRepository;
        this.to = to;
        this.personService = personService;
        this.personRatingService = personRatingService;
    }

    async findUser(filter, single) {
        return await single
            ? this.postgresRepository.findOne('UserAccount', filter)
            : this.postgresRepository.findAll('UserAccount', filter);
    }

    async getUser(id) {
        return await this.postgresRepository.get('UserAccount', id);
    }

    async createUser(email, password, personId) {
        const salt = this.postgresRepository.getModel('UserAccount').generateSalt();
        const pwd = this.postgresRepository.getModel('UserAccount').encryptPassword(password, salt);

        return await this.postgresRepository.create('UserAccount', {email, password: pwd, salt, personId});
    }

    async updateUser(filter, body) {
        return await this.postgresRepository.update('UserAccount', filter, body);
    }

    async removeUser(filter) {
        return await this.postgresRepository.remove('UserAccount', filter);
    }

    async Register({
                       firstName,
                       lastName,
                       middleName,
                       city,
                       birthDate,
                       seekingParty,
                       email,
                       password,
                   }) {
        const to = this.to;

        const [errFind, userFind] = await to(
            this.findUser({email}, true)
        );

        if (errFind) throw errFind;
        if (userFind) throw new Error('User with such email already exists.');

        const [errPerson, person] = await to(
            this.personService.createPerson({
                firstName,
                lastName,
                middleName,
                birthDate,
                city,
                seekingParty
            })
        );
        if (errPerson) throw errPerson;

        const [errUser, user] = await to(
            this.createUser(email, password, person.id)
        );
        if (errUser) throw errUser;

        const [errRating, _] = await to(
            this.personRatingService.createPersonRating({
                personId: person.id,
            })
        );
        if (errRating) throw errRating;

        return user;
    }

    async Login({
                    email,
                    password
                }) {
        const to = this.to;

        const [err, user] = await to(
            this.findUser({email}, true)
        );

        if (err) throw err;
        if (!user) throw new Error('User with such email does not exist.');

        if (!this.postgresRepository
            .getModel('UserAccount')
            .isPasswordCorrect(password, user.password, user.salt)) {

            throw new Error('Incorrect email or password !');
        }

        return user;
    }

}
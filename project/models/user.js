const db = require('../data/database');
const bcrypt = require('bcryptjs');


class User {
    constructor(email, password, isAdmin, name, address) {
        this.email = email,
        this.password = password,
        this.isAdmin = isAdmin,
        this.name = name,
        this.address = address
    };

    static async getUserData(id) {
        let userData;
        try {
             userData = await db.getDb().collection('users').findOne({_id: id}, { projection: {password: 0}});
        } catch(error) {
            error.code = 404;
            throw error;
        }

        return userData;
    }

    async getUserWithSameEmail() {
        const existingUser = await db.getDb().collection('users').findOne({email: this.email});
        return existingUser;
    }

    async existAlready() {
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser) return true;
        else return false;
    }

    
    async passwordIsEqual() {
        const existingUser = await this.getUserWithSameEmail();
        const checkPassword = bcrypt.compare(this.password, existingUser.password);
        return checkPassword;
    }

    async createUser () {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        const userData = {
            email: this.email,
            password: hashedPassword,
            isAdmin: this.isAdmin,
            name: this.name,
            address: this.address
        };

        const user = await db.getDb().collection('users').insertOne({...userData});
        return user;
    }

}

module.exports = User;
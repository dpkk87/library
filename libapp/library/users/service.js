const User = require('./model').default;

function UserService(userData) {
    async function getUsers() {
        try {
            let users = await userData.getUsers();
            return users.map(user => new User(user));
        } catch(err){
            throw err;
        }        
    }

    async function addUser(userDetails){
        const user = new User(userDetails);
        try {
            userData.addUser(user);
            return true;
        }catch(error){
            throw error;
        }
    }

    async function deleteUser(userId){
        try {
            userData.deleteUser(userId);
            return true;
        }catch(error){
            throw error;
        }
    }

    async function getUser(userId){
        try {
            const user = await userData.getUser(userId);
            return new User(user);
        }catch(error){
            throw error;
        }
    }

    return {
        getUsers,
        addUser,
        deleteUser,
        getUser
    }
};

exports.default = UserService;
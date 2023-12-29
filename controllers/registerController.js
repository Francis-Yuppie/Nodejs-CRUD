const User = require('../model/User');


// This is for the json files **demo**
// const usersDB = {
//     users: require('../model/users.json'),
//     setUser: function (data) { this.users = data }
// };

/** Uncomment the code if you are using json files as ur database */

// const fsPromises = require('fs').promises;
// const path = require('path');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'user name and password are required' });

    // check for duplicate names in the db
    // const duplicate = usersDB.users.find(person => person.username === user); /**for json files */
    const duplicate = await User.findOne({ username: user }).exec();

    if (duplicate) return res.sendStatus(409) //conflict

    try {
        // encrypt the password with bcrpt
        const hashedPwd = await bcrypt.hash(pwd, 10);

        /**
         * THE RESULT object initially was newUser without await remember
          to change when using json files

           use this code when using json files as ur db
           const newUser = {
            "username": user,
            "roles": {
                "user": 2001
            },
            "password": hashedPwd
        };
        */
       
        // create and store the new user 

        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });

        /** uncomment the code if using json files as ur database #for demo# */
        // usersDB.setUser([...usersDB.users, newUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // );
        // console.log(usersDB.users);

        console.log(result);
        
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(400).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
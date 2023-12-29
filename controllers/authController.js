// const usersDB = {
//     users: require('../model/users.json'),
//     setUser: function (data) { this.users = data }
// };

const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const fsPromises = require('fs').promises;
// const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'user name and password are required' });

    // const foundUser = usersDB.users.find(person => person.username === user); /**for json */

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401) // unauthorized

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        // create JWT
        const accessToken = jwt.sign(
            {
                "Userinfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCES_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // saving refreshToken with the current user

        /** uncomment the code if using json files as your db */

        // const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        // const currentUser = { ...foundUser, refreshToken };
        // usersDB.setUser([...otherUsers, currentUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None',  maxAge: 24 * 60 * 60 * 1000 });//secure: true,
        res.json({ accessToken });
    } else {
        res.sendStatus(401); //unauthorized
    }
}

module.exports = { handleLogin };
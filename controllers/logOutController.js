const User = require('../model/User');

/**uncoment when using json files as your db */
// const usersDB = {
//     users: require('../model/users.json'),
//     setUser: function (data) { this.users = data }
// };

// const fsPromises = require('fs').promises;
// const path = require('path');


const handleLogOut = async (req, res) => {
    // on client also delete accessToken 

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content
    const refreshToken = cookies.jwt;

    // is refreshToken in the db
    // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);/**json as db */
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // delete refreshtoken in db

    /**uncomment the code block if using json files as your db */
    // const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.username);
    // const currentUser = { ...foundUser, refreshToken: '' };
    // usersDB.setUser([...otherUsers, currentUser]);
    // await fsPromises.writeFile(
    //     path.join(__dirname, '..', 'model', 'users.json'),
    //     JSON.stringify(usersDB.users)
    // );

    /** mongo db */
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);

}

module.exports = { handleLogOut };
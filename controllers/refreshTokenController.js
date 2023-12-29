const User = require('../model/User');
const jwt = require('jsonwebtoken');

/** Uncoment the code when using json files as your db */
// const usersDB = {
//     users: require('../model/users.json'),
//     setUser: function (data) { this.users = data }
// };



const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    // console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    /**uncoment when using json file as your db */
    // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken); 
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) return res.sendStatus(403) // forbidden

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "Userinfo": {
                        "username": decoded.userrname,
                        "roles": roles
                    }
                },
                process.env.ACCES_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken });
        }
    );

}

module.exports = { handleRefreshToken };
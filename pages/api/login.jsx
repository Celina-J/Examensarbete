import DB from "../../classes/db";
import bcrypt from 'bcrypt';


export default function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).send('Method not allowed');

    const db = new DB();
    const body = JSON.parse(req.body);
    const hashedPWD = bcrypt.hashSync(body.password, process.env.PASSWORD_SALT);
    const userObj = {
        isLoggedIn: false,
        userData: {}
    }

    db.query('SELECT id FROM `accounts` WHERE `email`=? AND `password`=? AND `active`=1', [body.email, hashedPWD])
        .then(user => {
            
            if (user.data.length === 1) {
                db.query('CALL get_account(?)', [user.data[0].id]).then(account => {
                    userObj.userData = account.data[0][0];
                    userObj.isLoggedIn = true;
                    userObj.userData.roles = account.data[0][0].roles?.split(',') || [];
                    return res.status(200).json(userObj);
                }).catch((err) => res.status(500).json(userObj));
            }else {
                return res.status(401).json(userObj);
            }
        })
        .catch(() => res.status(500).json(userObj));
}
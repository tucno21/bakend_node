const jwt = require('jsonwebtoken');

interface Props {
    uid: string;
    email: string;
}

export const generateJWT = ({ uid, email }: Props) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, email };

        jwt.sign(payload, process.env.JWT_SECRET, {

            expiresIn: '24h'

        }, (err: any, token: any) => {

            if (err) {


                reject('No se pudo generar el token');

            } else {

                resolve(token);

            }
        });
    });
}

export const comprobarJWT = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false, null];
    }
}
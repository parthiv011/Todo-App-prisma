import jwt, { JwtPayload } from 'jsonwebtoken';
import secret from '../config';

const authMiddleware = async(req:any, res:any, next:any) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            msg: "Invalid Token Format!"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;

        req.userId = decoded.id;

        next();
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                msg: 'Token expired'
            });
        }
        console.error(e);
        res.status(403).json({
            msg: "Authentication failed as user! / Invalid Token!"
        });
    }
}

export default authMiddleware;
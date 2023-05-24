import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dot from 'dotenv';

dot.config();
// Middleware for JWT verification
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Get the JWT token from the request header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify and decode the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log(decodedToken, ": Decoded Token"); 
        // Attach the decoded payload to the request object
        (req as any).user = decodedToken;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


import jwt from 'jsonwebtoken';
import dot from 'dotenv'
dot.config();
export function generateJwtToken(obj: object, time: string) {
    if (process.env.JWT_SECRET)
        return jwt.sign(obj, process.env.JWT_SECRET as string, { expiresIn: time })
    else return null;
}

export function verifyJwtToken(token: string): string | null {
    if (process.env.JWT_SECRET) {
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            console.log(verified, 'verify'); 
            if(verified) {
                const {refresh, userId} = verified as jwt.JwtPayload; 
                if(refresh)
                    return null
                return userId; 
            }
        } catch {   
            return null 
        }  
    }
    return null 
}

export function checkIfUserExists(email: string): boolean {
    return false;
}
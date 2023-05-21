import { Router } from 'express';
import { generateJwtToken, verifyJwtToken } from '../../libs/auth';
import { getGoogleOauthToken, getGoogleUser } from '../../libs/googleAuth';
import { checkAndConnect, redisClient } from '../../libs/redis';
import crypto from 'crypto';

const router = Router();

router.get('/logout', async (req, res) => {
    try {
        const { refresh } = req.cookies;
        // todo remove refresh token from DB 

        if (refresh)
            return res.clearCookie('refresh').send();
    } catch {
        return res.send();
    }
    return res.send();
})


router.post('', async (req, res) => {
    try {
        const { token } = req.body;
        const userId = verifyJwtToken(token);

        if (userId) {
            await checkAndConnect(redisClient)
            const email = await redisClient.hGet(`user:${userId}`, 'email');
            return res.json({ email });
        }

        else {
            console.log('user unauthorized')
            return res.status(401).json({ error: "Token Invalid." });
        }

    } catch (e) {
        console.log(e);
        return res.status(401).send();
    }
})

// Gets new Access Token with Refresh token 
router.get('/refresh', async (req, res) => {
  

    try {
        if (!req.cookies.refresh)
            return res.status(401).json({ error: "Invalid Refresh Token" })
        else {
            if (req.cookies['user-id'] && req.cookies.refresh) {
                const { refresh, "user-id": userId } = req.cookies;
                await checkAndConnect(redisClient);
                const refreshToken = await redisClient.hGet(`user:${userId}`, 'refreshToken')

                if (refreshToken === refresh) {
                    const accessToken = generateJwtToken({ userId, refresh: false });
                    const expiryDate = Date.now() + 20000;
                    const newRefreshToken = crypto.randomUUID();
                    await redisClient.hSet(`user:${userId}`, ['refreshToken', newRefreshToken])
                    res.cookie('refresh', newRefreshToken, { maxAge: 200000, httpOnly: true })
                    res.json({ accessToken, accessTokenExpiry: expiryDate })
                }

                else
                    res.status(401).send()
            } else {
                return res.status(401).json({ error: 'No user-id or refresh token.' })
            }
        }

        // todo CHECK DB FOR VALID REFRESH TOKEN 
    } catch (e) {
        return res.status(401).json({ error: "Invalid Refresh Token" }).status(401);
    }

})

router.post('/email', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //todo double check password is not null 
    //Null signifies user used OAuth to Signup/Login 

    if (!email) {
        res.status(404).send();
        return;
    }
    if (!password) {
        res.status(404).send();
        return;
    }
    // CHECK DATABASE FOR CORRECT PWD AND EMAIL 
})

/* 
Use frontend OAuth Code to Grab users email 
*/
router.post("/google", async (req, res) => {
    const code = req.body.code as string;
    try {
        const { access_token, id_token } = await getGoogleOauthToken({ code });
        const { email } = await getGoogleUser({ access_token, id_token });
        // todo CHECK IF USER IN DB
        // todo IF NOT ADD USER TO DB WITH NULL PASSWORD 
        await checkAndConnect(redisClient);
        let userId = await redisClient.hGet('users', email);
        const refreshToken = crypto.randomUUID();
        if (userId === null) {
            userId = crypto.randomUUID();
            redisClient.hSet('users', [email, userId])
            redisClient.hSet(`user:${userId}`, ['email', email, 'password', 'null'])
        }
        redisClient.hSet(`user:${userId}`, ['refreshToken', refreshToken])
        const accessToken = generateJwtToken({ userId, refresh: false });
        const expiryDate = Date.now() + 20000;
        res.header('Access-Control-Allow-Credentials', 'true')
        await redisClient.setEx(`${userId}:${refreshToken}`, 200, req.ip,) // Set Value as Users Ip to see Devices 
        res.cookie('refresh', refreshToken, { maxAge: 200000, httpOnly: true })
        res.cookie('user-id', userId, { httpOnly: true }) // Sets Refresh token as Cookie 
        console.log('refreshToken : ', refreshToken);
        res.json({ accessToken, accessTokenExpiry: expiryDate }).status(200);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
})

export default router; 
import express from 'express';
import auth from './auth';
import { checkAndConnect, redisClient } from '../../libs/redis';
import profile from './profile'; 

const router = express.Router();


router.use('/auth', auth)
router.use('/profile', profile); 
router.get('/testredis', async (req, res) => {
    try {
        await checkAndConnect(redisClient)
        const result = await redisClient.get('testKey');
        console.log(result); 
        return res.send(result); 
    } catch {
        return res.send('hello'); 
    }
   
})
export default router; 
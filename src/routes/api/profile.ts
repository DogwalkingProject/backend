import {Router} from 'express'; 
import { verifyToken } from '../../middleware/auth';
import { editProfile, getPets, postPet, postProfile } from '../../controllers/profile';

const router = Router();

router.put('/edit', verifyToken, editProfile)

router.post('/', verifyToken, postProfile)

router.post('/add-pet', verifyToken, postPet) 

router.get('/pets', verifyToken, getPets); 
export default router; 
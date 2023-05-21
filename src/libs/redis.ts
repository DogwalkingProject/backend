
import { createClient} from 'redis'; 

export const redisClient = createClient(); 
// Check if Redis Connection is Open, if not connect 
export async function checkAndConnect(client: any ) {
    if(client.isReady) {
        return; 
    } else {
        await client.connect(); 
        return; 
    }
}

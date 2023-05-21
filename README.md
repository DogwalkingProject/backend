## Dog Walking Project Backend 
A Node.js Express app 

## To run locally 
Enviroment Variables to set === JWT_SECRET=[https://www.ibm.com/docs/da/order-management?topic=SSGTJF/configuration/t_GeneratingJWTToken.htm](Resource to generate JWT Secret Key) \n
PORT=\n
REDIS=localhost:8001 (Default redis port) \n
GOOGLE_SECRET= \n
GOOGLE_CLIENT_ID= \n
OAUTH_REDIRECT=http://lvh.me:3000 (Use lvh.me(website that proxies for Localhost) because localhost isn't allowed on Google OATUH) \n

Run a Redis Docker Container ```docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest```\n
To run express app with Nodemon `npm run dev` 



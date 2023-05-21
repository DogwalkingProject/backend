## Dog Walking Project Backend 
A Node.js Express app 

## To run locally 
Enviroment Variables to set === JWT_SECRET=[https://www.ibm.com/docs/da/order-management?topic=SSGTJF/configuration/t_GeneratingJWTToken.htm](Resource to generate JWT Secret Key)
PORT=
REDIS=localhost:8001 (Default redis port)
GOOGLE_SECRET=
GOOGLE_CLIENT_ID=
OAUTH_REDIRECT=http://lvh.me:3000 (Use lvh.me(website that proxies for Localhost) because localhost isn't allowed on Google OATUH)

Run a Redis Docker Container ```docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest```
To run express app with Nodemon `npm run dev` 



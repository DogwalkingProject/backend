## Dog Walking Project Backend

A Node.js Express app

## To run locally

Set Enviroment Variables in .env file <br/>
`JWT_SECRET=` [Generate JWT Secret Key] (https://www.ibm.com/docs/da/order-management?topic=SSGTJF/configuration/t_GeneratingJWTToken.htm) to generate JWT Secret Key  <br />
`PORT=` <br />
`REDIS=`localhost:8001 (Default redis port) <br />
`GOOGLE_SECRET=` <br />
`GOOGLE_CLIENT_ID=` <br />
`OAUTH_REDIRECT=`http://lvh.me:3000 (Use lvh.me(website that proxies for Localhost) because localhost isn't allowed on Google OATUH) <br>

Run a Redis Docker Container `docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest` <br />
To run express app with Nodemon `npm run dev`

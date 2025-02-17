const express = require('express');
const jwt = require('jsonwebtoken');
const secret = "notreallyasecret";
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/customer", session({secret:"fingerprint_customer", resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", async function auth(req,res,next){
//Write the authenication mechanism here
    try {
        const token = await req.headers.authorization;

        if(!token || !token.includes("Bearer")){
            return res.json({message:"Not authorized"}).status(401);
        }

        const tokenValue = token.slice(7, token.length);
        const user = jwt.verify( tokenValue, secret );

        if(!user){
            return res.json({message:"Invalid Token"}).status(401);
        }

        return next()
        
    } catch (error) {
        console.log(error)
        return res.json({message:error}).status(500);
        
    }
});
 
const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));

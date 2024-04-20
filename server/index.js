import  express  from "express"; 
import dotenv from "dotenv";
import  Cors  from "cors";
import  bodyParser from "body-parser";

import Connection from "./database/db.js";

import  Router  from "./routes/route.js";

dotenv.config();

const app = express();
const PORT = 3007 ;
app.use(Cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({
extended:true
}))

app.use("/",Router);


app.listen(PORT,()=>console.log(`Server is  Running at ${PORT}`));
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
console.log(username,password);
Connection(username,password);
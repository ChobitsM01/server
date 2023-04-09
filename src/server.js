import express from "express";
import configViewEngine from "./config/configViewEngine";
import initWebRoutes from "./routes/web";
require( 'dotenv' ).config();
import bodyParser from "body-parser";
import initApiRoutes from "./routes/api";
import configCors from "./config/configCors";
import cookieParser from "cookie-parser";
import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT;

configCors( app );

//config view engine
configViewEngine( app );

//config body-parser
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

//test connect to DB
connection();

//cookie parser
app.use( cookieParser() )

//init web routes
initWebRoutes( app );
initApiRoutes( app );

app.listen( PORT, () => {
    console.log( `App is being runned : http://localhost:${ PORT }` );
} )
const express = require('express')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const cors = require("cors");
const fileUpload = require("express-fileupload");
const expressSession = require('express-session')
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const dotenv = require("dotenv");
const path = require("path");
const env = require("./config")
const router = require("./router");
const moment = require('moment');
const methodOverride = require("method-override");
const flash = require("connect-flash");
const app = express(); 

//config
dotenv.config({ path: "./config/.env"})
//database
connectDB();
//mid
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));// delete
app.use(
  expressSession({
    secret: 'testotesto',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 1*24*60*60// 1 day
    })
  })
)
app.use((req, res, next) => {
  const { token } = req.session
  if (token) {
    res.locals = {
      displayLink: true
    }
  } else {
    res.locals = {
      displayLink: false
    }
  }
  next()
})
app.use((req,res,next)=> {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
})
//engine
app.engine('handlebars', expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: {
    format_date: (date, format) => {
      return moment(date).format(format);
    }
  }
}));
app.set('view engine', 'handlebars');
//router.
app.use(router);
//listening
app.listen(env("PORT",env("PORT",3333)),() => {
  console.log(`Server running on ${env("PORT",3333)}`)
})

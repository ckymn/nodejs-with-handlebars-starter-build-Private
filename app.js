const express = require('express')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const cors = require("cors");
const fileUpload = require("express-fileupload");
const expressSession = require('express-session')
const connectDB = require("./config/db");
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const dotenv = require("dotenv");
const path = require("path");
const env = require("./config")
const router = require("./router");
const moment = require('moment');
const app = express(); 

dotenv.config({ path: "./config/.env"})

connectDB();

app.engine('handlebars', expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: {
    format_date: (date, format) => {
      return moment(date).format(format);
    }
  }
}));
app.set('view engine', 'handlebars');

// app.use(
//   expressSession({
//     secret: 'testotesto',
//     resave: false,
//     saveUninitialized: true,
//     store: new mongoStore({ mongooseConnection: mongoose.connection }) //server yenilense bile biligeri kadeder
//   })
// )

// app.use((req, res, next) => {
//   res.locals.sessionFlash = req.session.sessionFlash
//   delete req.session.sessionFlash
//   next()
// })

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(fileUpload())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// app.use((req, res, next) => {
//   const { userId } = req.session
//   if (userId) {
//     res.locals = {
//       displayLink: true
//     }
//   } else {
//     res.locals = {
//       displayLink: false
//     }
//   }
//   next()
// })

app.use(router);


app.listen(env("PORT",env("PORT",3333)),() => {
  console.log(`Server running on ${env("PORT",3333)}`)
})

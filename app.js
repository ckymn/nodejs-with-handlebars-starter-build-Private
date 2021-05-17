const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongoo = require('connect-mongo')
const env = require("./config")
const connectDB = require("./config/db");
const router = require("./router");

const app = express(); 
dotenv.config({ path: "./env/env"})
// mongoose.connect('mongodb://127.0.0.1/nodeblog_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })

// const mongoStore = connectMongoo(expressSession)
// app.use(
//   expressSession({
//     secret: 'testotesto',
//     resave: false,
//     saveUninitialized: true,
//     store: new mongoStore({ mongooseConnection: mongoose.connection }) //server yenilense bile biligeri kadeder
//   })
// )

// connectDB();

// app.use((req, res, next) => {
//   res.locals.sessionFlash = req.session.sessionFlash
//   delete req.session.sessionFlash
//   next()
// })

app.use(fileUpload())
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use("/", (req,res) => {
  res.render("index")
})

app.use((req, res, next) => {
  const { userId } = req.session
  if (userId) {
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

// app.use('/', get)
// app.use('/posts', posts)
// app.use('/users', users)
// app.use('/admin', admin)
app.use(router);


app.listen(env("PORT",3333),() => {
  console.log(`Server running on ${env("PORT",3333)}`)
})

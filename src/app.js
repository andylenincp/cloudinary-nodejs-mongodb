const express = require('express')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
const exphbs = require('express-handlebars')
const indexRoutes = require('./routes/index')

// Initializations
const app = express()
require('./database')

// Settings
app.set('title', 'nodejs-mongodb-cloudinary')
app.set('port', process.env.PORT || 5000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})
app.use(multer({storage}).single('image'))

// Routes
app.use(indexRoutes)

// Public
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app
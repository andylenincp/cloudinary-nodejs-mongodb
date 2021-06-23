const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log(`DB is connected. URI: ${process.env.MONGODB_URI}`))
    .catch(err => console.error(err))
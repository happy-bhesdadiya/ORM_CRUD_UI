const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const db = require('./models');
const userRoute = require('./routes/userRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(morgan('tiny'))

//set views file
app.set('views',path.join(__dirname,'views'))

//set view engine
app.set('view engine', 'ejs');

app.locals.msg = null
app.locals.title = {}

app.use(userRoute);

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server started at port 3000');
    })
}).catch((err) => {
    console.log(err);
}); 

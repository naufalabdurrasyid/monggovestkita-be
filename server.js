const express = require('express');
const app = express();
const port = process.env.PORT || 3000;  

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const dbConfig = require('./config/dbServer');
const cors = require('cors')

 
app.use(cors())

//const bcrypt = require('bcrypt');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//configure mongoose promise
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.mongoURL, {
    useNewUrlParser: true
}).then(() => {
    console.log('yeah connect to database')
}).catch(error => {
    console.log('waduh gabisa ni connect ke database', error);
    process.exit
})
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// url encode of content type

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/',(req,res) => res.send('welcome to express'))

app.get('/api/', (req, res) => res.send('this is api'))

// import router

require('./app/routes/user.routes')(app);

app.listen(port, function(){
    console.log("Express server listening on port "+ port);
  });


module.exports = app;
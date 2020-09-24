const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
require('dotenv').config();
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');





//ldap client looks
// var ldap = require('ldapjs');


// function autheticateDN(username, password) {
//     var client = ldap.createClient({
//         url: 'ldap://127.0.0.1:10389'
//       });
//       client.bind(username, password, function(err) {
//         if(err)
//         {
//             console.log("Error in new connection " + err);
//         }else {
//             console.log("Success");
//         }
//       });
// }
// autheticateDN("uid=admin,ou=system", "secret");

 





//bring routes



//app
const app = express();


//db 
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log('DB connected'));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if(process.env.NODE_ENV == 'development'){
    app.use(cors({ origin: `${process.env.CLIENT_URL}`}));
}


//routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);


//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const app = express();
const PORT = process.env.PORT || 5000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//home
app.get('/',(req, res) => res.render('index'));
//static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/employees', require('./routes/api/employees'));

//start port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const fileupload = require('express-fileupload');

const app = express();

//Connect Database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));
app.use(fileupload());

//app.get('/', (req, res) => res.send('API running'));

//Upload endpoint
app.post('/upload', (req, res) => {
    if(req.files === null){
        return res.status(400).json({ msg: 'No file uploaded'});
    }
    const file = req.files.file;
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err){
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});
    })
});

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
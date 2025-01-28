import express from 'express';
import mongoose from "mongoose";
import placesRouter from './routes/places.js'

const app = express();
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

//middleware voor JSON-gegevens
app.use(express.json());

//middleware voor www-urlencoded-gegevens
app.use(express.urlencoded({extended: true}));

//middleware to check if request accept is application/json
app.use((req, res, next) =>{
    if(req.header('Accept') !== 'application/json' && req.method !== "OPTIONS"){
        res.status(406).json({error: 'Only JSON is allowed as Accept header'})
    }else{
        next();
    }
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

app.get('/', (req, res) => {
    res.json({message: 'welkom'});
});


app.use('/places', placesRouter);

app.listen(process.env.EXPRESS_PORT, ()=>{
    console.log('server gestart')
})
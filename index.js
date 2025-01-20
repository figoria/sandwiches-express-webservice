import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.json({message: 'welkom'});
});

app.listen(process.env.EXPRESS_PORT, ()=>{
    console.log('server gestart')
})
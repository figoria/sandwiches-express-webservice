import express from "express";
import Place from "../models/Place.js";
import {faker} from "@faker-js/faker";

const router = express.Router();

router.options('/', (req, res) =>{
    res.header('Allow', 'GET,POST,OPTIONS');
    res.status(204).send();
})

router.get('/', async (req, res) =>{
    const places = await Place.find();
    res.json({items: places});
})

router.post('/seed', async (req, res) => {
    try {
        console.log(req.body);

        //delete all before add new
        await Place.deleteMany({});

        //create new items
        for (let i = 0; i < req.body.amount; i++){
            await Place.create({
                name: faker.word.adverb(),
                description: faker.lorem.paragraph(3),
                review: faker.lorem.paragraph({min: 1, max: 5})
            });
        }
        res.json({message: `maakte ${req.body.amount} places`});
    }catch (e){
        console.log(e)
    }
})

router.options('/:id', (req, res) =>{
    res.header('Allow', 'GET,PUT,DELETE,PATCH,OPTIONS');
    res.status(204).send();
});

router.get('/:id', async (req, res) =>{
    router.options('GET, PUT, DELETE, PATCH, OPTIONS')
    try{
        const place = await  Place.findOne({_id: req.params.id});
        res.json(place);
    }catch (e){
        console.log(e);
        res.json({error: e.message});
    }
});

export default router;
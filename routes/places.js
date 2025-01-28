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
    res.json({items: places,
        "_links": {
            "self": {
                "href": `${process.env.HOST}/places/`
            },
            "collection": {
                "href": `${process.env.HOST}/places/`
            }
        }});
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
                shop: faker.word.adverb(),
                description: faker.lorem.paragraph(3),
                review: faker.lorem.paragraph({min: 1, max: 5}),
                address: faker.location.streetAddress()
            });
        }
        res.json({message: `maakte ${req.body.amount} places`});
    }catch (e){
        console.log(e)
    }
})

router.post('/', async (req, res )=> {
    try {
        await Place.create({
            name:req.body.name,
            shop:req.body.shop,
            description:req.body.description,
            review:req.body.review,
            address:req.body.address,
        });

        res.status(201).send('post send');
    }catch (error){
            console.log(error);
            res.status(400).json({error: error.message});
        }
})
router.options('/:id', (req, res) =>{
    res.header('Allow', 'GET,PUT,DELETE,PATCH,OPTIONS');
    res.status(204).send();
});

router.get('/:id', async (req, res) =>{
    try{
        const place = await  Place.findOne({_id: req.params.id});

        //dit werkt nog niet
        if(!place){
            return res.status(404).json({message:'item not found'});
        }
        res.json(place);

    }catch (e){
        console.log(e);
        res.json({error: e.message});
    }
});
router.put('/:id', async (req, res )=> {
    try {
        const place = await  Place.findOne({_id: req.params.id});
        await place.updateOne({
            name:req.body.name,
            shop:req.body.shop,
            description:req.body.description,
            review:req.body.review,
            address:req.body.address,
        });

        if(
            !req.body.name ||
            !req.body.shop ||
            !req.body.description ||
            !req.body.review ||
            !req.body.address
        ){
            return res.status(400).send({
                message: 'send all required fields',
            });
        }
        res.status(200).send('post changed');
    }catch (error){
        console.log(error);
        res.status(400).json({error: error.message});
    }


})

router.delete('/:id', async (req, res )=> {
    try {
        const place = await  Place.findOne({_id: req.params.id});
        await place.deleteOne()
        res.status(204).send('post deleted');
    }catch (error){
        console.log(error);
        res.status(400).json({error: error.message});
    }
})
export default router;
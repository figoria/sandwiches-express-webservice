import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    name:{type: String, required: true},
    description:{type: String, required: true},
    review:{type: String, required: true},
}, {

    "_links": {
        "self": {
            "href": "/:id"
        },
        "collection": {
            "href": "/places"
        }
    }
});

const Place = mongoose.model('Place', placeSchema);
export default Place;
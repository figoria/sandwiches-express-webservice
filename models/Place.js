import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    name:{type: String, required: true},
    shop:{type: String, required: true},
    description:{type: String, required: true},
    review:{type: String, required: true},
    address:{type: String, required: true},
}, {
    toJSON: {
        virtuals: true,
            versionKey: false,
            transform: (doc, ret) => {

            ret._links = {
                self: {
                    href: `${process.env.HOST}/places/${ret.id}`
                },
                collection: {
                    href: `${process.env.HOST}/places`
                },
            }

            delete ret._id
        }
    }
});

const Place = mongoose.model('Place', placeSchema);
export default Place;
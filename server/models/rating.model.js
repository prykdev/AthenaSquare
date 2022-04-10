const { model, Schema } = require('mongoose');

const rating = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    upvotes: [{
        userId: { type: String, required: true },
        time: { type: String, required: true },
    }],
    downvotes: [{
        userId: { type: String, required: true },
        time: { type: String, required: true },
    }],
    rating: { type: String, default: "100" },
}, {timestamps: true});

model('ratings', rating);

module.exports = {
    model: model('ratings'),
    schema: rating,
};
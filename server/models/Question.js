import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    numQuestions: {
        type: Number,
        required: true,
    },
    generatedQuestions: [{
        question: String,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const Question = mongoose.model('Question', questionSchema);

export default Question;

import OpenAI from 'openai-api';
import Question from '../models/Question.js';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Generate questions using OpenAI
export const generateQuestionPaper = async (req, res) => {
    const { subject, difficulty, numQuestions } = req.body;

    const prompt = `Generate ${numQuestions} questions for ${subject} with ${difficulty} difficulty`;

    const response = await openai.complete({
        engine: 'text-davinci-003',
        prompt,
        maxTokens: 500,
    });

    const questions = response.data.choices[0].text.split('\n').filter(q => q.trim() !== '');

    const newQuestionPaper = await Question.create({
        subject,
        difficulty,
        numQuestions,
        generatedQuestions: questions.map(question => ({ question })),
        user: req.user._id,
    });

    res.status(201).json(newQuestionPaper);
};

// Save and retrieve generated papers
export const getQuestionPapers = async (req, res) => {
    const papers = await Question.find({ user: req.user._id });
    res.json(papers);
};

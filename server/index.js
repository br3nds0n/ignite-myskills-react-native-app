const express = require('express');

const app = express();

let database = [];

function getSkills() {
    return database;
}

function addSkill(skill) {
    database.push(skill);
}

function removeSkill(skill) {
    database = database.filter(s => s != skill);
}

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.get('/skills', (req, res) => {
    const skills = getSkills();

    res.status(200).json(skills)
});

app.post('/skills', (req, res) => {
    const { skill } = req.body;

    if (!skill) {
        return res.status(400).send('Skill is required');
    }

    addSkill(skill);
    res.status(201).send();
});

app.delete('/skills/:skill', (req, res) => {
    const { skill } = req.params;
    console.log(skill)
    removeSkill(skill);

    res.status(200).send();
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
import express from 'express';
const router = express.Router();
const Race = require('../models/Race');

router.get('/', async (req, res) => {
    try{
        const races = await Race.find(); // mongoose method
        res.json(races);
    } catch (err) {
        res.json({race: err});
    }
});

//POST RACE
router.post('/', async (req, res) => {
    const race = new Race({
        Author: req.body.Author,
        StartingPoint: req.body.StartingPoint,
        Route: req.body.Route,
        Distance: req.body.Distance
    });
    // res.json(race);
    try {
        const savedRace = await race.save();
        res.json(savedRace);
    }
    catch(err) {
        res.json({race: err});
    }
});

//SPECIFIC RACE
router.get('/:postId', async (req, res) => {
    try{
        const post = await Race.findById(req.params.postId);
        res.json(post);
    }catch(err) {
        res.json({message: err});
    }
});

//DELETE RACE
router.delete('/:raceId', async (req, res) => {
    try {
        const removedRace = await Race.remove({_id: req.params.raceId})
        res.json(removedRace);
    } catch(err) {
        res.json({race: err});
    }
});

module.exports = router;
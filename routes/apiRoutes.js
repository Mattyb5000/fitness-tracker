const router = require('express').Router();
const Workout = require('../models/workout');

router.post('/api/workouts', (req, res) => {
    Workout.create({}).then(data => {
        console.log(data);
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
});

router.put('/api/workouts/:id', (req, res) => {
    // console.log(req)
    Workout.findByIdAndUpdate(
        req.params.id,
        {$push: {exercises: req.body}},
    ).then((data) => {
        console.log("HUH?!", data)
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
})

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
          },
        },
      ]).then(answer => {
        res.json(answer);
    })
    .catch(err => {
        res.status(400).json(err);
    });
})

module.exports = router;
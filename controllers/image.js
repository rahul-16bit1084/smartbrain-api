// import Clarifai from 'clarifai';
const Clarifai = require('clarifai');


//You must add your own API key here from Clarifai. 
const app = new Clarifai.App({
 apiKey: '3a68c4f584764f56a3346846dfc19ee3'
});

const handleApiCall = (req, res) => {
  app.models
        // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    // .predict('3a68c4f584764f56a3346846dfc19ee3', req.body.input)
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = { handleApiCall, handleImage }
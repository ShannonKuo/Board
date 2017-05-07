const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

let data = [];
router.get('/', (req, res) => {
  res.json(data);        
});

router.get('/comments', (req, res) => {
  res.json(data);
})
router.post('/comments', (req, res) => {
  console.log('success');        
  const r = req.body;
  const d = {
    id: r.id,
    user: r.user,
    content: r.content,
    time: r.time,
    comments: [],
  }
  console.log( d.time);
  data.push(d); 
});

router.post('/reply', (req, res) => {
  console.log('success');        
  const r = req.body;
  data[r.id].comments = r.comments; 
});


module.exports = router;

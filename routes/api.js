const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

let post = {
  data: [], 
};
router.get('/', (req, res) => {
  res.json(data);        
});

router.get('/comments', (req, res) => {
  res.send('get comment');
})
router.post('/comments', (req, res) => {
  console.log('success');        
  const r = req.body;
  const d = {
    id: r.id,
    user: r.user,
    content: r.content,
    time: r.time,
  }
  post.data.push(d); 
});

module.exports = router;

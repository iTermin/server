const express = require('express');
const meetingApp = express();
const debug = require('debug')('ma:index')

const router = express.Router();

router.use((req, res, next) => {
  debug(`/${req.method}`);
  next();
});

router.get('/user/:id', (req, res, next) => {
  debug(req.params.id)
  if (req.params.id) {
    res.json({
      message: 'You must pass ID other than 0'
    });
  }
  else next();
});

router.get('/', (req,res) => {
  res.json({
    message : 'Hello World'
  });
});

router.get('/user/:id', (req, res, next) => {
  res.json({
    message: `Hello ${req.parms.id}`
  });
});

meetingApp.use('/',router);

// Listen to this Port

meetingApp.listen(3000, () => {
  console.log('Live at Port 3000');
});

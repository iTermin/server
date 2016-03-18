var express = require('express');
var meetingApp = express();

var router = express.Router();

router.use(function(req, res, next){
  console.log("/" + req.method);
  next();
});

router.get("/user/:id", function(req, res, next){
  console.log(req.params.id)
  if (req.params.id) {
    res.json({
      "message": "You must pass ID other than 0"
    });
  }
  else next();
});

router.get("/",function(req,res){
  res.json({
    "message" : "Hello World"
  });
});

router.get("/user/:id", function(req, res, next){
  res.json({
    "message": "Hello" + req.parms.id
  });
});

meetingApp.use("/",router);

// Listen to this Port

meetingApp.listen(3000,function(){
  console.log("Live at Port 3000");
});

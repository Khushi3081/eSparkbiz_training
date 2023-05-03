const userData = require('../controller/userdataController');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',userData.data);
//   

/* insert data into database*/
router.post('/addData',userData.addData);

/* database data shown in table */
/*backend data shown in frontend */
router.get('/getAllData',userData.getAllData);

module.exports = router;

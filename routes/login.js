const express = require('express');
const router = express.Router();


const admin =  require('../Api/adminlogin');

router.post('/admin/login',admin.adminlogin);
// router.post('/register', admin.admireg);


module.exports = router;
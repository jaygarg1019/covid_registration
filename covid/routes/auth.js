const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login2', authController.login2);
router.get('/admin_vaccine', authController.get_vaccine);
router.get('/admin_patient', authController.get_patient);
router.get('/admin_nurse', authController.get_nurse);
router.get('/nurse_info', authController.get_nurse_info);
router.get('/nurse_info_update', authController.get_nurse_info_update);
router.get('/vaccine_update', authController.get_vaccine_update);
router.post('/add_vaccine', authController.add_vaccine);
router.post('/register_nurse', authController.add_nurse);
// router.get('/patient_home', authController.patient_h);


module.exports = router;
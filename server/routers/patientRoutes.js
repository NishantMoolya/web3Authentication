const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.patch('/:publicKey', patientController.updatePatient);

module.exports = router;

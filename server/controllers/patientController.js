// controllers/patientController.js

const Patient = require('../models/Patient');

exports.updatePatient = async (req, res) => {
  try {
    const { publicKey } = req.params; // publicKey from URL

    const updates = req.body; // fields to update

    if (!publicKey) {
      return res.status(400).json({ error: "Public key is required in params." });
    }

    const updatedPatient = await Patient.findOneAndUpdate(
      { publicKey },      // Filter by public key
      { $set: updates },  // Apply updates
      { new: true }       // Return the updated document
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crypto = require('crypto');
const nonces = require('../db/models/nonceSchema');
const ethers = require('ethers');
const jwt = require('jsonwebtoken');
const Doctors = require('../db/models/doctorSchema');
const Patients = require('../db/models/patientSchema');
const Staffs = require('../db/models/staffSchema');

const message = "Sign this message to authenticate: ";
const defaultUserRole = 'patient';

const getNonce = async (req, res) => {
    try {
        const { walletAddress } = req.body;

        if (!walletAddress) {
            return res.status(400).json({ data: null, error: "walletAddress is required" });
        }

        // Check if a nonce already exists for the wallet address
        let existingNonce = await nonces.findOne({ walletAddress:walletAddress.toLowerCase() });

        if (existingNonce) {
            return res.status(201).json({ data: `${message}${existingNonce.nonce}`, error: null });
        }

        // Create new nonce
        const nonce = crypto.randomBytes(32).toString('hex');
        const newNonce = new nonces({ walletAddress:walletAddress.toLowerCase(), nonce });
        await newNonce.save();

        res.status(201).json({ data: `${message}${nonce}`, error: null });

    } catch (err) {
        console.error("Error generating nonce:", err);
        res.status(500).json({ data: null, error: "An error occurred while generating nonce" });
    }
};

const verifySignature = async (req, res) => {
    try {
        const { walletAddress, signature, role } = req.body;

        if (!walletAddress || !signature) {
            return res.status(400).json({ data: null, error: "walletAddress and signature are required" });
        }

        const nonceDoc = await nonces.findOne({ walletAddress: walletAddress.toLowerCase() });
        if (!nonceDoc) {
            return res.status(400).json({ data: null, error: "No nonce found" });
        }

        const verifiableMessage = `${message}${nonceDoc.nonce}`;
        const signerAddress = ethers.verifyMessage(verifiableMessage, signature);

        if (signerAddress.toLowerCase() !== walletAddress.toLowerCase()) {
            return res.status(401).json({ data: null, error: "Invalid signature" });
        }

        // Determine role and corresponding model
        let userModel;
        let selectedRole = role || defaultUserRole;

        switch (selectedRole.toLowerCase()) {
            case 'patient':
                userModel = Patients;
                break;
            case 'doctor':
                userModel = Doctors;
                break;
            case 'staff':
                userModel = Staffs;
                break;
            default:
                return res.status(400).json({ data: null, error: "Invalid role provided" });
        }

        const existingUser = await userModel.findOne({ walletAddress: walletAddress.toLowerCase() });

        if (!existingUser) {
            const newUser = new userModel({
                walletAddress: walletAddress.toLowerCase(),
                role: selectedRole
            });
            await newUser.save();
        }

        const token = jwt.sign(
            { address: walletAddress, role: selectedRole },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.TOKEN_EXPIRE }
        );

        await nonces.deleteOne({ walletAddress: walletAddress.toLowerCase() });

        res.status(201).json({ data: { token }, error: null });
    } catch (err) {
        console.error("Signature verification error:", err);
        res.status(500).json({ data: null, error: "An error occurred during signature verification" });
    }
};

module.exports = { verifySignature,getNonce }
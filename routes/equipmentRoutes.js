const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

// Add equipment (Only farmers)
router.post('/:userId/equipment', equipmentController.addEquipment);

// Update equipment (Only farmers)
router.put('/:userId/equipment/:equipmentId', equipmentController.updateEquipment);

// Delete equipment (Only farmers)
router.delete('/:userId/equipment/:equipmentId', equipmentController.deleteEquipment);

module.exports = router;

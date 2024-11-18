const User = require('../models/user');

// Controller to add equipment (Only for farmers)
exports.addEquipment = async (req, res) => {
  try {
    const { userId } = req.params; // ID of the user
    const equipmentData = req.body; // Equipment details from the request body

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the user is a farmer
    if (user.role !== 'farmer') {
      return res.status(403).json({ message: 'Only farmers can add equipment' });
    }

    await user.listEquipment(equipmentData);
    res.status(201).json({ message: 'Equipment added successfully', equipment: user.equipment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding equipment', error: error.message });
  }
};

// Controller to update equipment (Only for farmers)
exports.updateEquipment = async (req, res) => {
  try {
    const { userId, equipmentId } = req.params; // User and equipment IDs
    const updatedData = req.body; // Updated equipment details from the request body

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the user is a farmer
    if (user.role !== 'farmer') {
      return res.status(403).json({ message: 'Only farmers can update equipment' });
    }

    // Find the specific equipment to update
    const equipment = user.equipment.id(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    // Update the equipment fields
    Object.keys(updatedData).forEach((key) => {
      equipment[key] = updatedData[key];
    });

    await user.save();
    res.status(200).json({ message: 'Equipment updated successfully', equipment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating equipment', error: error.message });
  }
};

// Controller to delete equipment (Only for farmers)
exports.deleteEquipment = async (req, res) => {
  try {
    const { userId, equipmentId } = req.params; // User and equipment IDs

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the user is a farmer
    if (user.role !== 'farmer') {
      return res.status(403).json({ message: 'Only farmers can delete equipment' });
    }

    await user.deleteEquipment(equipmentId);
    res.status(200).json({ message: 'Equipment deleted successfully', equipment: user.equipment });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting equipment', error: error.message });
  }
};

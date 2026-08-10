const Property = require('../models/Property');

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).sort({ createdAt: -1 });
    return res.json(properties);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property) {
      return res.json(property);
    } else {
      return res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

const createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    const createdProperty = await property.save();
    return res.status(201).json(createdProperty);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid property data', error: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (property) {
      return res.json(property);
    } else {
      return res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Invalid property data', error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (property) {
      return res.json({ message: 'Property removed' });
    } else {
      return res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty };

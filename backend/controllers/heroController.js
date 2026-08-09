const HeroImage = require('../models/HeroImage');

exports.getHeroImages = async (req, res) => {
  try {
    const images = await HeroImage.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addHeroImage = async (req, res) => {
  try {
    const { url, title } = req.body;
    const newImage = new HeroImage({ url, title });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: 'Server error adding image' });
  }
};

exports.deleteHeroImage = async (req, res) => {
  try {
    const { id } = req.params;
    await HeroImage.findByIdAndDelete(id);
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting image' });
  }
};

const SiteSettings = require('../models/SiteSettings');
const GlobalSettings = require('../models/GlobalSettings');

// Default initial data for pages if not in DB yet
const defaultSettings = {
  buy: {
    title: 'Expert Guidance For Buyers',
    subtitle: 'From finding the perfect neighborhood to negotiating the best terms, we are with you every step of the way.',
    backgroundImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80'
  },
  sell: {
    title: "Maximize Your Home's Value",
    subtitle: 'We use data-driven pricing, premium presentation, and aggressive marketing to sell your home for top dollar.',
    backgroundImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80'
  },
  about: {
    title: 'Our Story',
    subtitle: 'Dedicated to excellence, integrity, and achieving exceptional results for our clients.',
    backgroundImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&q=80'
  },
  areas: {
    title: 'Areas We Serve',
    subtitle: 'Deep local expertise across the most sought-after neighborhoods. We know the streets, the schools, and the hidden opportunities.',
    backgroundImage: 'https://images.unsplash.com/photo-1580659328221-a53ec8651817?w=1600&q=80'
  }
};

// @desc    Get all site settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.find();
    
    // If DB is empty, return default structured object
    if (settings.length === 0) {
      return res.json(defaultSettings);
    }

    // Convert array to object keyed by page name
    const formattedSettings = {};
    settings.forEach(s => {
      formattedSettings[s.page] = {
        title: s.title,
        subtitle: s.subtitle,
        backgroundImage: s.backgroundImage
      };
    });

    // Merge with defaults in case some pages are missing from DB
    res.json({ ...defaultSettings, ...formattedSettings });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching settings' });
  }
};

// @desc    Update site settings for a specific page
// @route   PUT /api/settings/:page
// @access  Private/Admin
exports.updateSettings = async (req, res) => {
  try {
    const { page } = req.params;
    const { title, subtitle, backgroundImage } = req.body;

    let setting = await SiteSettings.findOne({ page });

    if (setting) {
      setting.title = title;
      setting.subtitle = subtitle;
      setting.backgroundImage = backgroundImage;
      await setting.save();
    } else {
      setting = await SiteSettings.create({
        page,
        title,
        subtitle,
        backgroundImage
      });
    }

    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Server error updating settings' });
  }
};

const defaultGlobalSettings = {
  headerLinks: [
    { label: 'Home', url: '/' },
    { label: 'Buy', url: '/buy' },
    { label: 'Sell', url: '/sell' },
    { label: 'Listings', url: '/listings' },
    { label: 'Our Team', url: '/team' },
    { label: 'Areas We Serve', url: '/areas' }
  ],
  footerLinks: [
    { label: 'Privacy Policy', url: '#' },
    { label: 'Terms of Service', url: '#' },
    { label: 'Sitemap', url: '#' }
  ],
  socialLinks: [
    { platform: 'Facebook', url: '#' },
    { platform: 'Instagram', url: '#' },
    { platform: 'LinkedIn', url: '#' }
  ],
  contactInfo: {
    phone: '1-800-555-0199',
    email: 'contact@nazmulrealestate.com',
    address: '123 Luxury Ave, Beverly Hills, CA 90210'
  },
  stats: [
    { value: '500+', label: 'Homes Sold' },
    { value: '15+', label: 'Years Experience' },
    { value: '12', label: 'Local Markets' },
    { value: '99%', label: 'Client Satisfaction' }
  ]
};

// @desc    Get global settings (links, contact info)
// @route   GET /api/settings/global
// @access  Public
exports.getGlobalSettings = async (req, res) => {
  try {
    let settings = await GlobalSettings.findOne();
    if (!settings) {
      settings = await GlobalSettings.create(defaultGlobalSettings);
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching global settings' });
  }
};

// @desc    Update global settings
// @route   PUT /api/settings/global
// @access  Private/Admin
exports.updateGlobalSettings = async (req, res) => {
  try {
    let settings = await GlobalSettings.findOne();
    if (settings) {
      settings.headerLinks = req.body.headerLinks || settings.headerLinks;
      settings.footerLinks = req.body.footerLinks || settings.footerLinks;
      settings.socialLinks = req.body.socialLinks || settings.socialLinks;
      settings.contactInfo = req.body.contactInfo || settings.contactInfo;
      if (req.body.stats) settings.stats = req.body.stats;
      await settings.save();
    } else {
      settings = await GlobalSettings.create(req.body);
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Server error updating global settings' });
  }
};

require('dotenv').config();
const mongoose = require('mongoose');
const GlobalSettings = require('./models/GlobalSettings');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://monirulislam:OkyYf3iU5Gf8TnsI@cluster0.o894p.mongodb.net/nazmul-real-estate?retryWrites=true&w=majority');
    console.log('MongoDB connected');
    
    let settings = await GlobalSettings.findOne();
    
    if (settings) {
      // Add missing sections if they don't have points/steps
      if (!settings.sellSection || !settings.sellSection.points || settings.sellSection.points.length === 0) {
        settings.sellSection = {
          title: 'Sell For Top Dollar',
          subtitle: 'A strategic, data-driven approach to maximizing your property value.',
          points: [
            'Comprehensive Market Analysis',
            'Professional Photography & Staging Guidance',
            'Aggressive Digital Marketing Campaigns',
            'Targeted Buyer Outreach',
            'Expert Negotiation Strategies'
          ]
        };
      }
      
      if (!settings.buySection || !settings.buySection.steps || settings.buySection.steps.length === 0) {
        settings.buySection = {
          title: 'Buy With Confidence',
          subtitle: 'Our proven framework for finding and securing your dream home.',
          steps: [
            { title: 'Consultation & Strategy', desc: 'We start by understanding your exact needs, timeline, and financial goals.' },
            { title: 'Property Search', desc: 'Access off-market listings and get priority viewings for the best homes.' },
            { title: 'Negotiation & Closing', desc: 'Expert negotiation to secure the best price and terms on your behalf.' }
          ]
        };
      }

      if (!settings.whyUsSection || !settings.whyUsSection.reasons || settings.whyUsSection.reasons.length === 0) {
        settings.whyUsSection = {
          title: 'Why Choose Nazmul Team?',
          subtitle: 'Experience the difference of working with true local experts.',
          reasons: [
            { title: 'Local Expertise', desc: 'Deep knowledge of neighborhoods, schools, and market trends.' },
            { title: 'Proven Results', desc: 'A track record of selling homes faster and for more money.' },
            { title: 'Client-First Approach', desc: 'Your goals are our priority. We communicate transparently at every step.' }
          ]
        };
      }

      // Update social links
      settings.socialLinks = [
        { platform: 'Facebook', url: '#' },
        { platform: 'YouTube', url: '#' },
        { platform: 'LinkedIn', url: '#' }
      ];

      await settings.save();
      console.log('GlobalSettings updated successfully with CMS data and Social Icons!');
    } else {
      console.log('No GlobalSettings found. Restart the backend server first.');
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Property = require('../models/Property');
const TeamMember = require('../models/TeamMember');
const HeroImage = require('../models/HeroImage');
const SiteSettings = require('../models/SiteSettings');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nazmul-real-estate';

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Wipe existing data to prevent duplicates during seeding
    console.log('Wiping existing data...');
    await Property.deleteMany({});
    await TeamMember.deleteMany({});
    await HeroImage.deleteMany({});
    await SiteSettings.deleteMany({});

    // 1. Seed Properties
    console.log('Seeding Properties...');
    const properties = [
      {
        title: 'Modern Beverly Hills Estate',
        address: '1000 Beverly Drive',
        city: 'Beverly Hills',
        state: 'CA',
        zip: '90210',
        price: 8500000,
        beds: 5,
        baths: 6,
        sqft: 7500,
        propertyType: 'Single Family',
        status: 'For Sale',
        description: 'Breathtaking modern estate with panoramic city views, infinity edge pool, and smart home automation.',
        images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80']
      },
      {
        title: 'Malibu Oceanfront Retreat',
        address: '22110 Pacific Coast Hwy',
        city: 'Malibu',
        state: 'CA',
        zip: '90265',
        price: 12400000,
        beds: 4,
        baths: 4.5,
        sqft: 5200,
        propertyType: 'Single Family',
        status: 'For Sale',
        description: 'Direct beach access, floor-to-ceiling glass walls, and a private wraparound deck overlooking the Pacific.',
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80']
      },
      {
        title: 'Downtown Luxury Penthouse',
        address: '888 S Figueroa St, Penthouse A',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90017',
        price: 4200000,
        beds: 3,
        baths: 3,
        sqft: 3100,
        propertyType: 'Condo',
        status: 'For Sale',
        description: 'Ultra-luxury penthouse featuring 20ft ceilings, private elevator access, and unobstructed skyline views.',
        images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80']
      }
    ];
    await Property.insertMany(properties);

    // 2. Seed Team Members
    console.log('Seeding Team Members...');
    const teamMembers = [
      {
        name: 'Nazmul',
        role: 'Team Lead & Founder',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        bio: 'With over 15 years in luxury real estate, Nazmul built this team to provide unparalleled service.',
        email: 'nazmul@example.com',
        phone: '(555) 123-4567'
      },
      {
        name: 'Sarah Jenkins',
        role: 'Lead Buyer Specialist',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
        bio: 'Sarah specializes in helping buyers and investors find high-ROI properties before they hit the market.',
        email: 'sarah@example.com',
        phone: '(555) 987-6543'
      },
      {
        name: 'Michael Chen',
        role: 'Listing Strategist',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
        bio: 'Michael uses data-driven marketing to ensure our listings sell faster and for record-breaking prices.',
        email: 'michael@example.com',
        phone: '(555) 456-7890'
      }
    ];
    await TeamMember.insertMany(teamMembers);

    // 3. Seed Hero Images
    console.log('Seeding Hero Images...');
    const heroImages = [
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80' },
      { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80' },
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80' }
    ];
    await HeroImage.insertMany(heroImages);

    // 4. Seed Site Settings
    console.log('Seeding Site Settings...');
    const settings = [
      {
        page: 'buy',
        title: 'Expert Guidance For Buyers',
        subtitle: 'From finding the perfect neighborhood to negotiating the best terms, we are with you every step of the way.',
        backgroundImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80'
      },
      {
        page: 'sell',
        title: "Maximize Your Home's Value",
        subtitle: 'We use data-driven pricing, premium presentation, and aggressive marketing to sell your home for top dollar.',
        backgroundImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80'
      },
      {
        page: 'about',
        title: 'Our Story',
        subtitle: 'Dedicated to excellence, integrity, and achieving exceptional results for our clients.',
        backgroundImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&q=80'
      },
      {
        page: 'areas',
        title: 'Areas We Serve',
        subtitle: 'Deep local expertise across the most sought-after neighborhoods. We know the streets, the schools, and the hidden opportunities.',
        backgroundImage: 'https://images.unsplash.com/photo-1580659328221-a53ec8651817?w=1600&q=80'
      }
    ];
    await SiteSettings.insertMany(settings);

    console.log('Database Seeding Complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding Failed:', err);
    process.exit(1);
  }
};

seedDB();

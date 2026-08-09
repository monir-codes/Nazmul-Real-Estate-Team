import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Nazmul',
    role: 'Team Lead & Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    bio: 'With over 15 years in luxury real estate, Nazmul built this team to provide unparalleled service.'
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Lead Buyer Specialist',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'Sarah specializes in helping first-time buyers and investors find high-ROI properties.'
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Listing Strategist',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    bio: 'Michael uses data-driven marketing to ensure our listings sell faster and for more money.'
  }
];

const Team = () => {
  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Meet The Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Real estate professionals dedicated to your success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TEAM_MEMBERS.map(member => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="h-80 overflow-hidden relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex space-x-4 w-full">
                    <button className="flex-1 bg-white text-primary py-2 rounded font-medium flex items-center justify-center text-sm hover:bg-accent hover:text-white transition-colors">
                      <Mail className="w-4 h-4 mr-2" /> Email
                    </button>
                    <button className="flex-1 bg-white text-primary py-2 rounded font-medium flex items-center justify-center text-sm hover:bg-accent hover:text-white transition-colors">
                      <Phone className="w-4 h-4 mr-2" /> Call
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-primary mb-1">{member.name}</h3>
                <p className="text-accent font-medium mb-4">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-primary rounded-xl p-10 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4">Join Our Team</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">We are always looking for driven, ethical, and talented agents to join our growing brokerage.</p>
          <Link to="/contact" className="btn-accent">Contact Us About Careers</Link>
        </div>
      </div>
    </div>
  );
};

export default Team;

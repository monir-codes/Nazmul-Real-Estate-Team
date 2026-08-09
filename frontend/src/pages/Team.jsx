import { useState, useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import api from '../utils/api';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.get('/team');
        setTeamMembers(res.data);
      } catch (error) {
        console.error("Failed to load team data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <SEO 
        title="Our Team | Nazmul Real Estate"
        description="Meet our team of dedicated luxury real estate professionals."
      />
      <div className="container-custom py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Meet The Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Real estate professionals dedicated to your success.</p>
        </div>

        {teamMembers.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No team members found. Add some from the Admin Panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map(member => (
              <div key={member._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col">
                <div className="h-80 overflow-hidden relative">
                  <img 
                    src={member.image || 'https://via.placeholder.com/400'} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex space-x-4 w-full">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="flex-1 bg-white text-primary py-2 rounded font-medium flex items-center justify-center text-sm hover:bg-accent hover:text-white transition-colors">
                          <Mail className="w-4 h-4 mr-2" /> Email
                        </a>
                      )}
                      {member.phone && (
                        <a href={`tel:${member.phone}`} className="flex-1 bg-white text-primary py-2 rounded font-medium flex items-center justify-center text-sm hover:bg-accent hover:text-white transition-colors">
                          <Phone className="w-4 h-4 mr-2" /> Call
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-primary mb-1">{member.name}</h3>
                  <p className="text-accent font-medium mb-4">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 bg-primary rounded-xl p-10 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4">Join Our Team</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">We are always looking for driven, ethical, and talented agents to join our growing brokerage.</p>
          <Link to="/contact" className="btn-accent inline-block">Contact Us About Careers</Link>
        </div>
      </div>
    </div>
  );
};

export default Team;

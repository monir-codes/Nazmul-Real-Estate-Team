import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import SEO from '../components/SEO';
import api from '../utils/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <SEO 
        title="Real Estate Market Insights & Blog | Nazmul Real Estate" 
        description="Stay updated with the latest luxury real estate market trends, tips, and insights." 
      />
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6"
          >
            Market Insights & News
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Expert advice, local market trends, and luxury living inspiration to help you make informed real estate decisions.
          </motion.p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white rounded-2xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article 
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-premium transition-shadow group flex flex-col"
              >
                <Link to={`/blog/${post.slug}`} className="block relative h-60 overflow-hidden overflow-hidden">
                  <img 
                    src={post.coverImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center"><User className="w-4 h-4 mr-1.5" /> {post.author}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="block group-hover:text-accent transition-colors">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h2>
                  </Link>
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-1">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors mt-auto">
                    Read Article <span className="ml-2 text-xl leading-none">&rarr;</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <h3 className="text-2xl font-serif text-gray-400">No articles published yet.</h3>
            <p className="text-gray-500 mt-2">Check back soon for the latest market insights.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

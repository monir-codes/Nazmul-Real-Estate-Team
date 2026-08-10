import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import api from '../utils/api';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/slug/${slug}`);
        setPost(res.data);
      } catch (err) {
        setError('Article not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex justify-center"><div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div></div>;
  }

  if (error || !post) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-serif font-bold text-gray-400 mb-4">Article Not Found</h1>
        <Link to="/blog" className="btn-primary">Return to Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO title={`${post.title} | Nazmul Real Estate`} description={post.excerpt} />
      
      {/* Hero Header */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gray-900">
        {post.coverImage && (
          <div className="absolute inset-0">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-block bg-accent text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
            {post.category}
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight"
          >
            {post.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center text-gray-300 space-x-6"
          >
            <span className="flex items-center"><User className="w-5 h-5 mr-2" /> {post.author}</span>
            <span className="flex items-center"><Calendar className="w-5 h-5 mr-2" /> {new Date(post.createdAt).toLocaleDateString()}</span>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom max-w-3xl mx-auto -mt-10 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100"
        >
          <div 
            className="prose prose-lg prose-primary max-w-none whitespace-pre-wrap text-gray-700 leading-relaxed font-sans"
          >
            {post.content}
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link to="/blog" className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to all articles
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;

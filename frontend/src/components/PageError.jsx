import { motion } from 'framer-motion';
import { AlertOctagon, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageError = ({ message = "We're having trouble loading this content." }) => {
  return (
    <div className="pt-24 min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white p-10 rounded-2xl shadow-premium border border-gray-100 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-400 to-red-500"></div>
        
        <div className="mx-auto w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100">
          <AlertOctagon className="w-10 h-10" />
        </div>
        
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">Connection Interrupted</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          {message} Our servers might be experiencing a temporary hiccup, or your connection was lost.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-light transition-colors flex items-center justify-center shadow-md"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Try Again
          </button>
          <Link 
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PageError;

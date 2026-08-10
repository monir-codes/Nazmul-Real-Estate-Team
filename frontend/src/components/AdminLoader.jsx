import { Loader2 } from 'lucide-react';

const AdminLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
      <div className="relative mb-4">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <Loader2 className="w-12 h-12 text-accent animate-spin relative z-10" />
      </div>
      <p className="text-gray-500 font-medium animate-pulse">{message}</p>
    </div>
  );
};

export default AdminLoader;

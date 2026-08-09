import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Nazmul Real Estate Team | Premium USA Realtors",
  description = "Top-tier real estate professionals helping buyers and sellers navigate the housing market with confidence, clarity, and expert strategy.",
  keywords = "real estate, realtors, buy home, sell home, luxury real estate, property valuation, USA real estate, house for sale",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;

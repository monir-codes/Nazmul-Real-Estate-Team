# Nazmul Real Estate Team 🏡

Welcome to the official repository for the **Nazmul Real Estate Team** website. This is a full-stack, modern web application designed to help users browse luxury real estate properties, request home valuations, read the latest real estate blog posts, and securely manage their own user profiles. 

## 🎯 Purpose of the Website
The primary objective of this platform is to provide a premium, seamless digital experience for clients looking to buy, sell, or invest in real estate. The website serves as a powerful lead-generation tool for the Nazmul Real Estate Team by offering:
- **Property Listings**: Browse a curated list of active properties.
- **Home Valuation Engine**: Users can submit their property details for an accurate market valuation.
- **User Authentication**: Secure Login/Signup with Google OAuth capabilities.
- **Interactive Blog**: Educational content on real estate trends and advice.
- **Admin Dashboard**: Full CRUD (Create, Read, Update, Delete) capabilities for the site administrator to manage properties, blog posts, and registered users.

## 🛠️ Tech Stack & Technologies Used

### Frontend (Client-Side)
- **Framework**: React.js (built via Vite for lightning-fast compilation)
- **Styling**: Tailwind CSS (for modern, responsive, utility-first styling)
- **Animations**: Framer Motion (for smooth page transitions and premium hover effects)
- **Icons**: Lucide React (clean, scalable SVG icons)
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast (for sleek, interactive toast notifications)
- **Forms & Email**: EmailJS (to handle real-time contact and valuation inquiries)

### Backend (Server-Side)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (managed via Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt.js (for secure password hashing)
- **CORS & Security**: Express middlewares configured for secure cross-origin requests

### Third-Party Integrations
- **Image Hosting**: ImgBB API
- **Authentication**: Firebase (for Google OAuth)

## 🚀 Deployment
The frontend is designed to be effortlessly deployed on **Vercel** or **Render**. The backend is configured to run on a Node.js hosting platform (such as Render). 

**Note**: In order for the forms, authentication, and database connections to work correctly in production, you must set all required environment variables within the hosting provider's dashboard (matching the variables located in `.env.example`).

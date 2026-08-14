# Nazmul Real Estate Team 🏡

Welcome to the official repository for the **Nazmul Real Estate Team** website. This is an ultra-premium, full-stack MERN application designed to provide a seamless digital experience for luxury real estate clients.

## 🎯 Platform Highlights
The platform is engineered to function as both a lead-generation powerhouse and a fully manageable content platform:
- **Interactive Map Search**: Built-in interactive map powered by `react-leaflet` to visualize property locations in real-time.
- **Dynamic CMS Page Builder**: The Admin Panel includes a robust "Page Builder" that allows administrators to dynamically update Hero Banners, Global Contact Information, Navigations, and entire text sections on the public website without writing any code.
- **Security Chamber Login**: A multi-layered authentication system where admins must first bypass a "Security Chamber" (passphrase challenge) before entering standard credentials.
- **Property Listings**: Browse a curated, dynamic list of active and sold properties.
- **Home Valuation Engine**: Users can submit property details for market valuation.
- **Interactive Blog & Team Roster**: Manage educational content and dynamically update the team roster directly from the database.
- **Smart Floating Dialer**: An integrated call-to-action that pulls the company phone number globally and dynamically hides if no number is configured.

## 🛠️ Tech Stack & Technologies Used

### Frontend (Client-Side)
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS (Fully responsive, mobile-first design)
- **Animations**: Framer Motion (Cinematic scroll reveals, staggered lists, and micro-interactions)
- **Interactive Maps**: React-Leaflet
- **UX & Alerts**: SweetAlert2 & React Hot Toast (replaces all native browser alerts with professional UI)
- **Icons**: Lucide React
- **Routing**: React Router DOM

### Backend (Server-Side)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt.js
- **CORS & Security**: Helmet, express-rate-limit

### Integrations
- **Image Hosting**: ImgBB API
- **Forms**: EmailJS (Real-time contact inquiries)

## 🔑 Default Admin Access
To access the Admin Panel locally, navigate to `/admin/login`:
- **Security Passphrase**: `Nazmul is here`
- **Admin Email**: `admin@nazmulrealestate.com`
- **Admin Password**: `password123`

## 🚀 Local Development Setup

1. **Install Dependencies**
   Navigate to both the `backend` and `frontend` directories and run:
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the `backend` and provide your keys:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   Create a `.env` in the `frontend`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_IMGBB_API_KEY=your_imgbb_key
   ```

3. **Run the Application**
   In the root directory, run:
   ```bash
   npm run dev
   ```
   *This uses concurrently to start both the Node server and the Vite frontend simultaneously.*

## 📈 Deployment
The frontend is optimized for **Vercel** or **Render**, and the backend is ready for Node.js hosting platforms. Ensure all `.env` variables are securely added to your hosting provider's dashboard.

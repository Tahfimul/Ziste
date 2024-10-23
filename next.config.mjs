/** @type {import('next').NextConfig} */
import dotenv from 'dotenv'
dotenv.config()

const nextConfig = {
    env: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET, 
      FIREBASE_API_KEY:process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN:process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DB_URL:process.env.FIREBASE_DB_URL,
      FIREBASE_PROJECT_ID:process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET:process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID:process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID:process.env.FIREBASE_APP_ID   
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.com', // Replace with the hostname of the image source
          },
        ],
      },
      
};

export default nextConfig;

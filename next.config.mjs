/** @type {import('next').NextConfig} */
import dotenv from 'dotenv'
dotenv.config()

const nextConfig = {
    env: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,    
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

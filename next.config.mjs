/** @type {import('next').NextConfig} */
const nextConfig = {
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

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: '*.googleusercontent.com'
        },
        {
          hostname: 'portafolio001.s3.amazonaws.com'
        },
        {
          hostname: 'portafolio001.s3.ap-southeast-2.amazonaws.com'
        }
      ]
    }
  };
  
  export default nextConfig;
  
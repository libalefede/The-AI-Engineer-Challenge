/** @type {import('next').NextConfig} */
const nextConfig = {
  // In local development we proxy /api/* to the FastAPI server running on
  // port 8000 so the browser can use same-origin relative URLs. In production
  // on Vercel, vercel.json routes /api/* to the Python serverless function, so
  // no rewrite is needed here.
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",
          destination: "http://127.0.0.1:8000/api/:path*",
        },
      ];
    }
    return [];
  },
};

export default nextConfig;

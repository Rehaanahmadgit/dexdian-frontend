import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // WORKAROUND: If tsconfig exclude isn't enough to stop Next.js from
  // type-checking my-video/, uncomment the line below. This is a
  // last-resort fallback — the real fix is the tsconfig exclude above.
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;

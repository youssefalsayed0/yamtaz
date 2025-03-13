import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["api.ymtaz.sa" , "daisyui.com"], // Allow this domain
      },
};

export default withNextIntl(nextConfig);

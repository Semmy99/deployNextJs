const path = require("path");
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  productionBrowserSourceMaps: true,
  i18n,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        // port: "",
        pathname: "/maps/api/place/js/**",
      },
    ],
  },
};

module.exports = nextConfig;
// https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAfLeUgM7usz-3aax_E5V60gygbSeTqmt6ih1woy0z4HNVTpu2ZzYvjLcRbrR44UAAViXygJJR6C22b-tRFTDAYdhC-Ms2MDrvCslcjPxKoPp2ci6hCH4mgrL8xv1-uTOo59v9xyldz7p_Lp_m5CC-jd-DnKBWW8WimhaTdvc4aWys75TDyj1&3u3120&5m1&2e1&callback=none&key=AIzaSyC5NIQhbbLpyndiCw4BIeknK7rATZmX3Hk&token=75404

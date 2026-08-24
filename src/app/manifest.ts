import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TirSkix Academy — программирование для детей",
    short_name: "TirSkix",
    description: "Онлайн-школа программирования для детей 10–18 лет",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7F23CC",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["education"],
    lang: "ru",
  };
}

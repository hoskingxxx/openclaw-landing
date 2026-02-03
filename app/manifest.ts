export default function manifest() {
  return {
    name: "OpenClaw - DeepSeek R1 Survival Guide",
    short_name: "OpenClaw",
    description: "Battle-tested guide for running DeepSeek R1 locally with OpenClaw",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a1a",
    theme_color: "#FF4500",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

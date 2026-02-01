import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          backgroundImage: "linear-gradient(135deg, rgba(255, 69, 0, 0.1) 0%, transparent 50%)",
          fontSize: 48,
          fontWeight: 700,
          color: "#ffffff",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255, 69, 0, 0.1)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(255, 69, 0, 0.05)",
            filter: "blur(80px)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            height: "100px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #FF4500 0%, #FF5722 100%)",
            marginBottom: "32px",
            boxShadow: "0 8px 32px rgba(255, 69, 0, 0.3)",
          }}
        >
          <span style={{ fontSize: "56px" }}>🦞</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            background: "linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "16px",
            textAlign: "center",
            padding: "0 40px",
          }}
        >
          OpenClaw
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "24px",
          }}
        >
          Not Just Another Chatbot, Your AI Employee
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              padding: "12px 24px",
              background: "rgba(255, 69, 0, 0.2)",
              border: "1px solid rgba(255, 69, 0, 0.3)",
              borderRadius: "12px",
              fontSize: "20px",
              color: "#FF4500",
            }}
          >
            Local Deployment
          </div>
          <div
            style={{
              padding: "12px 24px",
              background: "rgba(255, 69, 0, 0.2)",
              border: "1px solid rgba(255, 69, 0, 0.3)",
              borderRadius: "12px",
              fontSize: "20px",
              color: "#FF4500",
            }}
          >
            Multi-Platform
          </div>
          <div
            style={{
              padding: "12px 24px",
              background: "rgba(255, 69, 0, 0.2)",
              border: "1px solid rgba(255, 69, 0, 0.3)",
              borderRadius: "12px",
              fontSize: "20px",
              color: "#FF4500",
            }}
          >
            Open Source
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "20px",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          openclaw-ai.org
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

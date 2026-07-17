import { ImageResponse } from "next/og";

export const alt = "TirSkix Academy — онлайн-школа программирования для детей";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0c29 0%, #1a1245 50%, #24243e 100%)",
          fontFamily: "sans-serif",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #6c47ff, #a78bfa)",
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #6c47ff, #a78bfa)",
              fontSize: "28px",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            T
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            TirSkix Academy
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            fontSize: "52px",
            fontWeight: "800",
            color: "#fff",
            maxWidth: "900px",
            marginBottom: "28px",
          }}
        >
          <span style={{ display: "flex" }}>Онлайн-школа</span>
          <span style={{ display: "flex", color: "#a78bfa" }}>программирования</span>
          <span style={{ display: "flex" }}>для детей</span>
        </div>

        {/* Subline */}
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: "rgba(255,255,255,0.65)",
            maxWidth: "720px",
            marginBottom: "40px",
          }}
        >
          Три трека · 10–18 лет · БВИ, ОГЭ 19/21, полуфинал ICPC
        </div>

        {/* CTA pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(108,71,255,0.25)",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "rgba(108,71,255,0.5)",
            borderRadius: "50px",
            padding: "14px 32px",
            color: "#c4b5fd",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Пробный урок бесплатно →
        </div>

        {/* Domain watermark */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "28px",
            right: "48px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          tirskix-academy.com
        </div>
      </div>
    ),
    { ...size }
  );
}

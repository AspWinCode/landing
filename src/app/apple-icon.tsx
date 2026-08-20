import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#7F23CC",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 100,
            fontWeight: 900,
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          T
        </span>
      </div>
    ),
    { ...size }
  );
}

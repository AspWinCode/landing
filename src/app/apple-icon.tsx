import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const MARK_BARS = [
  { left: 38.26, top: 37.8, width: 84.99, height: 18.48, radius: 9.24 },
  { left: 62.28, top: 66.44, width: 62.83, height: 18.48, radius: 9.24 },
  { left: 86.3, top: 95.08, width: 55.43, height: 18.48, radius: 9.24 },
  { left: 62.28, top: 123.72, width: 40.65, height: 18.48, radius: 9.24 },
  { left: 115.87, top: 118.19, width: 12.01, height: 29.57, radius: 6.01 },
];

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: 180,
          height: 180,
          background: "#7F23CC",
          borderRadius: 40,
          display: "flex",
        }}
      >
        {MARK_BARS.map((bar, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: bar.left,
              top: bar.top,
              width: bar.width,
              height: bar.height,
              borderRadius: bar.radius,
              background: "#FFFFFF",
              display: "flex",
            }}
          />
        ))}
      </div>
    ),
    { ...size }
  );
}

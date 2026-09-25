import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// TODO: once a real hero photograph is supplied, swap the flat gradient
// below for that image (via `background: `url(...)`  is not supported in
// next/og — fetch the image and pass it as an <img> src instead).
export default function OpengraphImage() {
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
          background: "linear-gradient(135deg, #11110F 0%, #191917 55%, #3a3129 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontFamily: "Georgia, serif" }}>
          <span style={{ fontSize: 64, color: "#FAF8F4" }}>moments</span>
          <span style={{ fontSize: 64, color: "#FAF8F4", fontStyle: "italic" }}>by</span>
          <span style={{ fontSize: 72, color: "#A99D8D", fontStyle: "italic", marginLeft: 8 }}>
            mikkie
          </span>
        </div>
        <span
          style={{
            marginTop: 18,
            fontSize: 18,
            letterSpacing: 8,
            color: "#FAF8F4",
            opacity: 0.75,
            fontFamily: "Arial, sans-serif",
          }}
        >
          PHOTO &amp; FILM
        </span>
        <span
          style={{
            marginTop: 44,
            fontSize: 22,
            letterSpacing: 3,
            color: "#FAF8F4",
            opacity: 0.55,
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
          }}
        >
          REAL MOMENTS. BEAUTIFULLY REMEMBERED.
        </span>
      </div>
    ),
    { ...size },
  );
}

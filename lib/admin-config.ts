// Hardcoded /admin credentials — no Vercel dashboard env var setup required.
//
// SECURITY: anyone with read access to this repository can read this
// password. Only acceptable because this repo is private. If it's ever
// made public, or you want a rotatable secret without a redeploy, set
// ADMIN_PASSWORD / ADMIN_SESSION_SECRET as env vars instead — those still
// take priority over the values below.
//
// To change the password: edit ADMIN_PASSWORD below and redeploy.
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Mikkie-Studio-2026!";

export const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "vpINNF0VXx7cX2Yy1cznmaILhNOmbI4GRCn/DhKdQ0E=";

export type Stat = {
  value: string;
  label: string;
};

// Intentionally empty: do not invent years of experience, client counts, or
// project counts. Populate only once Mikkie provides verified numbers —
// AboutMikkie hides this column entirely while it's empty.
// TODO: Replace with Mikkie's verified business statistics, if/when she wants them shown.
export const stats: Stat[] = [];

// TODO: Replace with Mikkie's approved bio copy.
export const aboutCopy =
  "I'm a photographer and videographer drawn to real moments — the laughter, quiet looks, movement and details that make every story personal.";

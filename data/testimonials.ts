export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  project?: string;
  /** When true, the UI visibly marks this as sample content, never a verified review. */
  placeholder: boolean;
};

// PLACEHOLDER — REPLACE BEFORE PRODUCTION.
// TODO: Replace every entry with Mikkie's verified client testimonials.
// Do not remove `placeholder: true` until the quote is a real, verified review.
export const testimonials: Testimonial[] = [
  {
    id: "sample-01",
    quote:
      "Every photo felt like it already knew our story — quiet, honest, and exactly how the day actually felt.",
    name: "Sample Testimonial",
    project: "Wedding",
    placeholder: true,
  },
  {
    id: "sample-02",
    quote:
      "We didn't feel like we were being photographed. It just felt like someone was there, paying attention.",
    name: "Sample Testimonial",
    project: "Portrait Session",
    placeholder: true,
  },
  {
    id: "sample-03",
    quote:
      "The film alone made us cry. It captured details we didn't even remember happening.",
    name: "Sample Testimonial",
    project: "Wedding Film",
    placeholder: true,
  },
];

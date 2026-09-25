import type { LucideIcon } from "lucide-react";
import { Camera, Clapperboard, Gem, Sparkles } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

// Temporary until Mikkie confirms her final service list.
// TODO: Confirm final service names/descriptions with Mikkie.
export const services: Service[] = [
  {
    id: "photography",
    title: "Photography",
    description: "Authentic, timeless imagery for meaningful moments.",
    icon: Camera,
  },
  {
    id: "videography",
    title: "Videography",
    description: "Cinematic films that capture the feeling, not just the moment.",
    icon: Clapperboard,
  },
  {
    id: "brand-content",
    title: "Brand Content",
    description: "Visual storytelling created for people and businesses.",
    icon: Sparkles,
  },
  {
    id: "event-coverage",
    title: "Event Coverage",
    description: "Thoughtful coverage of celebrations and special events.",
    icon: Gem,
  },
];

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered only on the client side once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Enable smooth lag smoothing for uniform scrub rendering
  gsap.ticker.lagSmoothing(1000, 16);
}

export { gsap, ScrollTrigger };
export default gsap;

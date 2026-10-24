import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      {/* Pinned Hero Section */}
      <Hero />

      {/* Short plain section to release pin */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-neutral-900">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Experience Velocity
        </h2>
        <p className="text-neutral-400 max-w-xl text-base sm:text-lg">
          The scroll pin releases smoothly into this section. Scroll back up to reverse the car motion.
        </p>
      </section>
    </main>
  );
}

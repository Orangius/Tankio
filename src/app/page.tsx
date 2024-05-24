import Image from "next/image";

import Hero from "@/components/homepage/Hero";
import Features from "@/components/homepage/Features";
import Testimonial from "@/components/homepage/Testimonial";
import Footer from "@/components/homepage/Footer";
export default function Home() {
  return (
    <>
      {/* main section of the homepage */}
      <Hero />
      {/* features section */}
      <Features />
      {/* testimonials section */}
      {/* <Testimonial /> */}
      {/* footer section */}
      <Footer />
    </>
  );
}

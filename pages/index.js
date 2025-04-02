import { useRef, useState } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import PodcastCard from "../components/PodcastCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import data from "../data/portfolio.json";

export default function Home() {
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const [activeCategory, setActiveCategory] = useState("All");

  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  // Get unique categories from projects
  const categories = ["All", ...new Set(data.projects.map(p => p.category || "Project"))];

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      {/* Main container with proper mobile padding */}
      <div className="container mx-auto mb-10 px-2 sm:px-4">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        
        {/* Hero Section - Improved mobile layout */}
        <div className="laptop:mt-20 mt-10 flex flex-col laptop:flex-row items-start justify-between">
          <div className="mt-5 flex-1 w-full">
            <h1 
              ref={textOne} 
              className="text-4xl tablet:text-6xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 font-bold w-full"
            >
              {data.headerTaglineOne}
            </h1>
            <h1 
              ref={textTwo} 
              className="text-4xl tablet:text-6xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 font-bold w-full"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1 
              ref={textThree} 
              className="text-4xl tablet:text-6xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 font-bold w-full"
            >
              {data.headerTaglineThree}
            </h1>
            <h1 
              ref={textFour} 
              className="text-4xl tablet:text-6xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 font-bold w-full"
            >
              {data.headerTaglineFour}
            </h1>
          </div>
          
          {/* Profile image - centered on mobile */}
          <div className="w-40 h-40 mx-auto laptop:mx-0 laptop:w-80 laptop:h-80 rounded-full overflow-hidden border-2 border-gray-700 mt-6 laptop:mt-0 laptop:ml-10 flex-shrink-0">
            <img 
              src="/images/josh2.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <Socials className="mt-6 laptop:mt-5 flex justify-center laptop:justify-start" />
        
        {/* Work Section - Improved mobile layout */}
        <div className="mt-10 laptop:mt-30 p-0" ref={workRef}>
          <div className="flex flex-col laptop:flex-row justify-between items-center">
            <h1 className="text-3xl laptop:text-2xl font-bold mb-4 laptop:mb-0">Work.</h1>
            {categories.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2 w-full laptop:w-auto">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      activeCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4">
            {data.projects
              .filter(p => activeCategory === "All" || p.category === activeCategory)
              .map((project) => (
                <WorkCard
                  key={project.id}
                  img={project.imageSrc}
                  name={project.title}
                  description={project.description}
                  tags={project.tags}
                  onClick={() => window.open(project.url)}
                />
              ))}
          </div>
        </div>
        
        {/* Podcast Section - Centered on mobile */}
        {data.showPodcast && data.podcast?.episodes?.length > 0 && (
          <div className="mt-20 p-0">
            <h1 className="text-3xl laptop:text-2xl font-bold text-center laptop:text-left">
              {data.podcast.title || "Podcast"}
            </h1>
            <div className="mt-5 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
              {data.podcast.episodes.map(episode => (
                <PodcastCard key={episode.id} {...episode} />
              ))}
            </div>
          </div>
        )}

        {/* Services Section - Improved mobile layout */}
        <div className="mt-10 laptop:mt-30 p-0">
          <h1 className="text-3xl laptop:text-2xl font-bold text-center laptop:text-left mb-6">
            What I Do?
          </h1>
          <div className="grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service) => (
              <ServiceCard
                key={service.id}
                name={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>

        {/* About Section - Improved mobile layout */}
        <div className="mt-10 laptop:mt-40 p-0" ref={aboutRef}>
          <h1 className="text-3xl laptop:text-2xl font-bold text-center laptop:text-left mb-6">
            About.
          </h1>
          <p className="text-xl laptop:text-2xl w-full text-center laptop:text-left">
            {data.aboutpara}
          </p>
        </div>

        <Footer />
      </div>
    </div>
  );
}
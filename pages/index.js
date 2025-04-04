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

      {/* Gradient background for the podcast section */}
      <style jsx global>{`
      .podcast-gradient {
        background: linear-gradient(135deg, 
          rgba(99, 102, 241, 0.1) 0%, 
          rgba(168, 85, 247, 0.1) 50%, 
          rgba(236, 72, 153, 0.1) 100%);
        border-radius: 20px;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .services-gradient {
        background: linear-gradient(135deg, 
          rgba(0, 255, 255, 0.05) 0%, 
          rgba(0, 255, 191, 0.1) 50%, 
          rgba(191, 0, 255, 0.1) 100%);
        border-radius: 20px;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 2rem;
      }
      .bouncing-arrow {
        animation: bounceX 1.5s infinite;
      }
      @keyframes bounceX {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(10px); }
      }
    `}</style>

      {/* Main container */}
      <div className="container mx-auto mb-10 px-2 sm:px-4">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        
        {/* Hero Section */}
        <div className="laptop:mt-20 mt-10 flex flex-col laptop:flex-row items-start justify-between">
          <div className="mt-5 flex-1 w-full">
            <h1 ref={textOne} className="text-4xl tablet:text-6xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 font-bold w-full">
              {data.headerTaglineOne}
            </h1>
            <h1 ref={textTwo} className="text-4xl tablet:text-6xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 font-bold w-full">
              {data.headerTaglineTwo}
            </h1>
            <h1 ref={textThree} className="text-4xl tablet:text-6xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 font-bold w-full">
              {data.headerTaglineThree}
            </h1>
            <h1 ref={textFour} className="text-4xl tablet:text-6xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 font-bold w-full">
              {data.headerTaglineFour}
            </h1>
          </div>
          
          <div className="w-40 h-40 mx-auto laptop:mx-0 laptop:w-80 laptop:h-80 rounded-full overflow-hidden border-2 border-gray-700 mt-6 laptop:mt-0 laptop:ml-10 flex-shrink-0">
            <img 
              src="/images/josh2.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <Socials className="mt-6 laptop:mt-5 flex justify-center laptop:justify-start" />
        
        {/* Work Section */}
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
        
        {/* Services Section */}
        <div className="mt-10 laptop:mt-30 services-gradient">
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

        {/* Podcast Section - New Design */}
        {data.showPodcast && data.podcast?.episodes?.length > 0 && (
        <div className="mt-20 p-6 podcast-gradient">
          <div className="flex flex-col laptop:flex-row items-center gap-8">
            {/* Podcast card on the left - showing only the first episode */}
            <div className="w-full laptop:w-1/3">
              {data.podcast.episodes.slice(0, 1).map(episode => (
                <PodcastCard key={episode.id} {...episode} />
              ))}
            </div>
            
            {/* Text content on the right */}
            <div className="w-full laptop:w-2/3 flex flex-col items-center laptop:items-start text-center laptop:text-left">
              <h2 className="text-3xl laptop:text-5xl font-bold mb-4">
                I started a Podcast in school too.
              </h2>
              
              <p className="text-lg laptop:text-xl text-gray-300 mb-6">
                Listen on your favorite platform
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">

                {/* Arrow */}
              <svg 
                  className="bouncing-arrow text-blue-400 w-8 h-8 hidden sm:block"
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>

                {/* Spotify Link */}
                <a 
                  href={data.podcast.spotifyUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 w-full sm:w-auto"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Spotify
                </a>
                
                {/* Apple Podcast Link */}
                <a 
                  href={data.podcast.appleUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors duration-200 w-full sm:w-auto"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                  </svg>
                  Apple Podcasts
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* About Section */}
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
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import data from '../data/portfolio.json';

export default function Animations() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  return (
    <div>
      <Head>
        <title>Animation Portfolio | {data.name}</title>
      </Head>
      
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Motion & Animation Work</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.animations.map(animation => (
            <div 
              key={animation.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <video
                  ref={videoRef}
                  src={animation.videos[0].url}
                  poster={animation.videos[0].thumbnail}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVideo(animation);
                  }}
                  controls={false}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => setSelectedVideo(animation)}
                    className="bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition"
                  >
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.8L16 10 6.3 17.2V2.8z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{animation.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{animation.description}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 text-white text-2xl"
              >
                &times;
              </button>
              <video
                controls
                autoPlay
                className="w-full"
                src={selectedVideo.videos[0].url}
              />
              <div className="mt-4 text-white">
                <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
                <p>{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
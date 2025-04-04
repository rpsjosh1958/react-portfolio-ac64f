import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import data from '../data/portfolio.json';

export default function Designs() {
  const router = useRouter();
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTileModal, setShowTileModal] = useState(false);
  const logoScrollRef = useRef(null);
  const flyerScrollRef = useRef(null);
  const generalScrollRef = useRef(null);

  const handleDesignClick = (design) => {
    setSelectedDesign(design);
    setShowTileModal(true);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setShowTileModal(false);
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === selectedDesign.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? selectedDesign.images.length - 1 ? prev - 1 : 0 : prev - 1
    );
  };

  // Separate designs by type
  const logoDesigns = data.designs.filter(design => design.type === 'logo');
  const flyerDesigns = data.designs.filter(design => design.type === 'flyer');
  const generalDesigns = data.designs.filter(design => design.type === 'general');

  return (
    <div className="container mx-auto mb-10 px-2 sm:px-4">
      <Head>
        <title>Graphic Design Portfolio | {data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>
      
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Graphic Design Work</h1>
        
        {/* Main Gallery Sections - Now responsive */}
        <div className="flex flex-row xl:flex-row lg:flex-row gap-8 mb-16">
          {/* Logo Designs Section */}
          <section className="w-full lg:w-1/3">
            <h2 className="text-2xl font-bold mb-6">Logo Designs</h2>
            <div className="relative">
              {logoDesigns.length > 0 && (
                <div 
                  ref={logoScrollRef}
                  className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto space-x-4 lg:space-x-0 lg:space-y-4 py-4 scrollbar-hide h-[600px] lg:h-auto"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {logoDesigns.map(design => (
                    <div 
                      key={design.id}
                      onClick={() => handleDesignClick(design)}
                      className="flex-shrink-0 w-80 lg:w-full h-[500px] bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer" 
                    >
                      <div className="w-full h-[400px] overflow-hidden">
                        <img 
                          src={design.images[0]} 
                          alt={design.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold">{design.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{design.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Flyer Designs Section */}
          <section className="w-full lg:w-1/3">
            <h2 className="text-2xl font-bold mb-6">Flyers & ADs Designs</h2>
            <div className="relative">
              {flyerDesigns.length > 0 && (
                <div 
                  ref={flyerScrollRef}
                  className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto space-x-4 lg:space-x-0 lg:space-y-4 py-4 scrollbar-hide h-[600px] lg:h-auto"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {flyerDesigns.map(design => (
                    <div 
                      key={design.id}
                      onClick={() => handleDesignClick(design)}
                      className="flex-shrink-0 w-80 lg:w-full h-[500px] bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer" 
                    >
                      <div className="w-full h-[400px] overflow-hidden">
                        <img 
                          src={design.images[0]} 
                          alt={design.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold">{design.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{design.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* General Designs Section */}
          <section className="w-full lg:w-1/3">
            <h2 className="text-2xl font-bold mb-6">General Designs</h2>
            <div className="relative">
              {generalDesigns.length > 0 && (
                <div 
                  ref={generalScrollRef}
                  className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto space-x-4 lg:space-x-0 lg:space-y-4 py-4 scrollbar-hide h-[600px] lg:h-auto"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {generalDesigns.map(design => (
                    <div 
                      key={design.id}
                      onClick={() => handleDesignClick(design)}
                      className="flex-shrink-0 w-80 lg:w-full h-[500px] bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer" 
                    >
                      <div className="w-full h-[400px] overflow-hidden">
                        <img 
                          src={design.images[0]} 
                          alt={design.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold">{design.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{design.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Tile Modal - Fixed height with scroll */}
        {selectedDesign && showTileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-7xl relative mx-auto flex flex-col" style={{ maxHeight: '90vh' }}>
              <div className="p-6 sticky top-0 bg-white dark:bg-gray-800 z-10 border-b border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => setShowTileModal(false)}
                  className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
                >
                  ✕
                </button>
                
                <h2 className="text-3xl font-bold mb-2 dark:text-white pr-10">{selectedDesign.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{selectedDesign.description}</p>
              </div>
              
              <div className="overflow-y-auto p-6">
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedDesign.images.map((img, index) => (
                    <div 
                      key={index} 
                      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${selectedDesign.title} ${index+1}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-white font-bold text-lg transition-opacity">
                          View
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Image Modal */}
        {selectedDesign && !showTileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full relative">
              <button 
                onClick={() => setShowTileModal(true)}
                className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ← Back to Gallery
              </button>
              <button 
                onClick={() => setSelectedDesign(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 dark:text-white">
                  {selectedDesign.title} ({currentImageIndex + 1}/{selectedDesign.images.length})
                </h2>
                
                <div className="relative">
                  <button 
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
                  >
                    &larr;
                  </button>
                  
                  <img 
                    src={selectedDesign.images[currentImageIndex]} 
                    alt={`${selectedDesign.title} ${currentImageIndex+1}`}
                    className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                  />
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
                  >
                    &rarr;
                  </button>
                </div>
                
                <div className="flex justify-center mt-4 space-x-2">
                  {selectedDesign.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
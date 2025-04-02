import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import data from '../data/portfolio.json';

export default function Designs() {
  const router = useRouter();
  const [selectedDesign, setSelectedDesign] = useState(null);

  return (
    <div>
      <Head>
        <title>Graphic Design Portfolio | {data.name}</title>
      </Head>
      
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Graphic Design Work</h1>
        
        {selectedDesign ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <button 
              onClick={() => setSelectedDesign(null)}
              className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
            >
              ← Back to Gallery
            </button>
            
            <h2 className="text-2xl font-bold mb-4">{selectedDesign.title}</h2>
            <p className="mb-6">{selectedDesign.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDesign.images.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src={img} 
                    alt={`${selectedDesign.title} ${i+1}`}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.designs.map(design => (
              <div 
                key={design.id}
                onClick={() => setSelectedDesign(design)}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              >
                <img 
                  src={design.images[0]} 
                  alt={design.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{design.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{design.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
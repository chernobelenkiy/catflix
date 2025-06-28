import UploadForm from '@/components/UploadForm';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-netflix-black pt-24 pb-16">
      <div className="netflix-container">
        {/* Header section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="text-6xl animate-bounce">🎬</div>
            <h1 className="text-5xl md:text-7xl font-bold text-netflix-white">
              Upload Video
            </h1>
            <div className="text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>🐱</div>
          </div>
          <p className="text-xl md:text-2xl text-netflix-light-gray max-w-3xl mx-auto leading-relaxed">
            Share amazing content that will keep cats entertained and engaged. 
            Upload high-quality videos and help build the ultimate feline entertainment library!
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Upload form */}
          <div className="lg:col-span-3">
            <div className="bg-netflix-dark-gray rounded-2xl p-8 shadow-2xl border border-netflix-medium-gray">
              <UploadForm />
            </div>
          </div>

          {/* Tips sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload tips */}
            <div className="bg-gradient-to-br from-netflix-red to-netflix-dark-red rounded-2xl p-8 text-netflix-white shadow-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-3xl mr-3">💡</span>
                Upload Tips
              </h2>
              <ul className="space-y-4 text-sm leading-relaxed">
                <li className="flex items-start">
                  <span className="text-lg mr-3">🎯</span>
                  <span>Keep videos under 50MB for faster uploads and better performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lg mr-3">⏱️</span>
                  <span>Ideal video length is 1-5 minutes to maintain cat attention</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lg mr-3">📱</span>
                  <span>MP4 format provides the best compatibility across devices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lg mr-3">🔍</span>
                  <span>Use descriptive titles and detailed descriptions</span>
                </li>
              </ul>
            </div>

            {/* Content suggestions */}
            <div className="bg-netflix-medium-gray rounded-2xl p-8 shadow-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-6 text-netflix-white flex items-center">
                <span className="text-3xl mr-3">🎨</span>
                Content Ideas
              </h2>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-netflix-dark-gray rounded-xl border border-gray-700">
                  <span className="text-2xl mr-4">🐦</span>
                  <div>
                    <h3 className="text-netflix-white font-semibold">Birds</h3>
                    <p className="text-netflix-light-gray text-sm">Flying birds, bird sounds, colorful parrots</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-netflix-dark-gray rounded-xl border border-gray-700">
                  <span className="text-2xl mr-4">🐟</span>
                  <div>
                    <h3 className="text-netflix-white font-semibold">Fish</h3>
                    <p className="text-netflix-light-gray text-sm">Swimming fish, aquarium scenes, tropical fish</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-netflix-dark-gray rounded-xl border border-gray-700">
                  <span className="text-2xl mr-4">🔴</span>
                  <div>
                    <h3 className="text-netflix-white font-semibold">Laser Pointers</h3>
                    <p className="text-netflix-light-gray text-sm">Moving red dots, laser patterns, chase scenes</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-netflix-dark-gray rounded-xl border border-gray-700">
                  <span className="text-2xl mr-4">🪶</span>
                  <div>
                    <h3 className="text-netflix-white font-semibold">Interactive Toys</h3>
                    <p className="text-netflix-light-gray text-sm">Feather wands, moving toys, catnip play</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="text-center p-8 bg-gradient-to-r from-gray-800 to-netflix-dark-gray rounded-2xl border border-gray-700">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-netflix-white mb-3">Join the Community</h3>
                             <p className="text-netflix-light-gray text-sm leading-relaxed">
                 Help create the world&apos;s largest collection of cat entertainment content. 
                 Every video you upload makes a difference!
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
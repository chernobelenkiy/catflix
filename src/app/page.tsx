import VideoGrid from '@/components/VideoGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-hero-gradient"></div>
        
        {/* Content */}
        <div className="relative z-10 netflix-container text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Main title */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-netflix-white mb-6 tracking-tight">
              Welcome to{' '}
              <span className="text-netflix-red block mt-2">
                Catflix
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-3xl text-netflix-light-gray mb-8 font-light">
              The ultimate entertainment platform for your feline friends
            </p>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-netflix-light-gray mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover and upload the best cat entertainment videos — from mesmerizing birds 
              and swimming fish to exciting laser pointer chases and feather toy adventures!
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/upload"
                className="btn-netflix text-xl px-12 py-4 shadow-2xl"
              >
                Upload Video
              </a>
              <a
                href="#videos"
                className="btn-secondary text-xl px-12 py-4"
              >
                Browse Videos
              </a>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 text-6xl animate-bounce opacity-80">🐱</div>
          <div className="absolute top-32 right-20 text-5xl animate-pulse opacity-60">🐦</div>
          <div className="absolute bottom-32 left-20 text-5xl animate-bounce opacity-70" style={{ animationDelay: '1s' }}>🐟</div>
          <div className="absolute bottom-20 right-10 text-4xl animate-pulse opacity-80" style={{ animationDelay: '0.5s' }}>🔴</div>
          <div className="absolute top-1/2 left-5 text-3xl animate-pulse opacity-50" style={{ animationDelay: '2s' }}>🪶</div>
          <div className="absolute top-1/3 right-5 text-3xl animate-bounce opacity-60" style={{ animationDelay: '1.5s' }}>🐭</div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-netflix-light-gray rounded-full flex justify-center">
            <div className="w-1 h-3 bg-netflix-light-gray rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="relative pt-20 pb-16">
        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-20 gradient-overlay-top"></div>
        
        <VideoGrid />
        
        {/* Bottom spacing */}
        <div className="h-20"></div>
      </section>
    </div>
  );
}

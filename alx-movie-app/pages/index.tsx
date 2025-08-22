import Button from "@/components/commons/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-[#171D22] text-white">
      {/* Hero Section with Enhanced Animations */}
      <section
        className="h-screen bg-cover bg-center hero-background relative overflow-hidden"
        style={{
          backgroundImage:
            'url("https://themebeyond.com/html/movflx/img/bg/breadcrumb_bg.jpg")',
        }}
      >
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 hero-overlay animate-fade-in"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-[#E2D609] rounded-full animate-float opacity-30"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white rounded-full animate-float opacity-20" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-[#E2D609] rounded-full animate-float opacity-40" style={{animationDelay: '4s'}}></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <div className={`${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="inline-block animate-slide-in-left">
                Discover Your Next Favorite{" "}
              </span>
              <br className="md:hidden" />
              <span className="text-[#E2D609] inline-block animate-pulse-slow">
                Movie
              </span>
            </h1>
          </div>
          
          <div className={`${mounted ? 'animate-fade-in-delay' : 'opacity-0'}`}>
            <p className="text-lg md:text-2xl mb-12 max-w-3xl leading-relaxed px-4">
              Explore the latest blockbuster movies, critically acclaimed films,
              and your personal favorites – all in one place. Experience cinema like never before.
            </p>
          </div>
          
          <div className={`${mounted ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'} transition-all duration-1000 delay-700`}>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="btn-enhanced">
                <Button
                  title="Browse Movies"
                  action={() => router.push("/movies", undefined, { shallow: false })}
                />
              </div>
              <button 
                onClick={() => {
                  const nextSection = document.getElementById('features-section');
                  nextSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 border-2 border-[#E2D609] text-[#E2D609] rounded-full hover:bg-[#E2D609] hover:text-black transition-all duration-300 font-semibold"
              >
                Learn More
              </button>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 ${mounted ? 'animate-bounce-slow' : 'opacity-0'}`}>
            <div className="w-6 h-10 border-2 border-[#E2D609] rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#E2D609] rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-20 px-4 md:px-10 lg:px-44 bg-gradient-to-b from-[#171D22] to-[#121018]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Why Choose <span className="text-[#E2D609]">CineSeek</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-delay">
              Discover what makes our platform the ultimate destination for movie enthusiasts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🎬",
                title: "Vast Collection",
                description: "Access thousands of movies from every genre and era",
                delay: "0s"
              },
              {
                icon: "⭐",
                title: "Premium Quality",
                description: "High-definition streaming with crystal clear audio",
                delay: "0.2s"
              },
              {
                icon: "📱",
                title: "Any Device",
                description: "Watch on your phone, tablet, laptop, or smart TV",
                delay: "0.4s"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="interactive-card bg-[#1E1E2E] p-8 rounded-xl text-center animate-scale-in"
                style={{animationDelay: feature.delay}}
              >
                <div className="text-6xl mb-4 animate-float" style={{animationDelay: `${index * 2}s`}}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#E2D609]">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 md:px-44 bg-[#121018] text-center relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-[#E2D609] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-white rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-semibold mb-8 animate-fade-in">
            Join <span className="text-[#E2D609]">CineSeek</span> Now!
          </h2>
          <p className="text-lg md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay">
            Sign up today to get access to the latest movies, exclusive content,
            personalized movie recommendations, and join our community of movie lovers.
          </p>
          <div className="animate-slide-in-up btn-enhanced inline-block">
            <Button title="Get Started Today" />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            {[
              { number: "10K+", label: "Movies Available" },
              { number: "1M+", label: "Happy Users" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="animate-scale-in" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="text-3xl md:text-4xl font-bold text-[#E2D609] mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
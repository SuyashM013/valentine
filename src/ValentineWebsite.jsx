import React, { useState, useEffect } from 'react';

export default function ValentineWebsite() {
  const [currentPage, setCurrentPage] = useState('question');
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [videoUrl, setVideoUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [cuteTexts, setCuteTexts] = useState([]);

  const cuteMessages = [
    "You're my everything! 💕",
    "I love your smile! 😊",
    "You make me so happy! ✨",
    "Forever and always! 💖",
    "You're so beautiful! 🌹",
    "My favorite person! 💝",
    "You're amazing! ⭐",
    "I'm so lucky! 🍀",
    "You're perfect! 💗",
    "My heart is yours! 💓",
    "You complete me! 🌟",
    "Best girlfriend ever! 👑",
    "You're my sunshine! ☀️",
    "I adore you! 💘",
    "You're incredible! 🎀"
  ];

  // Floating hearts animation
  useEffect(() => {
    const hearts = [];
    for (let i = 0; i < 15; i++) {
      hearts.push({
        id: i,
        emoji: ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)],
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 4
      });
    }
  }, []);

  // Cute text animations on carousel page
  useEffect(() => {
    let interval;
    if (currentPage === 'carousel') {
      const addCuteText = () => {
        const newText = {
          id: Date.now(),
          message: cuteMessages[Math.floor(Math.random() * cuteMessages.length)],
          left: Math.random() * 80 + 10,
          top: Math.random() * 80 + 10
        };
        setCuteTexts(prev => [...prev, newText]);
        
        setTimeout(() => {
          setCuteTexts(prev => prev.filter(text => text.id !== newText.id));
        }, 4000);
      };

      addCuteText(); // First one immediately
      interval = setInterval(addCuteText, 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
      setCuteTexts([]);
    };
  }, [currentPage]);

  const handleNoHover = () => {
    const maxX = window.innerWidth - 200; // Button width consideration
    const maxY = window.innerHeight - 100; // Button height consideration
    setNoBtnPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY
    });
  };

  const handleLoadVideo = () => {
    if (videoUrl) {
      let url = videoUrl;
      
      if (videoUrl.includes('youtube.com/watch')) {
        const videoId = videoUrl.split('v=')[1]?.split('&')[0];
        url = `https://www.youtube.com/embed/${videoId}`;
      } else if (videoUrl.includes('youtu.be/')) {
        const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
        url = `https://www.youtube.com/embed/${videoId}`;
      }
      
      setEmbedUrl(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 flex items-center justify-center p-4 overflow-x-hidden relative">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xl opacity-0 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 3 + 4}s`
            }}
          >
            {['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      {/* Question Page */}
      {currentPage === 'question' && (
        <div className="relative z-10 text-center p-10 bg-white/90 rounded-[30px] shadow-2xl max-w-2xl w-full backdrop-blur-sm">
          <h1 className="font-pacifico text-6xl text-pink-600 mb-8 drop-shadow-lg">
            Happy Valentine's Day! 💕
          </h1>
          <p className="font-dancing text-3xl text-pink-400 mb-10">
            Will you be my Valentine?
          </p>
          <div className="flex gap-8 justify-center items-center flex-wrap relative min-h-[80px]">
            <button
              onClick={() => setCurrentPage('carousel')}
              className="font-dancing text-2xl px-12 py-4 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 font-bold hover:shadow-pink-400/50"
            >
              Yes! 💖
            </button>
            <button
              onMouseEnter={handleNoHover}
              className="font-dancing text-2xl px-12 py-4 bg-gradient-to-r from-pink-200 to-pink-100 text-pink-600 rounded-full shadow-lg font-bold transition-all duration-300"
              style={{
                position: noBtnPosition.x || noBtnPosition.y ? 'fixed' : 'relative',
                left: noBtnPosition.x ? `${noBtnPosition.x}px` : 'auto',
                top: noBtnPosition.y ? `${noBtnPosition.y}px` : 'auto',
                zIndex: 50
              }}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Carousel Page */}
      {currentPage === 'carousel' && (
        <div className="relative z-10 text-center p-10 bg-white/90 rounded-[30px] shadow-2xl max-w-4xl w-full backdrop-blur-sm">
          <h2 className="font-pacifico text-5xl text-pink-600 mb-8 relative z-30">
            Our Beautiful Moments 💖
          </h2>
          
          <div className="relative h-[400px] my-10 z-20" style={{ perspective: '1000px' }}>
            <div className="absolute inset-0 animate-rotate3d" style={{ transformStyle: 'preserve-3d' }}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-52 h-64 -ml-26 -mt-32"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${i * 60}deg) translateZ(300px)`
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-2xl border-4 border-white">
                    📷 Photo {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('presents')}
            className="mt-8 font-dancing text-2xl px-10 py-4 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 font-bold animate-pulse relative z-30"
          >
            Continue to Presents 🎁
          </button>
        </div>
      )}

      {/* Cute Text Animations - Full Screen */}
      {currentPage === 'carousel' && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
          {cuteTexts.map((text) => (
            <div
              key={text.id}
              className="absolute font-dancing text-3xl text-pink-600 font-bold animate-popInOut whitespace-nowrap"
              style={{
                left: `${text.left}%`,
                top: `${text.top}%`,
                textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)'
              }}
            >
              {text.message}
            </div>
          ))}
        </div>
      )}

      {/* Presents Page */}
      {currentPage === 'presents' && (
        <div className="relative z-10 text-center p-10 bg-white/90 rounded-[30px] shadow-2xl max-w-2xl w-full backdrop-blur-sm">
          <h2 className="font-pacifico text-5xl text-pink-600 mb-6">Yay! 🎉</h2>
          <p className="font-dancing text-3xl text-pink-400 mb-10">
            You have 2 presents from Suyash!
          </p>
          <div className="flex gap-10 justify-center flex-wrap">
            <div
              onClick={() => setCurrentPage('video')}
              className="w-52 h-52 bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:scale-105 shadow-xl hover:shadow-pink-400/50 relative overflow-hidden group"
            >
              <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">🎁</div>
              <div className="font-dancing text-2xl text-white font-bold">Video 🎥</div>
            </div>
            <div
              onClick={() => setCurrentPage('letter')}
              className="w-52 h-52 bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:scale-105 shadow-xl hover:shadow-pink-400/50 relative overflow-hidden group"
            >
              <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">🎁</div>
              <div className="font-dancing text-2xl text-white font-bold">Letter 💌</div>
            </div>
          </div>
        </div>
      )}

      {/* Video Page */}
      {currentPage === 'video' && (
        <div className="relative z-10 text-center p-10 bg-white/90 rounded-[30px] shadow-2xl max-w-2xl w-full backdrop-blur-sm">
          <h2 className="font-pacifico text-5xl text-pink-600 mb-8">
            A Special Video for You 🎥
          </h2>
          <div className="rounded-3xl overflow-hidden shadow-xl mb-6">
            {embedUrl ? (
              <iframe
                width="100%"
                height="300"
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            ) : (
              <div className="w-full h-[300px] bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white">
                <div>
                  <p className="text-2xl font-dancing mb-2">💖 Add your video below 💖</p>
                  <p className="text-lg font-dancing opacity-90">Enter a YouTube or video URL</p>
                </div>
              </div>
            )}
          </div>
          <div className="mb-6">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste YouTube or video URL here..."
              className="w-4/5 px-6 py-3 border-2 border-pink-400 rounded-full font-dancing text-lg outline-none focus:border-pink-600 transition-colors"
            />
            <button
              onClick={handleLoadVideo}
              className="mt-4 font-dancing text-xl px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 font-bold"
            >
              Load Video
            </button>
          </div>
          <button
            onClick={() => setCurrentPage('presents')}
            className="font-dancing text-xl px-8 py-3 bg-gradient-to-r from-pink-200 to-pink-100 text-pink-600 rounded-full shadow-lg hover:scale-105 transition-all duration-300 font-bold"
          >
            Back to Presents
          </button>
        </div>
      )}

      {/* Letter Page */}
      {currentPage === 'letter' && (
        <>
          {/* Bouquet decorations around the screen */}
          <div className="fixed inset-0 pointer-events-none z-5">
            <div className="absolute top-10 left-10 text-8xl opacity-80 animate-bounce" style={{ animationDuration: '3s' }}>💐</div>
            <div className="absolute top-20 right-16 text-7xl opacity-80 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>🌹</div>
            <div className="absolute bottom-24 left-20 text-8xl opacity-80 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🌺</div>
            <div className="absolute bottom-16 right-24 text-7xl opacity-80 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}>🌸</div>
            <div className="absolute top-1/2 left-10 text-6xl opacity-80 animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.3s' }}>🌷</div>
            <div className="absolute top-1/2 right-14 text-6xl opacity-80 animate-bounce" style={{ animationDuration: '3.3s', animationDelay: '1.2s' }}>🌻</div>
            <div className="absolute top-40 left-1/4 text-5xl opacity-70 animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '0.6s' }}>🌼</div>
            <div className="absolute bottom-40 right-1/4 text-5xl opacity-70 animate-bounce" style={{ animationDuration: '3.6s', animationDelay: '0.9s' }}>💐</div>
          </div>

          <div className="relative z-10 p-10 bg-white/90 rounded-[30px] shadow-2xl max-w-xl w-full backdrop-blur-sm">
            <div 
              className="bg-gradient-to-b from-pink-50 to-white p-12 rounded-xl shadow-lg relative border-4 border-pink-400 border-l-[30px] border-l-pink-300"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #ffc0cb 31px, #ffc0cb 32px)',
              }}
            >
              <div className="absolute inset-0 opacity-30 pointer-events-none rounded-xl"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffb3d9 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              ></div>
              
              <div className="relative z-10">
                <h3 className="font-sacramento text-5xl text-pink-600 mb-8 text-center">
                  To My Dearest Love 💕
                </h3>
                <div className="font-dancing text-xl text-pink-700 leading-relaxed space-y-4 text-left">
                  <p>Every moment with you feels like a beautiful dream I never want to wake up from.</p>
                  <p>Your smile lights up my darkest days, and your laughter is the sweetest melody my heart has ever known.</p>
                  <p>You are my sunshine on cloudy days, my comfort in times of worry, and my greatest adventure.</p>
                  <p>I fall in love with you more and more each day, discovering new reasons why you're so incredibly special.</p>
                  <p>Thank you for being you - beautiful, kind, amazing, and absolutely perfect in every way.</p>
                  <p>You make my world infinitely better just by being in it. I love you beyond words! 💖</p>
                  <div className="text-right text-2xl mt-8 font-sacramento">
                    Forever yours,<br />Suyash
                  </div>
                </div>
                <div className="text-4xl text-center mt-6">
                  💐🌹🌺🌸🌷🌻🌼
                </div>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('presents')}
              className="mt-8 font-dancing text-xl px-8 py-3 bg-gradient-to-r from-pink-200 to-pink-100 text-pink-600 rounded-full shadow-lg hover:scale-105 transition-all duration-300 font-bold mx-auto block"
            >
              Back to Presents
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Dancing+Script:wght@400;700&family=Sacramento&display=swap');
        
        .font-pacifico {
          font-family: 'Pacifico', cursive;
        }
        
        .font-dancing {
          font-family: 'Dancing Script', cursive;
        }
        
        .font-sacramento {
          font-family: 'Sacramento', cursive;
        }
        
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float 6s infinite;
        }
        
        @keyframes rotate3d {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
        
        .animate-rotate3d {
          animation: rotate3d 20s linear infinite;
        }
        
        @keyframes popInOut {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-10deg);
          }
          10% {
            opacity: 1;
            transform: scale(1.2) rotate(5deg);
          }
          20% {
            transform: scale(1) rotate(0deg);
          }
          80% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          90% {
            opacity: 1;
            transform: scale(1.1) rotate(-5deg);
          }
          100% {
            opacity: 0;
            transform: scale(0) rotate(10deg);
          }
        }
        
        .animate-popInOut {
          animation: popInOut 4s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
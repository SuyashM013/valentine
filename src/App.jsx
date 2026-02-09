
import React, { useState, useEffect, useRef } from 'react';
import CurvedLoop from './components/CurvedLoop';
import ImageTrail from './components/ImageTrail';
import { toast } from "sonner"

import vid1 from '/vid1.mp4';
import i1 from '/i1.png';
import i2 from '/i2.png';
import i3 from '/i3.png';
import i4 from '/i4.png';
import i5 from '/i5.png';
import i6 from '/i6.png';


export default function ValentineWebsite() {
  const [currentPage, setCurrentPage] = useState('question');
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [videoUrl, setVideoUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [cuteTexts, setCuteTexts] = useState([]);
  const noBtnRef = useRef(null);

  const cuteMessages = [
    "You're my everything Babe! 💕",
    "Love your smile 😊",
    "You make me so happy ✨",
    "Forever and always.. 💖",
    "My beautiful Ladyyy 🌹",
    "Favorite person 💝",
    "You're amazing ⭐",
    "I'm so lucky 🍀",
    "You're perfect 💗",
    "My heart is all yours 💓",
    "You complete me 🌟",
    "Best girlfriend ever 👑",
    "You're my Sunshine ☀️",
    "I adore you 💘",
    "You're incredible Babe 🎀",
    "Pretty Little Babyy 🎀"
  ];

  // Floating hearts animation
  useEffect(() => {
    const hearts = [];
    for (let i = 0; i < 20; i++) {
      hearts.push({
        id: i,
        emoji: ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)],
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 6
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
    const padding = 200; // To prevent button from going off-screen
    const maxX = window.innerWidth - padding; // Button width consideration
    const maxY = window.innerHeight - padding; // Button height consideration
    setNoBtnPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-pink-200 to-pink-400 flex items-center justify-center p-4 overflow-x-hidden relative">
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
        <div >
          <div className='h-auto w-full absolute top-0 left-0 pointer-events-none z-0 lg:flex lg:items-center lg:justify-center'>
            <CurvedLoop
              marqueeText="💝 Love 🌟 You 🌹 GunGun 💖 Baby "
              speed={3}
              curveAmount={400}
              direction="left"
              className="custom-text-style"
            />
          </div>
          <div className="relative z-10 text-center p-10 bg-white/30 rounded-[30px] shadow-2xl max-w-2xl lg:max-w-3xl w-full backdrop-blur-sm">

            <h1 className="font-pacifico text-6xl text-pink-600 mb-8 drop-shadow-lg ">
              Happy Valentine's Day Babyy 💕
            </h1>
            <p className="font-dancing text-3xl text-pink-400 mb-10">
              Will you be my Valentine Babe?
            </p>
            <div className="flex gap-8 justify-center items-center flex-wrap relative min-h-20">
              <button
                onClick={() => setCurrentPage('carousel')}
                className="font-dancing text-2xl px-12 py-4 bg-linear-to-r from-pink-300 to-pink-700 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 font-bold hover:shadow-pink-400/70 cursor-pointer"
              >
                Yes! 💖
              </button>


              <button
                ref={noBtnRef}
                onMouseEnter={handleNoHover}
                className="font-dancing text-2xl px-12 py-4 bg-linear-to-r from-pink-200 to-pink-100 text-pink-600 rounded-full shadow-lg font-bold transition-all duration-300"
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
        </div>
      )}

      {/* Carousel Page */}
      {currentPage === 'carousel' && (
        <div className="relative z-10 text-center p-10 bg-white/50 rounded-[30px] shadow-2xl max-w-3xl w-full backdrop-blur-sm">
          <h2 className="font-pacifico text-5xl text-pink-600 mb-8 relative z-30">
            Our Beautiful Moments 💖
          </h2>

          <div className="relative h-100 my-10 z-20" style={{ perspective: '1000px' }}>
            <div className="absolute inset-0 animate-rotate3d" style={{ transformStyle: 'preserve-3d' }}>
              {[0, 1, 2, 3, 4, 5,8].map((i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-52 h-80 -ml-26 -mt-32"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${i * 60}deg) translateZ(300px)`
                  }}
                >
                  <div className="w-full h-full rounded-2xl flex items-center justify-center text-white text-2xl shadow-2xl shadow-pink-500/30 border-4 border-white">
                    <img src={`/pic${i + 1}.jpg`} alt={`Memory ${i + 1}`} className="w-full h-full object-cover rounded-2xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('presents')}
            className="mt-8 font-dancing text-2xl px-10 py-4 bg-linear-to-r from-pink-600 to-pink-400 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 font-bold animate-pulse relative z-30 cursor-pointer"
          >
            See Your Presents 🎁😘
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
        <div className='w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden'>

          <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
            <ImageTrail

              items={[
                '/pic1.jpg',
                '/pic2.jpg',
                '/pic3.jpg',
                '/pic4.jpg',
                '/pic5.jpg',
                '/pic6.jpg',
                '/pic7.jpg',
                '/pic8.jpg',
                '/pic9.jpg',
                '/pic10.jpg',
                '/pic11.jpg',
                '/pic12.jpg',
                '/pic13.jpg',
                '/pic14.jpg',
                '/pic15.jpg',
                '/pic16.jpg',

              ]}
              variant="2"
            />
          </div>

          <div className="absolute z-10 text-center p-10 bg-white/50 rounded-[30px] shadow-2xl max-w-2xl w-full backdrop-blur-sm">
            <h2 className="font-pacifico text-5xl text-pink-600 mb-6">Yay! 🎉</h2>
            <p className="font-dancing text-3xl text-pink-400 mb-10">
              You have 2 presents from Suyash!
            </p>
            <div className="flex gap-10 justify-center flex-wrap">
              <div
                onClick={() => setCurrentPage('video')}
                className="w-52 h-52 bg-linear-to-br from-pink-300 to-pink-500 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:scale-105 shadow-xl hover:shadow-pink-400/70 relative overflow-hidden group"
              >
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">🎁</div>
                <div className="font-dancing text-2xl text-white font-bold">
                  <span className="hidden group-hover:inline">🎥</span>
                </div>
              </div>
              <div
                onClick={() => setCurrentPage('letter')}
                className="w-52 h-52 bg-linear-to-br from-pink-300 to-pink-500 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:scale-105 shadow-xl hover:shadow-pink-400/70 relative overflow-hidden group"
              >
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">🎁</div>
                <div className="font-dancing text-2xl text-white font-bold">
                  <span className="hidden group-hover:inline"> 💌</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('carousel')}
              className="mt-8 font-dancing text-xl px-8 py-3 bg-linear-to-r from-pink-300 to-pink-100 text-pink-600 rounded-full shadow-lg hover:scale-105 transition-all duration-300 font-bold cursor-pointer"
            >
              Back to Gallery 📸
            </button>
          </div>
        </div>
      )}



      {/* Video Page */}
      {currentPage === 'video' && (
        <div className="relative z-10 text-center p-10 bg-white/70 rounded-[30px] shadow-2xl max-w-2xl w-full backdrop-blur-sm">
          <h2 className="font-pacifico text-5xl text-pink-600 mb-8">
            Special Video for my Love 😘
          </h2>
          <div className="rounded-3xl overflow-hidden shadow-xl mb-6">

            <div className="w-full bg-linear-to-br from-pink-100 to-pink-200 flex items-center justify-center text-white p-10">
              <div>

                <video className="w-full bg-pink-300 rounded-lg" autoPlay loop controls>
                  <source src={vid1} type="video/mp4" />
                  Your browser does not support the video.
                </video>

              </div>
            </div>

          </div>

          <button
            onClick={() => setCurrentPage('presents')}
            className="font-dancing text-xl px-8 py-3 bg-linear-to-r from-pink-300 to-pink-100 text-pink-600 rounded-full shadow-lg hover:scale-105 transition-all duration-300 font-bold cursor-pointer"
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


            <div className="absolute top-5 left-5 text-8xl -rotate-45" >
              <img src={i1} alt="Rose" className="w-92 animate-none " />
            </div>


            <div className="absolute top-2 right-16 text-7xl rotate-80 hidden lg:block" >
              <img src={i4} alt="Rose" className="w-92 animate-none " />
            </div>


            <div className="absolute bottom-0 left-40 text-8xl rotate-45 " >
              <img src={i3} alt="Rose" className="w-92 animate-none " />
            </div>

            <div className="absolute bottom-2 right-15 text-7xl hidden lg:block " >
              <img src={i2} alt="Rose" className="w-92 animate-none " />
            </div>


            <div className="absolute top-1/2 right-114 text-6xl " >

              <img src={i6} alt="Rose" className="w-92 animate-none " />
            </div>

            <div className="absolute top-20 left-99 text-5xl  " >
              <img src={i6} alt="Rose" className="w-92 animate-none " /></div>

            <div className="absolute bottom-40 right-1/4 text-5xl hidden lg:block ">
              <img src={i5} alt="Rose" className="w-92 animate-none " />
            </div>
          </div>

          <div className="relative z-10 p-10 bg-white/50 rounded-[30px] shadow-2xl max-w-xl lg:max-w-3xl w-full backdrop-blur-sm">

            <div
              className="bg-linear-to-b from-pink-50 to-white p-12 rounded-xl shadow-lg relative border-4 border-pink-400 border-l-30 border-l-pink-300"
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

                <div className="font-dancing text-xl text-pink-800 leading-relaxed space-y-4 text-left">

                  <p>Every moment with you feels like a beautiful dream I never want to wake up from.</p>

                  <p>Your smile lights up my darkest days, and your laughter is the sweetest melody my heart has ever known.</p>

                  <p>You are my sunshine on cloudy days, my comfort in times of worry, and my greatest adventure.</p>

                  <p>I fall in love with you more and more each day, discovering new reasons why you're so incredibly special.</p>

                  <p>Thank you for being you - beautiful, kind, amazing, and absolutely perfect in every way.</p>

                  <p>You make my world infinitely better just by being in it. I love you beyond words! 💖</p>

                  <div className="text-right text-2xl mt-8 font-sacramento">
                    Forever yours,<br /> <span className='text-red-500'>Suyash </span>
                  </div>
                </div>
                {/* <div className="text-4xl text-center mt-6">
                  💐🌹🌺🌸🌷🌻🌼
                </div> */}
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('presents')}
              className="mt-8 font-dancing text-xl px-8 py-3 bg-linear-to-r from-pink-300 to-pink-100 text-pink-600 rounded-full shadow-lg shadow-pink-300 hover:scale-105 transition-all duration-300 font-bold mx-auto block cursor-pointer"
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

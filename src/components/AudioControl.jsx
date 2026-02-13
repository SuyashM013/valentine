import { useEffect, useRef, useState } from "react";

const tracks = [
    "/audio/aud1.mp3",
    "/audio/aud2.mp3",
    "/audio/aud3.mp3",
];

export default function AudioControl() {
    const audioRef = useRef(null);
    const fadeInterval = useRef(null);
    const trackIndex = useRef(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    // 🔀 Shuffle tracks once
    const shuffleTracks = () => {
        return [...tracks].sort(() => Math.random() - 0.5);
    };

    const playlist = useRef(shuffleTracks());

    // 🔹 Fade In
    const fadeIn = () => {
        clearInterval(fadeInterval.current);
        audioRef.current.volume = 0;

        fadeInterval.current = setInterval(() => {
            if (audioRef.current.volume < 0.35) {
                audioRef.current.volume += 0.035;
            } else {
                audioRef.current.volume = 0.35;
                clearInterval(fadeInterval.current);
            }
        }, 100);
    };

    // 🔹 Fade Out
    const fadeOut = (cb) => {
        clearInterval(fadeInterval.current);

        fadeInterval.current = setInterval(() => {
            if (audioRef.current.volume > 0.05) {
                audioRef.current.volume -= 0.05;
            } else {
                audioRef.current.pause();
                audioRef.current.volume = 0;
                clearInterval(fadeInterval.current);
                cb && cb();
            }
        }, 100);
    };

    // ▶️ Play current track
    const playCurrent = () => {
        const src = playlist.current[trackIndex.current];

        if (!src) return;

        if (audioRef.current) audioRef.current.pause();

        const audio = new Audio(src);
        audioRef.current = audio;

        audio.onended = () => {
            trackIndex.current =
                (trackIndex.current + 1) % playlist.current.length;
            playCurrent();
        };

        audio.play();
        fadeIn();
        setIsPlaying(true);
        localStorage.setItem("music", "on");
    };

    // ▶️ Start playlist
    const startMusic = () => {
        playCurrent();
        setHasInteracted(true);
    };

    // ⏸ Pause music
    const pauseMusic = () => {
        fadeOut(() => setIsPlaying(false));
        localStorage.setItem("music", "off");
    };

    // 🔁 Toggle
    const toggleMusic = () => {
        if (!hasInteracted) {
            startMusic();
            return;
        }

        if (isPlaying) {
            pauseMusic();
        } else {
            audioRef.current.play();
            fadeIn();
            setIsPlaying(true);
            localStorage.setItem("music", "on");
        }
    };

    // 🧠 Restore preference
    useEffect(() => {
        const saved = localStorage.getItem("music");

        if (saved === "on") {
            const resume = () => {
                startMusic();
                window.removeEventListener("click", resume);
            };
            window.addEventListener("click", resume);
        }

        return () => {
            clearInterval(fadeInterval.current);
            audioRef.current?.pause();
        };
    }, []);

    return (
        <button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-150 rounded-full bg-pink-700/50 px-6 py-3 text-white backdrop-blur-md transition cursor-pointer hover:bg-pink-900"
        >
            {isPlaying ? "⏸ Pause " : "▶️ Play "}
        </button>
    );
}

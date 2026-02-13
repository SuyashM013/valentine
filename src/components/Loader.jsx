


// components/HeartLoader.jsx
export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <svg
                width="240"
                height="220"
                viewBox="0 0 24 24"
                fill="none"
                className="heart-svg"
            >
                <defs>
                    {/* Gradient */}
                    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff1212" />
                        <stop offset="100%" stopColor="#ff2083" />
                    </linearGradient>

                    {/* Liquid Glow Filter */}
                    <filter
                        id="liquidGlow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                        filterUnits="userSpaceOnUse"
                    >
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="
                1 0 0 0 0
                0 0.3 0 0 0
                0 0 0.6 0 0
                0 0 0 22 -8"
                            result="goo"
                        />
                        <feMerge>
                            <feMergeNode in="goo" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* OUTER HEART */}
                <path
                    d="M12 21s-7.5-4.35-10-9.5C-0.5 6.5 3.5 2 7.5 4.5 9.5 5.75 12 8.5 12 8.5s2.5-2.75 4.5-4C20.5 2 24.5 6.5 22 11.5 19.5 16.65 12 21 12 21z"
                    stroke="url(#heartGradient)"
                    strokeWidth="1.6"
                    fill="none"
                    filter="url(#liquidGlow)"
                    className="heart-path outer-heart"
                    transform="scale(1.1) translate(-1.1 -1.1)"
                />

                {/* INNER HEART */}
                <path
                    d="M12 19s-6-3.5-8-7.5C2 7.5 5 5 7.8 6.8 9.5 7.9 12 10.3 12 10.3s2.5-2.4 4.2-3.5C19 5 22 7.5 20 11.5 18 15.5 12 19 12 19z"
                    stroke="url(#heartGradient)"
                    strokeWidth="1.2"
                    fill="none"
                    filter="url(#liquidGlow)"
                    className="heart-path inner-heart"
                />

            </svg>
        </div>
    );
}

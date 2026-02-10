import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, X, Minimize } from 'lucide-react';
import { motion } from 'framer-motion';

export const VideoPlayer = ({ onClose }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    // Sample video URL
    const videoSrc = "https://videos.pexels.com/video-files/3756003/3756003-uhd_2560_1440_25fps.mp4";

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => setDuration(video.duration);

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateDuration);

        // Auto play when opened in PiP
        video.play().then(() => setIsPlaying(true)).catch(e => console.log("Autoplay failed", e));

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (isMuted) {
            videoRef.current.volume = volume || 1;
            setIsMuted(false);
        } else {
            videoRef.current.volume = 0;
            setIsMuted(true);
        }
    };

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value);
        videoRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current.parentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] md:w-[500px] aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden group border border-white/10"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover opacity-90"
                onClick={togglePlay}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-black/40 pointer-events-none" />

            {/* Top Right Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-black/60 backdrop-blur-md p-2 rounded-full text-white transition-all transform hover:scale-110"
            >
                <X size={16} />
            </button>

            {/* Main Text Content - Scaled down for PiP */}
            <div className="absolute top-8 left-6 max-w-[80%] z-40 text-white pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-px w-6 bg-white/60"></div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300">The Process</span>
                </div>
                <h1 className="text-3xl font-serif italic mb-2 leading-none">
                    The Art of <span className="not-italic font-sans font-light">Craft</span>
                </h1>
            </div>

            {/* Custom Controls Bar - Compact */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md rounded-xl px-4 py-3 flex items-center gap-3 border border-white/5 z-50"
            >
                {/* Play/Pause Button */}
                <button onClick={togglePlay} className="text-white hover:text-blue-400 transition-colors">
                    {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                </button>

                {/* Time Display */}
                <span className="text-[10px] font-mono text-gray-300 min-w-[30px]">{formatTime(currentTime)}</span>

                {/* Progress Bar */}
                <div className="flex-1 relative h-1 bg-white/20 rounded-full cursor-pointer group/progress">
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                        className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-100 ease-linear"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2 group/volume">
                    <button onClick={toggleMute} className="text-white hover:text-blue-400 transition-colors">
                        {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                    <div className="w-0 group-hover/volume:w-16 overflow-hidden transition-all duration-300">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                        />
                    </div>
                </div>

                <div className="h-3 w-px bg-white/20 mx-1"></div>

                <button onClick={toggleFullscreen} className="text-white hover:text-blue-400 transition-colors">
                    {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
                </button>
            </motion.div>
        </motion.div>
    );
};

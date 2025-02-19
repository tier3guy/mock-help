import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  VolumeOff,
  Volume2,
  Expand,
  Shrink,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface VideoPlayerModalProps {
  videoUrl: string; // URL of the video to play
  onClose: () => void; // Callback to close the modal
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ videoUrl, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [quality, setQuality] = useState<string>("1080p");
  const [showVolumeControl, setShowVolumeControl] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [timeTooltip, setTimeTooltip] = useState<string>("");

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, [videoRef.current]);

  const togglePlayPause = (): void => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = (): void => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 5
      );
    }
  };

  const handleForward = (): void => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 5
      );
    }
  };

  const handlePlaybackRateChange = (rate: number): void => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = (): void => {
    if (videoRef.current) {
      const muteState = !isMuted;
      setIsMuted(muteState);
      videoRef.current.muted = muteState;
      setVolume(muteState ? 0 : videoRef.current.volume);
    }
  };

  const handleLoadedMetadata = (): void => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = (): void => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleQualityChange = (quality: string): void => {
    setQuality(quality);
    // Logic to load video of selected quality
  };

  const handleTimelineChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleTimelineMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const progressBar = e.currentTarget;
      const position =
        (e.nativeEvent.offsetX / progressBar.offsetWidth) *
        videoElement.duration;
      setTimeTooltip(formatTime(position));
    }
  };

  const handleTimelineMouseLeave = () => {
    setTimeTooltip("");
  };

  const toggleFullscreen = (): void => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <Dialog.Root open={!!videoUrl} >
        <Dialog.DialogTitle>&quot;&quot;
</Dialog.DialogTitle>
      <Dialog.Content aria-describedby="modal-description" className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"  >
      <div
      ref={containerRef}
      className={`relative h-[281px] min-w-[500px] flex flex-col items-center justify-center bg-black text-white shadow-lg  overflow-hidden ${
        isFullscreen
          ? "fixed top-0 left-0 w-screen h-screen z-50"
          : "w-[500px] h-[281px]"
      }`}
    >
      {/* Video Player */}
      <video
        ref={videoRef}
        className="w-full h-full"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        controls={false} // Custom controls
      >
        <source src={`/videoplayback.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Controls */}
      <div
        className={`absolute bottom-0 flex flex-col w-full px-4 py-1 space-y-4 bg-gray-800 bg-opacity-75 ${
          isFullscreen ? "z-50" : ""
        }`}
      >
        {/* Timeline */}
        <div className="relative w-full">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            step="0.1"
            onChange={handleTimelineChange}
            onMouseMove={handleTimelineMouseMove}
            onMouseLeave={handleTimelineMouseLeave}
            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer"
          />
          {timeTooltip && (
            <div className="absolute top-[-25px] left-[50%] transform -translate-x-[50%] bg-gray-700 text-white px-2 py-1 rounded-md">
              {timeTooltip}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center w-full">
  {/* Playback Controls (Left Section) */}
  <div className="flex items-center space-x-2 w-[45%]">
    <button
      onClick={togglePlayPause}
      className="p-1 bg-gray-700 rounded-full hover:bg-gray-600"
      title={isPlaying ? "Pause" : "Play"}
    >
      {isPlaying ? (
        <Pause className="text-white text-sm sm:text-xs" />
      ) : (
        <Play className="text-white text-sm sm:text-xs" />
      )}
    </button>

    <button
      onClick={handleRewind}
      className="p-1 bg-gray-700 rounded-full hover:bg-gray-600"
      title="Back 5s"
    >
      <RotateCcw className="text-white text-sm sm:text-xs" />
    </button>

    {/* Playback Speed */}
    <select
      value={playbackRate}
      onChange={(e) => handlePlaybackRateChange(Number(e.target.value))}
      className="px-2 py-1 bg-gray-700 rounded-lg text-white text-xs"
      title="Playback Speed"
    >
      {[0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0].map((rate) => (
        <option key={rate} value={rate}>
          {rate}x
        </option>
      ))}
    </select>

    <button
      onClick={handleForward}
      className="p-1 bg-gray-700 rounded-full hover:bg-gray-600"
      title="Forward 5s"
    >
      <RotateCw className="text-white text-sm sm:text-xs" />
    </button>
    {/* Current Time / Duration (Center Section) */}
  <div className="text-white font-bold text-xs whitespace-nowrap">
    {formatTime(currentTime)} / {formatTime(duration)}
  </div>
  </div>

  

  {/* Volume, Captions, Quality, Fullscreen (Right Section) */}
  <div className="flex items-center space-x-2 w-[45%] justify-end">
    {/* Volume Button and Slider */}
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShowVolumeControl(true)}
    >
      <button
        onClick={toggleMute}
        className="p-1 bg-gray-700 rounded-full hover:bg-gray-600"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeOff className="text-white text-sm sm:text-xs" />
        ) : (
          <Volume2 className="text-white text-sm sm:text-xs" />
        )} 
      </button>

      {showVolumeControl && (
        <input
          type="range"
          min="0"
          onMouseEnter={() => setShowVolumeControl(true)}
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="absolute -left-6 bottom-28 w-20 bg-gray-700 sm:block -rotate-90"
          onMouseOut={()=>setShowVolumeControl(false)}
        />
      )}
    </div>

    {/* Captions Button */}
    {/* <button className="p-1 bg-gray-700 rounded-lg hover:bg-gray-600 text-white" title="Captions">
      <Captions className="text-white text-sm sm:text-xs" />
    </button> */}

    {/* Quality Selector */}
    <select
      value={quality}
      onChange={(e) => handleQualityChange(e.target.value)}
      className="px-2 py-1 bg-gray-700 rounded-lg text-white text-xs"
      title="Quality"
    >
      {["1080p", "720p", "480p", "360p"].map((q) => (
        <option key={q} value={q}>
          {q}
        </option>
      ))}
    </select>

    {/* Fullscreen Toggle */}
    <button
      onClick={toggleFullscreen}
      className="p-1 bg-gray-700 rounded-lg hover:bg-gray-600 text-white"
      title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
    >
      {isFullscreen ? (
        <Shrink className="text-white text-sm sm:text-xs" />
      ) : (
        <Expand className="text-white text-sm sm:text-xs" />
      )}
    </button>
  </div>
</div>


      </div>
     
    </div>
     {/* Close Button */}
     <Dialog.Close asChild>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 font-bold  text-white"
              aria-label="Close"
            >
              Close
            </button>
          </Dialog.Close>
      </Dialog.Content>
      
    </Dialog.Root>
  );
};

export default VideoPlayerModal;
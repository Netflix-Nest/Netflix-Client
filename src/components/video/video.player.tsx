"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
  MessageSquare,
  RotateCcw,
  ChevronLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Box, Button, Text, Flex, IconButton, Slider } from "@chakra-ui/react";
import { RiReplay10Fill } from "react-icons/ri";
import { RiForward10Fill } from "react-icons/ri";
import "../css/global.css";
import SkipIntro from "./skip.introduction";
import ProgressBarVideo from "./progress.bar";
import CenterPlayButton from "../share/play.center";
import BackButton from "../share/button.back";
import Spinner from "../share/spinner";
import VolumeSlider from "./volume.slider";
import ButtonControl from "../share/button.control";

interface VideoPlayerProps {
  fileName: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ fileName }) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isHoveredVolume, setIsHoveredVolume] = useState(false);
  const [bufferedPercentage, setBufferedPercentage] = useState(0);

  const updateBufferedProgress = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      setDuration(video.duration);
      const buffered = video.buffered;

      if (duration > 0 && buffered.length > 0) {
        let bufferedEnd = 0;
        for (let i = 0; i < buffered.length; i++) {
          if (
            buffered.start(i) <= video.currentTime &&
            video.currentTime <= buffered.end(i)
          ) {
            bufferedEnd = buffered.end(i);
            break;
          }
        }

        if (bufferedEnd === 0) {
          bufferedEnd = buffered.end(buffered.length - 1);
        }

        const percentage = (bufferedEnd / duration) * 100;
        setBufferedPercentage(Math.min(percentage, 100));
      }
    }
  };
  useEffect(() => {}, [isFullscreen]);

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/videos/${fileName}`;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeoutId);

      if (isPlaying) {
        timeoutId = setTimeout(() => {
          setShowControls(false);
        }, 1500);
      }
    };

    const handleMouseLeave = () => {
      if (isPlaying) {
        setShowControls(false);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      clearTimeout(timeoutId);
    };
  }, [isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          setTimeout(() => {
            videoRef.current!.currentTime = Math.max(
              0,
              videoRef.current!.currentTime - 10
            );
          }, 100);
          break;

        case "ArrowRight":
          setTimeout(() => {
            videoRef.current!.currentTime = Math.min(
              duration,
              videoRef.current!.currentTime + 10
            );
          }, 100);

          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume((prev) => Math.min(100, prev + 10));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume((prev) => Math.max(0, prev - 10));
          break;
        case "KeyF":
          toggleFullscreen();
          break;
        case "KeyM":
          toggleMute();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [duration]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.volume = volume / 100;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value / 100;
      setIsMuted(value === 0);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const clickPercentage = clickPosition / rect.width;
    const newTime = clickPercentage * duration;
    videoRef.current.currentTime = newTime;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      setIsFullscreen(true);
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        setIsFullscreen(false);
        document.exitFullscreen();
      }
    }
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(
      0,
      Math.min(duration, videoRef.current.currentTime + seconds)
    );
  };

  const changePlaybackRate = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Box
      ref={containerRef}
      position="relative"
      width="100%"
      height="100vh"
      bg="black"
      overflow="hidden"
      cursor={showControls ? "default" : "none"}>
      <video
        ref={videoRef}
        src={url}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onWaiting={() => setIsBuffering(true)}
        onCanPlay={() => setIsBuffering(false)}
        onClick={togglePlay}
        onProgress={updateBufferedProgress}
        onLoadStart={updateBufferedProgress}
      />

      {isBuffering && <Spinner />}

      {!isFullscreen && <BackButton showControls={showControls} />}

      {!isPlaying && showControls && (
        <CenterPlayButton togglePlay={togglePlay} />
      )}

      {/* Bottom Controls */}
      <Box
        position="absolute"
        bottom="10px"
        left="0"
        right="0"
        bgGradient="linear(to-t, blackAlpha.900, transparent)"
        opacity={showControls ? 1 : 0}
        transition="opacity 0.3s"
        pb="4">
        <ProgressBarVideo
          bufferedPercentage={bufferedPercentage}
          handleProgressClick={handleProgressClick}
          progressBarRef={progressBarRef}
          progressPercentage={progressPercentage}
        />

        {/* Controls */}
        <Flex px="8" alignItems="center" justifyContent="space-between">
          {/* Left Controls */}
          <Flex alignItems="center" gap="5">
            <ButtonControl
              icon={
                isPlaying ? (
                  <Pause style={{ width: "48px", height: "48px" }} />
                ) : (
                  <Play style={{ width: "48px", height: "48px" }} />
                )
              }
              onClick={togglePlay}
            />

            <ButtonControl
              icon={
                <RiReplay10Fill style={{ width: "48px", height: "48px" }} />
              }
              onClick={() => skip(-10)}
            />
            <ButtonControl
              icon={
                <RiForward10Fill style={{ width: "48px", height: "48px" }} />
              }
              onClick={() => skip(10)}
            />

            <Flex alignItems="center" gap="2">
              <ButtonControl
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                onMouseEnter={() => setIsHoveredVolume(true)}
                onMouseLeave={() => setIsHoveredVolume(false)}
                icon={
                  isMuted || volume === 0 ? (
                    <VolumeX style={{ width: "48px", height: "48px" }} />
                  ) : (
                    <Volume2 style={{ width: "48px", height: "48px" }} />
                  )
                }
              />
              {isHoveredVolume && (
                <VolumeSlider
                  handleVolumeChange={handleVolumeChange}
                  isMuted={isMuted}
                  setIsHoveredVolume={setIsHoveredVolume}
                  volume={volume}
                />
              )}
            </Flex>

            <Text color="white" fontSize="xl" fontFamily="sans-serif">
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </Flex>

          {/* Right Controls */}
          <Flex alignItems="center" gap="6">
            <Box position="relative">
              <Button
                variant="plain"
                color="white"
                size="sm"
                fontSize={32}
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                _hover={{ color: "gray.300" }}>
                {playbackRate}x
              </Button>

              {showSpeedMenu && (
                <Box
                  position="absolute"
                  bottom="100%"
                  right="0"
                  mb="2"
                  bg="blackAlpha.800"
                  borderRadius="md"
                  p="2"
                  minW="80px">
                  {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                    <Button
                      key={rate}
                      variant="plain"
                      color="white"
                      size="sm"
                      width="100%"
                      fontSize="sm"
                      onClick={() => changePlaybackRate(rate)}
                      bg={
                        playbackRate === rate ? "whiteAlpha.200" : "transparent"
                      }
                      _hover={{ bg: "whiteAlpha.100" }}>
                      {rate}x
                    </Button>
                  ))}
                </Box>
              )}
            </Box>

            <ButtonControl
              icon={<Settings style={{ width: "48px", height: "48px" }} />}
            />

            <ButtonControl
              icon={<MessageSquare style={{ width: "48px", height: "48px" }} />}
            />

            <ButtonControl
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              onClick={toggleFullscreen}
              icon={
                isFullscreen ? (
                  <Minimize style={{ width: "48px", height: "48px" }} />
                ) : (
                  <Maximize style={{ width: "48px", height: "48px" }} />
                )
              }
            />
          </Flex>
        </Flex>
      </Box>

      <SkipIntro currentTime={currentTime} skip={skip} />

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Box>
  );
};

export default VideoPlayer;

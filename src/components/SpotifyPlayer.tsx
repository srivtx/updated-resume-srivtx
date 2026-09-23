"use client";

// "Last played" — the one-track Spotify card, his signature touch, rebuilt
// in this site's voice: art (self-hosted) with a hover zoom, the green
// equalizer while it plays, a play/pause slab, and an expandable seek bar.
// Audio is the official 30-second preview streamed off Spotify's CDN; the
// song title links to the real track.

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { lastPlayed } from "@/lib/data";
import { PlayIcon, PauseIcon, SpotifyIcon } from "@/components/NeuButton";

function formatTime(t: number) {
  if (!t || isNaN(t) || t <= 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function SpotifyPlayer() {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [failed, setFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => {
      if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
    };
    const onEnd = () => {
      setPlaying(false);
      setCurrent(0);
      setExpanded(false);
    };
    const onErr = () => setFailed(true);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onErr);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onErr);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || failed) {
      // preview unavailable — send them to spotify instead
      window.open(lastPlayed.trackUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      setExpanded(true);
      try {
        await audio.play();
        setPlaying(true);
        if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
      } catch {
        setFailed(true);
      }
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = barRef.current;
    if (!audio || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * duration;
    setCurrent(audio.currentTime);
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="w-full group/card">
      <audio ref={audioRef} src={lastPlayed.audioSrc} preload="metadata" />

      <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] transition-shadow duration-300 hover:shadow-md hover:shadow-black/[0.04] dark:hover:shadow-black/30">
        {/* album art — zooms on hover like his */}
        <div className="shrink-0 relative w-13 h-13 sm:w-15 sm:h-15 rounded-lg overflow-hidden shadow-sm ring-1 ring-black/10 dark:ring-white/15">
          <Image
            src={lastPlayed.albumArt}
            alt={`${lastPlayed.song} cover art`}
            width={60}
            height={60}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
          {playing && (
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
              <div className="flex gap-[3px] items-end h-3.5">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="eq-bar w-[3px] h-full rounded-sm bg-[#1DB954]" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* song info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <SpotifyIcon className="w-3.5 h-3.5 text-[#1DB954]" />
            <span className="text-[11px] font-medium tracking-wide text-black/45 dark:text-white/40">
              {playing ? "Now playing" : failed ? "Last played" : "Last played · 30s preview"}
            </span>
          </div>
          <a
            href={lastPlayed.trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-sm font-semibold text-black/85 dark:text-white/85 hover:text-[#1DB954] dark:hover:text-[#1DB954] transition-colors"
          >
            {lastPlayed.song}
          </a>
          <p className="truncate text-xs text-black/45 dark:text-white/40">
            {lastPlayed.artist}
          </p>
        </div>

        {/* play / pause */}
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause preview" : "Play 30 second preview"}
          title={playing ? "pause" : failed ? "open on spotify" : "play 30s preview"}
          type="button"
          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-800 shadow-sm hover:bg-neutral-50 dark:hover:bg-zinc-700 hover:scale-105 active:scale-95 transition-all text-black/70 dark:text-white/80"
        >
          {playing ? (
            <PauseIcon className="w-3.5 h-3.5" />
          ) : (
            <PlayIcon className="w-3.5 h-3.5 ml-0.5" />
          )}
        </button>
      </div>

      {/* seek bar — slides open while playing, like his */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr", opacity: expanded ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="mt-2.5 pt-2.5 border-t border-dashed border-black/[0.08] dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-black/40 dark:text-white/40 w-8 text-right tabular-nums">
                {formatTime(current)}
              </span>
              <div
                ref={barRef}
                onClick={seek}
                className="flex-1 relative h-1.5 cursor-pointer"
                role="progressbar"
                aria-label="seek"
              >
                <div className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/15" />
                <div
                  className="absolute left-0 top-0 bottom-0 rounded-full bg-[#1DB954] transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-black/40 dark:text-white/40 w-8 tabular-nums">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

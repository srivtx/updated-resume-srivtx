"use client";

// "Last played" — the one-track Spotify card, rebuilt on the OFFICIAL
// Spotify embed. Why: signed-in listeners get the full song (the 30s
// ceiling only applies to anonymous visitors — that's Spotify's policy,
// not something we can engineer around), and the art streams straight
// from Spotify's CDN — no self-hosted copy, no baked-in artifacts, no
// white specks. The card chrome and label stay ours; the player theme
// follows the site theme so it never looks bolted-on.

import { useEffect, useState } from "react";
import { lastPlayed } from "@/lib/data";
import { SpotifyIcon } from "@/components/NeuButton";

export function SpotifyPlayer() {
  const [dark, setDark] = useState(false);

  // keep the embed's theme glued to the site theme (listens for the
  // toggle flipping the `dark` class on <html>, including the circular
  // view-transition flip)
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const embedSrc = `${lastPlayed.trackUrl.replace(
    "open.spotify.com",
    "open.spotify.com/embed"
  )}?utm_source=generator&theme=${dark ? 1 : 0}`;

  return (
    <div className="w-full group/card">
      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] overflow-hidden transition-shadow duration-300 hover:shadow-md hover:shadow-black/[0.04] dark:hover:shadow-black/30">
        {/* our label row — the site's voice, on top of Spotify's chrome */}
        <div className="flex items-center gap-1.5 px-3.5 sm:px-4 pt-3 pb-2">
          <SpotifyIcon className="w-3.5 h-3.5 text-[#1DB954]" />
          <span className="text-[11px] font-medium tracking-wide text-black/45 dark:text-white/40">
            {lastPlayed.label}
          </span>
        </div>

        {/* official embed — compact 152px player: art, title, transport,
            progress. Full track for anyone signed into Spotify. */}
        <iframe
          key={dark ? "dark" : "light"}
          src={embedSrc}
          title={`${lastPlayed.song} — ${lastPlayed.artist}`}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ display: "block", background: "transparent" }}
        />
      </div>
    </div>
  );
}

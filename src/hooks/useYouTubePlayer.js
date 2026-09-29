import { useEffect, useRef, useState } from "react"

const API_SRC = "https://www.youtube.com/iframe_api"

let apiPromise = null

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve()
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev()
        resolve(window.YT)
      }
      if (!document.querySelector(`script[src="${API_SRC}"]`)) {
        const script = document.createElement("script")
        script.src = API_SRC
        script.async = true
        document.head.appendChild(script)
      }
    })
  }
  return apiPromise
}

export default function useYouTubePlayer(videoId) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const id = "yt-player-" + Math.random().toString(36).slice(2, 8)

    loadYouTubeApi().then(() => {
      if (cancelled || !containerRef.current) return
      containerRef.current.id = id
      const player = new window.YT.Player(id, {
        videoId,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          start: 45,
          playsinline: 1,
          origin: window.location.origin,
          enablejsapi: 1,
        },
        events: {
          onReady: () => { if (!cancelled) setPlayerReady(true) },
          onStateChange: (e) => {
            if (!cancelled) setIsPlaying(e.data === window.YT.PlayerState.PLAYING)
          }
        }
      })
      playerRef.current = player
    })

    return () => {
      cancelled = true
      setPlayerReady(false)
      const player = playerRef.current
      playerRef.current = null
      if (player?.destroy) player.destroy()
    }
  }, [videoId])

  const togglePlay = () => {
    const player = playerRef.current
    if (!player || !playerReady) return
    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
  }

  return { containerRef, isPlaying, togglePlay }
}

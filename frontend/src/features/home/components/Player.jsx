import React, { useRef, useState, useEffect, useContext } from 'react'
import {useSong} from "../hooks/useSong"
import { SongContext } from '../song.context'
import './player.scss'

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2]

const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
}

const Player = () => {
    const { song } = useSong()

    const audioRef = useRef(null)
    const progressRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [speed, setSpeed] = useState(1)
    const [volume, setVolume] = useState(1)
    const [showSpeed, setShowSpeed] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    // Reset player when song changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load()
            setIsPlaying(false)
            setCurrentTime(0)
        }
    }, [song?.url])

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
        setIsPlaying(!isPlaying)
    }

    const skip = (secs) => {
        const audio = audioRef.current
        if (!audio) return
        audio.currentTime = Math.min(Math.max(audio.currentTime + secs, 0), duration)
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
    }

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration)
    }

    const handleProgressClick = (e) => {
        const bar = progressRef.current
        const rect = bar.getBoundingClientRect()
        const ratio = (e.clientX - rect.left) / rect.width
        const newTime = ratio * duration
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    const handleSpeedChange = (s) => {
        setSpeed(s)
        audioRef.current.playbackRate = s
        setShowSpeed(false)
    }

    const handleVolume = (e) => {
        const val = parseFloat(e.target.value)
        setVolume(val)
        audioRef.current.volume = val
        setIsMuted(val === 0)
    }

    const toggleMute = () => {
        const audio = audioRef.current
        if (isMuted) {
            audio.volume = volume || 0.5
            setIsMuted(false)
        } else {
            audio.volume = 0
            setIsMuted(true)
        }
    }

    const handleSongEnd = () => {
        setIsPlaying(false)
        setCurrentTime(0)
    }

    const progress = duration ? (currentTime / duration) * 100 : 0

    if (!song) return null

return (
    <div className="player-card">

        <audio
            ref={audioRef}
            src={song.url}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleSongEnd}
        />

        {/* Poster */}
        <div className="player-card__poster-wrap">
            <img
                className="player-card__poster"
                src={song.posterUrl}
                alt={song.title}
            />
        </div>

        {/* Song Info */}
        <div className="player-card__meta">
            <h3 className="player-card__title">{song.title}</h3>
            <span className="player-card__mood">{song.mood}</span>
        </div>

        {/* Progress */}
        <div className="player-card__progress-wrap">
            <span>{formatTime(currentTime)}</span>

            <div
                className="player-card__progress"
                ref={progressRef}
                onClick={handleProgressClick}
            >
                <div
                    className="player-card__progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
      {/* Controls */}
<div className="player-card__controls">

    <button onClick={() => skip(-5)} className="player-card__btn">
        ⏪
    </button>

    <button
        onClick={togglePlay}
        className="player-card__play"
    >
        {isPlaying ? "❚❚" : "▶"}
    </button>

    <button onClick={() => skip(5)} className="player-card__btn">
        ⏩
    </button>

    {/* Volume */}
    <div className="player-card__volume">
        <button onClick={toggleMute}>
            {isMuted ? "🔇" : "🔊"}
        </button>

        <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
        />
    </div>

</div>

    </div>
)
}

export default Player
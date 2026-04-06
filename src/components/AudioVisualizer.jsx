import { useEffect, useRef, useState } from 'react'

export default function AudioVisualizer() {
  const canvasRef = useRef(null)
  const audioRef = useRef(null)
  const animationRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)

  useEffect(() => {
    const initAudio = async () => {
      try {
        const audio = new Audio('/custom-song.mp3')
        audio.loop = true
        audio.crossOrigin = 'anonymous'
        audio.volume = volume
        audioRef.current = audio

        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        audioContextRef.current = new AudioContextClass()
        
        const track = audioContextRef.current.createMediaElementSource(audio)
        const analyser = audioContextRef.current.createAnalyser()
        analyser.fftSize = 256
        
        track.connect(analyser)
        analyser.connect(audioContextRef.current.destination)
        
        analyserRef.current = analyser
        
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
        }
        
        startVisualizer()
      } catch (error) {
        console.log('Audio init error:', error)
      }
    }

    initAudio()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (audioContextRef.current) audioContextRef.current.close()
      if (audioRef.current) audioRef.current.pause()
    }
  }, [])

  const startVisualizer = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawWave = () => {
      if (!analyserRef.current) return
      
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
      analyserRef.current.getByteTimeDomainData(dataArray)
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ctx.beginPath()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = '#7c3aed'
      ctx.globalAlpha = 0.2
      
      const sliceWidth = canvas.width / dataArray.length
      let x = 0
      
      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128
        const y = (v * canvas.height) / 2
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
        
        x += sliceWidth
      }
      
      ctx.stroke()
      
      animationRef.current = requestAnimationFrame(drawWave)
    }
    
    drawWave()
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.15 }}
      />
      
      <div className="fixed bottom-5 right-5 z-50 flex gap-2 bg-gray-950/70 backdrop-blur-md rounded-full p-2 border border-gray-800">
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-rhythm-primary/80 hover:bg-rhythm-primary text-white flex items-center justify-center transition text-sm"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 accent-rhythm-primary"
        />
      </div>
    </>
  )
}
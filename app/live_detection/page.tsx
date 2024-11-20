'use client'

import { useState, useRef, useEffect } from 'react'
import { Camera, Download, Pause, Play, RefreshCw, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LiveDetection() {
  const [isDetecting, setIsDetecting] = useState(false)
  const [capturedFrames, setCapturedFrames] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isDetecting) {
      startWebcam()
    } else {
      stopWebcam()
    }
  }, [isDetecting])

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error('Error accessing webcam:', error)
    }
  }

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
    }
  }

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg')
        setCapturedFrames(prev => [...prev, imageDataUrl])
      }
    }
  }

  const toggleDetection = () => {
    setIsDetecting(prev => !prev)
  }

  const resetSession = () => {
    setCapturedFrames([])
  }

  const downloadSession = () => {
    alert('Session download functionality would be implemented here.')
  }

  const goBackToMainPage = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="mb-6">
        <button
          onClick={goBackToMainPage}
          className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Main Page</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">Live Emotion Detection</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
              width={640}
              height={480}
            />
            {!isDetecting && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <p className="text-xl">Click Start to begin detection</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={toggleDetection}
              className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              {isDetecting ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Start</span>
                </>
              )}
            </button>
            
            <button
              onClick={captureFrame}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              disabled={!isDetecting}
            >
              <Camera className="w-5 h-5" />
              <span>Capture Frame</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Captured Frames</h2>
          <div className="h-[calc(100vh-300px)] overflow-y-auto space-y-2 pr-2">
            {capturedFrames.map((frame, index) => (
              <div key={index} className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <img src={frame} alt={`Captured frame ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                  <p className="text-sm">Frame {index + 1}</p>
                  <p className="text-xs">Emotion: Happy (placeholder)</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={resetSession}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Reset</span>
            </button>
            
            <button
              onClick={downloadSession}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
              disabled={capturedFrames.length === 0}
            >
              <Download className="w-5 h-5" />
              <span>Save Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

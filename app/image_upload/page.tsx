'use client'

import { useState, useRef } from 'react'
import { Upload, X, Download, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface DetectedFace {
  id: number
  emotion: string
  confidence: number
  x: number
  y: number
  width: number
  height: number
}

export default function ImageUploadDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [detectedFaces, setDetectedFaces] = useState<DetectedFace[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setError(null)
      setIsLoading(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        detectEmotions(e.target?.result as string)
      }
      reader.onerror = () => {
        setError('Error reading the file. Please try again.')
        setIsLoading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const detectEmotions = async (imageData: string) => {
    // Simulating API call for emotion detection
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulating processing time
      const mockDetectedFaces: DetectedFace[] = [
        { id: 1, emotion: 'Happy', confidence: 0.92, x: 100, y: 50, width: 100, height: 100 },
        { id: 2, emotion: 'Surprised', confidence: 0.85, x: 300, y: 100, width: 120, height: 120 },
      ]
      setDetectedFaces(mockDetectedFaces)
    } catch (err) {
      setError('Error detecting emotions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        detectEmotions(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setError('Please drop a valid image file.')
    }
  }

  const resetUpload = () => {
    setSelectedImage(null)
    setDetectedFaces([])
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const downloadResults = () => {
    const resultsText = detectedFaces.map(face => 
      `Face ${face.id}: ${face.emotion} (Confidence: ${(face.confidence * 100).toFixed(2)}%)`
    ).join('\n')
    const blob = new Blob([resultsText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'emotion_detection_results.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const saveToUserDashboard = () => {
    // In a real application, this would save the results to the user's dashboard
    alert('Results saved to your dashboard!')
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Image Upload Detection</h1>
        <Link href="/dashboard" className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Main Page</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div 
            className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {selectedImage ? (
              <div className="relative">
                <img src={selectedImage} alt="Uploaded" className="max-w-full h-auto rounded-lg" />
                {detectedFaces.map(face => (
                  <div 
                    key={face.id}
                    className="absolute border-2 border-green-500"
                    style={{
                      left: `${face.x}px`,
                      top: `${face.y}px`,
                      width: `${face.width}px`,
                      height: `${face.height}px`
                    }}
                  >
                    <span className="absolute top-0 left-0 bg-green-500 text-white text-xs px-1 rounded-br">
                      {face.emotion}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-400">Click or drag and drop an image here</p>
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload}
          />
          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
          {isLoading && (
            <p className="text-center">Processing image...</p>
          )}
          {selectedImage && (
            <div className="flex justify-between">
              <button
                onClick={resetUpload}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
              >
                <X className="w-5 h-5" />
                <span>Reset</span>
              </button>
              <div className="space-x-2">
                <button
                  onClick={downloadResults}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                  disabled={detectedFaces.length === 0}
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={saveToUserDashboard}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                  disabled={detectedFaces.length === 0}
                >
                  <Save className="w-5 h-5" />
                  <span>Save to Dashboard</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Detected Emotions</h2>
          {detectedFaces.length > 0 ? (
            <ul className="space-y-2">
              {detectedFaces.map(face => (
                <li key={face.id} className="bg-gray-900 rounded-lg p-4">
                  <p className="font-semibold">Face {face.id}</p>
                  <p>Emotion: {face.emotion}</p>
                  <p>Confidence: {(face.confidence * 100).toFixed(2)}%</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No faces detected yet. Upload an image to start.</p>
          )}
        </div>
      </div>
    </div>
  )
}

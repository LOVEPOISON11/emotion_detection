'use client'

import { useState } from 'react'
import { PieChart, BarChart, Download, Save, Clock, User } from 'lucide-react'

interface EmotionData {
  emotion: string
  count: number
  color: string
}

interface FaceDetection {
  id: number
  timestamp: string
  emotion: string
  confidence: number
}

export default function ResultsSummary() {
  const [activeTab, setActiveTab] = useState<'overview' | 'individual'>('overview')

  // Mock data for demonstration
  const emotionData: EmotionData[] = [
    { emotion: 'Happy', count: 45, color: 'bg-yellow-500' },
    { emotion: 'Sad', count: 15, color: 'bg-blue-500' },
    { emotion: 'Angry', count: 10, color: 'bg-red-500' },
    { emotion: 'Surprised', count: 20, color: 'bg-green-500' },
    { emotion: 'Neutral', count: 30, color: 'bg-gray-500' },
  ]

  const faceDetections: FaceDetection[] = [
    { id: 1, timestamp: '2023-05-15 14:30:22', emotion: 'Happy', confidence: 0.92 },
    { id: 2, timestamp: '2023-05-15 14:30:23', emotion: 'Surprised', confidence: 0.85 },
    { id: 3, timestamp: '2023-05-15 14:30:24', emotion: 'Neutral', confidence: 0.78 },
    { id: 4, timestamp: '2023-05-15 14:30:25', emotion: 'Sad', confidence: 0.88 },
    { id: 5, timestamp: '2023-05-15 14:30:26', emotion: 'Happy', confidence: 0.95 },
  ]

  const totalDetections = emotionData.reduce((sum, item) => sum + item.count, 0)

  const saveToUserDashboard = () => {
    // In a real application, this would save the results to the user's dashboard
    alert('Results saved to your dashboard!')
  }

  const generateReport = () => {
    // In a real application, this would generate a detailed report
    alert('Generating report... This feature would create a downloadable report.')
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Results Summary</h1>

      <div className="mb-6 flex space-x-4">
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === 'overview' ? 'bg-white text-black' : 'bg-gray-800 text-white'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === 'individual' ? 'bg-white text-black' : 'bg-gray-800 text-white'
          }`}
          onClick={() => setActiveTab('individual')}
        >
          Individual Detections
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Emotion Distribution</h2>
            <div className="flex flex-wrap justify-center items-center">
              {emotionData.map((item, index) => (
                <div key={index} className="flex items-center mr-4 mb-2">
                  <div className={`w-4 h-4 ${item.color} rounded-full mr-2`}></div>
                  <span>{item.emotion}: {((item.count / totalDetections) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <PieChart className="w-48 h-48 text-gray-400" />
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Emotion Frequency</h2>
            <div className="space-y-2">
              {emotionData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-24 text-sm">{item.emotion}</div>
                  <div className="flex-grow bg-gray-800 rounded-full h-4">
                    <div
                      className={`${item.color} rounded-full h-4`}
                      style={{ width: `${(item.count / totalDetections) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-right text-sm">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'individual' && (
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Individual Face Detections</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-800">
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Timestamp</th>
                  <th className="pb-2">Emotion</th>
                  <th className="pb-2">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {faceDetections.map((detection) => (
                  <tr key={detection.id} className="border-b border-gray-800">
                    <td className="py-2">{detection.id}</td>
                    <td className="py-2">{detection.timestamp}</td>
                    <td className="py-2">{detection.emotion}</td>
                    <td className="py-2">{(detection.confidence * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <div className="flex space-x-2">
          <button
            onClick={saveToUserDashboard}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Save to Dashboard</span>
          </button>
          <button
            onClick={generateReport}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Generate Report</span>
          </button>
        </div>
        <div className="text-gray-400 flex items-center space-x-4">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <span>Session Duration: 00:05:34</span>
          </div>
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            <span>Faces Detected: {totalDetections}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
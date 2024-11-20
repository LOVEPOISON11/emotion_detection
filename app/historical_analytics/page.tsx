'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BarChart, LineChart, PieChart, Calendar, Filter, Download, ArrowLeft } from 'lucide-react'

// Mock data for demonstration
const emotionData = [
  { date: '2023-05-01', happy: 45, sad: 15, angry: 10, surprised: 20, neutral: 30 },
  { date: '2023-05-02', happy: 50, sad: 12, angry: 8, surprised: 25, neutral: 35 },
  { date: '2023-05-03', happy: 55, sad: 10, angry: 5, surprised: 30, neutral: 40 },
  { date: '2023-05-04', happy: 48, sad: 18, angry: 12, surprised: 22, neutral: 28 },
  { date: '2023-05-05', happy: 52, sad: 14, angry: 9, surprised: 28, neutral: 37 },
]

const emotions = ['Happy', 'Sad', 'Angry', 'Surprised', 'Neutral']
const emotionColors = ['bg-yellow-500', 'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-gray-500']

export default function HistoricalAnalytics() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState({ start: '2023-05-01', end: '2023-05-05' })

  const filteredData = emotionData.filter(
    (entry) => new Date(entry.date) >= new Date(dateRange.start) && new Date(entry.date) <= new Date(dateRange.end)
  )

  const totalEmotions: Record<string, number> = filteredData.reduce((acc: Record<string, number>, entry) => {
    emotions.forEach((emotion) => {
      const key = emotion.toLowerCase() as keyof typeof entry;
      if (key !== 'date') {
        acc[key] = (acc[key] || 0) + entry[key];
      }
    })
    return acc;
  }, {});

  const mostFrequentEmotion = Object.entries(totalEmotions).reduce((a, b) => (a[1] > b[1] ? a : b))[0]

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      {/* Header Section with Back Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Historical Analytics</h1>
        <Link href="/dashboard" className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Main Page</span>
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Detections</h2>
          <p className="text-4xl font-bold">
            {Object.values(totalEmotions).reduce((a: number, b: number) => a + b, 0)}
          </p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Most Frequent Emotion</h2>
          <p className="text-4xl font-bold capitalize">{mostFrequentEmotion}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Date Range</h2>
          <p className="text-lg">
            {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Emotion Trends</h2>
          <div className="h-64 flex items-center justify-center">
            <LineChart className="w-full h-full text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Emotion Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <PieChart className="w-full h-full text-gray-400" />
          </div>
        </div>
      </div>

      {/* Daily Emotion Breakdown */}
      <div className="bg-gray-900 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Daily Emotion Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="pb-2">Date</th>
                {emotions.map((emotion) => (
                  <th key={emotion} className="pb-2">{emotion}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry) => (
                <tr key={entry.date} className="border-b border-gray-800">
                  <td className="py-2">{entry.date}</td>
                  {emotions.map((emotion) => (
                    <td key={emotion} className="py-2">{entry[emotion.toLowerCase() as keyof typeof entry]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="bg-gray-800 text-white px-2 py-1 rounded"
          />
          <span>to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="bg-gray-800 text-white px-2 py-1 rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5" />
          <select
            value={selectedEmotion || ''}
            onChange={(e) => setSelectedEmotion(e.target.value || null)}
            className="bg-gray-800 text-white px-2 py-1 rounded"
          >
            <option value="">All Emotions</option>
            {emotions.map((emotion) => (
              <option key={emotion} value={emotion.toLowerCase()}>{emotion}</option>
            ))}
          </select>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          <span>Export Data</span>
        </button>
      </div>

      {/* Emotion Intensity Over Time */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Emotion Intensity Over Time</h2>
        <div className="h-64 flex items-center justify-center">
          <BarChart className="w-full h-full text-gray-400" />
        </div>
      </div>
    </div>
  )
}

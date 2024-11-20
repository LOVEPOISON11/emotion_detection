import Link from 'next/link'
import { Home, BarChart2, Camera, Image, PieChart, FileText, Settings, ClipboardList } from 'lucide-react'

export default function MainPage() {
  const pages = [
    { name: 'Home', icon: Home, description: 'Welcome to the Face Emotion Detection System', path: '/' },
    { name: 'Live Detection', icon: Camera, description: 'Real-time emotion detection from live camera feed', path: '/live_detection' },
    { name: 'Results', icon: ClipboardList, description: 'View and analyze detection results', path: '/results' },
    { name: 'Image Upload', icon: Image, description: 'Upload images for emotion detection', path: '/image_upload' },
    { name: 'Historical Analytics', icon: PieChart, description: 'Analyze trends from past detection sessions', path: '/historical_analytics' },
    { name: 'Reports', icon: FileText, description: 'Generate and view detailed emotion detection reports', path: '/report' },
    { name: 'Settings', icon: Settings, description: 'Customize system settings and preferences', path: '/settings' },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Face Emotion Detection System</h1>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Link
              key={page.name}
              href={page.path}
              className="block bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{page.name}</h2>
                  <page.icon className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-gray-400">{page.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; 2023 Face Emotion Detection System. All rights reserved.</p>
      </footer>
    </div>
  )
}
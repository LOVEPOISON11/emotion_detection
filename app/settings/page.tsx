'use client'

import { useState } from 'react'
import { Camera, Sliders, Lock, Globe, Save, RefreshCw } from 'lucide-react'

export default function SettingsAndCustomization() {
  const [cameraQuality, setCameraQuality] = useState(720)
  const [detectionSensitivity, setDetectionSensitivity] = useState(5)
  const [reportFrequency, setReportFrequency] = useState('weekly')
  const [dataRetention, setDataRetention] = useState(30)
  const [language, setLanguage] = useState('en')
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState('medium')

  const handleSaveSettings = () => {
    // In a real application, this would save the settings to a backend or local storage
    alert('Settings saved successfully!')
  }

  const handleResetSettings = () => {
    setCameraQuality(720)
    setDetectionSensitivity(5)
    setReportFrequency('weekly')
    setDataRetention(30)
    setLanguage('en')
    setHighContrast(false)
    setFontSize('medium')
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Settings and Customization</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Camera className="mr-2" />
              Camera and Image Quality
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="camera-quality" className="block text-sm font-medium text-gray-400 mb-1">
                  Camera Quality
                </label>
                <select
                  id="camera-quality"
                  className="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={cameraQuality}
                  onChange={(e) => setCameraQuality(Number(e.target.value))}
                >
                  <option value={480}>480p</option>
                  <option value={720}>720p</option>
                  <option value={1080}>1080p</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Sliders className="mr-2" />
              Detection Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="detection-sensitivity" className="block text-sm font-medium text-gray-400 mb-1">
                  Detection Sensitivity (1-10)
                </label>
                <input
                  type="range"
                  id="detection-sensitivity"
                  min="1"
                  max="10"
                  value={detectionSensitivity}
                  onChange={(e) => setDetectionSensitivity(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-center mt-2">{detectionSensitivity}</div>
              </div>
              <div>
                <label htmlFor="report-frequency" className="block text-sm font-medium text-gray-400 mb-1">
                  Report Generation Frequency
                </label>
                <select
                  id="report-frequency"
                  className="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={reportFrequency}
                  onChange={(e) => setReportFrequency(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Lock className="mr-2" />
              Privacy and Data Retention
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="data-retention" className="block text-sm font-medium text-gray-400 mb-1">
                  Data Retention Period (days)
                </label>
                <input
                  type="number"
                  id="data-retention"
                  min="1"
                  max="365"
                  value={dataRetention}
                  onChange={(e) => setDataRetention(Number(e.target.value))}
                  className="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymize-data"
                  className="rounded bg-gray-800 border-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="anonymize-data" className="ml-2 block text-sm text-gray-400">
                  Anonymize collected data
                </label>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Globe className="mr-2" />
              Language and Display
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-400 mb-1">
                  Language
                </label>
                <select
                  id="language"
                  className="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="high-contrast"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="rounded bg-gray-800 border-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="high-contrast" className="ml-2 block text-sm text-gray-400">
                  High contrast mode
                </label>
              </div>
              <div>
                <label htmlFor="font-size" className="block text-sm font-medium text-gray-400 mb-1">
                  Font Size
                </label>
                <select
                  id="font-size"
                  className="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={handleResetSettings}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center"
        >
          <RefreshCw className="mr-2" />
          Reset to Defaults
        </button>
        <button
          onClick={handleSaveSettings}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center"
        >
          <Save className="mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  )
}
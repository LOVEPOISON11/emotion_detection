'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Calendar, Download, Mail, Printer, ChevronDown } from 'lucide-react'

interface ReportOption {
  id: string
  name: string
  description: string
}

const reportOptions: ReportOption[] = [
  { id: 'summary', name: 'Summary Report', description: 'Overview of emotion detections and key statistics' },
  { id: 'detailed', name: 'Detailed Report', description: 'In-depth analysis of all emotion detections' },
  { id: 'trends', name: 'Trends Report', description: 'Emotion trends and patterns over time' },
  { id: 'custom', name: 'Custom Report', description: 'Select specific data points and metrics' },
]

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReport, setGeneratedReport] = useState<string | null>(null)

  const router = useRouter()

  const handleGenerateReport = () => {
    if (!selectedReport || !dateRange.start || !dateRange.end) {
      alert('Please select a report type and date range')
      return
    }
    setIsGenerating(true)
    // Simulating report generation
    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedReport(`${selectedReport}_report_${dateRange.start}_to_${dateRange.end}.pdf`)
    }, 2000)
  }

  const handleDownload = () => {
    if (generatedReport) {
      // In a real application, this would trigger the download of the actual report file
      alert(`Downloading ${generatedReport}`)
    }
  }

  const handleEmail = () => {
    if (generatedReport) {
      // In a real application, this would open an email client or modal to send the report
      alert(`Emailing ${generatedReport}`)
    }
  }

  const handlePrint = () => {
    if (generatedReport) {
      // In a real application, this would open the print dialog
      alert(`Printing ${generatedReport}`)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <button
        className="mb-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
        onClick={() => router.push('/dashboard')}
      >
        Back to Main Page
      </button>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Generate Report</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="report-type" className="block text-sm font-medium text-gray-400 mb-1">
                  Report Type
                </label>
                <div className="relative">
                  <select
                    id="report-type"
                    className="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedReport || ''}
                    onChange={(e) => setSelectedReport(e.target.value)}
                  >
                    <option value="">Select a report type</option>
                    {reportOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="date-range" className="block text-sm font-medium text-gray-400 mb-1">
                  Date Range
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    id="date-range-start"
                    className="bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                  <span>to</span>
                  <input
                    type="date"
                    id="date-range-end"
                    className="bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  />
                </div>
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center justify-center"
                onClick={handleGenerateReport}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    <FileText className="mr-2" />
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>
          {selectedReport && (
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                {reportOptions.find((option) => option.id === selectedReport)?.name}
              </h3>
              <p className="text-gray-400">
                {reportOptions.find((option) => option.id === selectedReport)?.description}
              </p>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
            <ul className="space-y-2">
              {[
                'summary_report_2023-05-01_to_2023-05-31.pdf',
                'detailed_report_2023-04-01_to_2023-04-30.pdf',
                'trends_report_2023-Q1.pdf',
              ].map((report, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-2 px-4 bg-gray-800 rounded-lg"
                >
                  <span className="truncate">{report}</span>
                  <button
                    className="text-blue-400 hover:text-blue-300"
                    onClick={() => setGeneratedReport(report)}
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {generatedReport && (
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Generated Report</h2>
              <p className="mb-4 text-gray-400">{generatedReport}</p>
              <div className="flex space-x-2">
                <button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center justify-center"
                  onClick={handleDownload}
                >
                  <Download className="mr-2" />
                  Download
                </button>
                <button
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center justify-center"
                  onClick={handleEmail}
                >
                  <Mail className="mr-2" />
                  Email
                </button>
                <button
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center justify-center"
                  onClick={handlePrint}
                >
                  <Printer className="mr-2" />
                  Print
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

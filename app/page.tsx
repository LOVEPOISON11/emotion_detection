import Link from 'next/link'
import { ArrowRight, Smile, BarChart, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">FaceEmo</div>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Login</Link>
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Unlock the Power of Emotion Recognition
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl">
          Discover insights from facial expressions with our advanced AI-powered emotion detection system.
        </p>
        <Button size="lg" asChild>
          <Link href="/dashboard">
            Explore the System
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<Smile className="h-12 w-12 text-blue-500" />}
            title="Accurate Detection"
            description="Our AI model provides highly accurate emotion recognition in real-time."
          />
          <FeatureCard
            icon={<BarChart className="h-12 w-12 text-green-500" />}
            title="Insightful Analytics"
            description="Gain valuable insights with our comprehensive emotion analytics dashboard."
          />
          <FeatureCard
            icon={<Lock className="h-12 w-12 text-purple-500" />}
            title="Privacy Focused"
            description="Your data security is our priority. All processing is done with utmost privacy."
          />
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-500">
        <p>&copy; 2023 FaceEmo. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex justify-center mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
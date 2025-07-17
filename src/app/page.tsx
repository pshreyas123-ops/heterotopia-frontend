import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Heterotopia</span>
            </div>
            
            {/* Navigation links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Connect NGOs with Funders for Greater Impact
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Streamline partnerships between organizations and funders through intelligent matching and discovery
          </p>

          {/* User Type Selection */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Link href="/dashboard" className="group">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent group-hover:border-blue-200">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-4">I'm an NGO</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li>• Get discovered by funders</li>
                  <li>• Showcase your impact</li>
                  <li>• Connect with aligned funders</li>
                </ul>
              </div>
            </Link>

            <Link href="/dashboard" className="group">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent group-hover:border-green-200">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-4">I'm a Funder</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li>• Find aligned NGOs quickly</li>
                  <li>• Streamlined matching</li>
                  <li>• Easy contact and evaluation</li>
                </ul>
              </div>
            </Link>

            <Link href="/dashboard" className="group">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent group-hover:border-orange-200">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-4">I'm a Consultant</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li>• Manage multiple NGO profiles</li>
                  <li>• Bulk operations</li>
                  <li>• Streamlined workflows</li>
                </ul>
              </div>
            </Link>
          </div>

          <Button size="lg" asChild>
            <Link href="/dashboard">Start Your Journey</Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link href="/about" className="hover:text-gray-900">About</Link>
              <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms</Link>
              <Link href="/contact" className="hover:text-gray-900">Contact</Link>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Language:</span>
              <select className="text-sm border rounded px-2 py-1">
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
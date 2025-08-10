import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Heterotopia</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Heterotopia</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building the future of NGO-funder partnerships through AI-powered matching and transparent connections.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Heterotopia exists to bridge the gap between NGOs doing incredible work and funders looking to make meaningful impact. 
              We believe that the right partnerships can transform communities and solve the world's most pressing challenges.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our AI-powered platform goes beyond simple keyword matching to understand the deeper context of your mission, 
              values, and impact goals, connecting you with partners who truly align with your vision.
            </p>
          </CardContent>
        </Card>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-red-600">The Problem</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  NGOs spend 40% of their time searching for funding instead of doing their core work
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Funders struggle to find aligned organizations beyond their existing networks
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Traditional databases rely on outdated keyword matching
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Lack of transparency in funding decisions and criteria
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-600">Our Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  AI-powered semantic matching that understands context and mission alignment
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Transparent matching explanations so you know why partnerships make sense
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Streamlined discovery process that saves time for both NGOs and funders
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Focus on building long-term, meaningful partnerships
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Values</CardTitle>
            <CardDescription>The principles that guide everything we do</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-gray-600">
                  We believe in open, honest communication and clear explanations for all our matching decisions.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2">Impact Focus</h3>
                <p className="text-sm text-gray-600">
                  Every feature we build is designed to maximize social impact and meaningful partnerships.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-gray-600">
                  We leverage cutting-edge AI technology to solve age-old problems in the nonprofit sector.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Team</CardTitle>
            <CardDescription>Passionate individuals working to transform nonprofit partnerships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👨‍💻</span>
                </div>
                <h3 className="font-semibold">Development Team</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Experienced engineers and AI specialists building the next generation of nonprofit technology.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="font-semibold">Impact Advisors</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Nonprofit leaders and funding experts who guide our product development and strategy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Partnerships?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of NGOs and funders who are already using Heterotopia to build meaningful, 
            impactful partnerships that change the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/auth/register">Get Started Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms</Link>
              <Link href="/contact" className="hover:text-gray-900">Contact</Link>
            </div>
            <div className="text-sm text-gray-600">
              © 2024 Heterotopia. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
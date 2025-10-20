import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="gradient-card p-12 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-primary-700 mb-4">
            AI-Powered Therapy Activity Marketplace
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover, personalize, and share therapy activities matched to individual treatment plans
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/activities/upload" className="btn-primary">
              Upload Activity
            </Link>
            <Link href="/patients/upload" className="btn-secondary">
              Upload Patient Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="card bg-gradient-to-br from-white to-velvet-light/30">
          <h2 className="text-xl font-semibold mb-4 text-primary-700">Personalized Activities</h2>
          <p className="text-gray-600">
            Match therapy activities to individual treatment plans and patient preferences using AI.
          </p>
        </div>
        
        <div className="card bg-gradient-to-br from-white to-velvet-light/30">
          <h2 className="text-xl font-semibold mb-4 text-primary-700">Collaborative Platform</h2>
          <p className="text-gray-600">
            Share and discover effective therapy activities created by therapists worldwide.
          </p>
        </div>
        
        <div className="card bg-gradient-to-br from-white to-velvet-light/30">
          <h2 className="text-xl font-semibold mb-4 text-primary-700">Efficiency Boost</h2>
          <p className="text-gray-600">
            Save time and reduce workload by leveraging AI to find suitable activities.
          </p>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-primary-700 mb-4">
          How It Works
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold">1</span>
              </div>
              <h3 className="font-medium">Upload Activities</h3>
              <p className="text-sm text-gray-500">Share therapy activities with detailed tags</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold">2</span>
              </div>
              <h3 className="font-medium">Upload Patient Profiles</h3>
              <p className="text-sm text-gray-500">Add patient details and treatment goals</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold">3</span>
              </div>
              <h3 className="font-medium">Get Matched Activities</h3>
              <p className="text-sm text-gray-500">AI recommends personalized therapy activities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

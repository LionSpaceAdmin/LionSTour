export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Enterprise Solutions</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Tailored Israeli Experiences for Organizations
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            LionSTour Enterprise provides customized group experiences for corporations, 
            educational institutions, and organizations seeking meaningful connections with Israel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Groups</h3>
            <p className="text-gray-600">
              Team building experiences with veteran guides and local communities
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Educational Tours</h3>
            <p className="text-gray-600">
              Academic programs with historical context and cultural immersion
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Itineraries</h3>
            <p className="text-gray-600">
              Personalized experiences designed for your organization&apos;s goals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
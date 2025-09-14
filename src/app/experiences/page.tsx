import { Map } from "@/components/ui/map";

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Experiences</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover authentic Israeli experiences with local veterans and diverse communities.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Featured Experiences</h2>
            
            <div className="bg-white rounded-lg shadow p-6 mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Jerusalem Old City Tour</h3>
              <p className="text-gray-600 mb-3">
                Explore the ancient streets with a veteran guide who knows every stone and story.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">📍 Jerusalem</span>
                <span className="mr-4">⏱️ 3 hours</span>
                <span>💰 $150</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tel Aviv Cultural Walk</h3>
              <p className="text-gray-600 mb-3">
                Discover the vibrant culture and diverse communities of modern Tel Aviv.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">📍 Tel Aviv</span>
                <span className="mr-4">⏱️ 2.5 hours</span>
                <span>💰 $120</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Explore Israel</h2>
            <Map 
              latitude={31.7767}
              longitude={35.2345}
              zoom={8}
              height="400px"
              className="rounded-lg shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
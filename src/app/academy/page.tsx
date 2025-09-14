export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">LionSTour Academy</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-600 mb-6">
            Learn about Israeli history, culture, and the stories of our veteran guides through our educational platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Historical Context</h3>
              <p className="text-gray-600">Understand the rich history of modern Israel</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cultural Insights</h3>
              <p className="text-gray-600">Explore diverse communities and traditions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
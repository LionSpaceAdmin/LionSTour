export default async function GuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Guide Profile</h1>
        <p className="text-lg text-gray-600 mb-4">
          Guide ID: {id}
        </p>
        <p className="text-lg text-gray-600">
          Meet our local guide and learn about their unique story and expertise.
        </p>
      </div>
    </div>
  );
}
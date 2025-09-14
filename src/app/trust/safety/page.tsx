export default function TrustSafetyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Trust & Safety</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment to Your Safety</h2>
            <p className="text-lg text-gray-600 mb-6">
              At LionSTour, your safety and security are our top priorities. We maintain the highest standards 
              of trust and safety throughout your Israeli experience.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety Measures</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>All guides are thoroughly vetted and background-checked</li>
              <li>Real-time safety monitoring and emergency support</li>
              <li>Comprehensive insurance coverage</li>
              <li>24/7 customer support</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Trust Standards</h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Verified veteran and community guide credentials</li>
              <li>Transparent pricing and booking policies</li>
              <li>Secure payment processing</li>
              <li>Privacy protection and data security</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
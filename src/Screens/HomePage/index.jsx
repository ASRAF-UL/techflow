// src/pages/Homepage.jsx
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Download, FileText, FileCode, Network } from 'lucide-react';
import FeatureCard from '../../components/FeatureCard';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
          <img src="techflow_logo.png" className="w-[25%] h-auto" />
          </div>
          <h2 className="text-4xl font-bold text-gray-700 mb-6 max-w-4xl leading-tight">
            Transform Natural Language into Professional Technical Documents
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-3xl">
            Streamline your documentation workflow with AI-powered solutions that instantly generate high-quality technical specifications, SRS documents, and system architectures.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            Try Tecflow Free <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<FileText className="w-8 h-8 text-blue-600" />}
            title="Technical Specification"
            description="Generate detailed technical specifications with structured formatting, system requirements, and implementation details."
          />
          <FeatureCard
            icon={<FileCode className="w-8 h-8 text-blue-600" />}
            title="Software Requirement Specification"
            description="Create comprehensive SRS documents with functional requirements, use cases, and acceptance criteria."
          />
          <FeatureCard
            icon={<Network className="w-8 h-8 text-blue-600" />}
            title="System Architecture"
            description="Design and document system architectures with diagrams, component descriptions, and data flow explanations."
          />
        </div>
      </div>

      {/* Free Documents Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Free AI Documents
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Simplify document creation using AI and download in multiple formats
            </p>
            <button 
              className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl"
              onClick={() => {
                alert("Template download functionality would be implemented here");
              }}
            >
              <Download className="w-5 h-5" />
              Download Free Templates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
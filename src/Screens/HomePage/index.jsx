// src/pages/Homepage.jsx
import {
  Mail,
  MessageSquare,
  FileText,
  Zap,
  Download,
  User,
} from "lucide-react";
import { useState } from "react";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("getting-started");
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create my first document?",
      answer:
        "Navigate to the Dashboard and click 'New Document'. Select your document type, enter your requirements, and let TecFlow generate your first draft.",
    },
    {
      question: "What document formats does TecFlow support?",
      answer:
        "TecFlow currently supports PDF, Word (.docx), and Markdown exports. More formats are coming soon.",
    },
    {
      question: "Is my data secure with TecFlow?",
      answer:
        "Absolutely. We use enterprise-grade encryption and never store your sensitive information. All document processing happens securely in your browser.",
    },
    {
      question: "Can I customize the document templates?",
      answer:
        "Yes! All templates are fully customizable. After generation, you can edit any section or save your modifications as a new template.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            TecFlow Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions or get in touch with our support
            team
          </p>
        </div>

        {/* Help Sections */}
        <div className="max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab("getting-started")}
              className={`px-6 py-3 font-medium ${
                activeTab === "getting-started"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Getting Started
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`px-6 py-3 font-medium ${
                activeTab === "features"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Features Guide
            </button>
            <button
              onClick={() => setActiveTab("troubleshooting")}
              className={`px-6 py-3 font-medium ${
                activeTab === "troubleshooting"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Troubleshooting
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-3 font-medium ${
                activeTab === "contact"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Contact Support
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            {activeTab === "getting-started" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-blue-600" />
                  Getting Started with TecFlow
                </h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      1. Create an Account
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Sign up using your email or Google account to access all
                      features.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      2. Choose Document Type
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Select from our templates: Technical Specs, SRS,
                      Architecture Diagrams, or start blank.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      3. Input Requirements
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Describe your project in natural language or use our
                      guided prompts.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      4. Generate & Refine
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Review the AI-generated document and make any necessary
                      edits.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      5. Export & Share
                    </h3>
                    <p className="text-gray-600 mt-1 flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      Download in your preferred format or share directly with
                      team members.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  Features Guide
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      Template Library
                    </h3>
                    <p className="text-gray-600">
                      Access our growing collection of industry-standard
                      templates for various technical documents.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      AI Suggestions
                    </h3>
                    <p className="text-gray-600">
                      Get intelligent recommendations for sections, terminology,
                      and formatting as you work.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      Collaboration Tools
                    </h3>
                    <p className="text-gray-600">
                      Share documents with team members and track changes in
                      real-time.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      Version History
                    </h3>
                    <p className="text-gray-600">
                      Access previous versions of your documents and restore if
                      needed.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "troubleshooting" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100"
                      >
                        <span className="font-medium text-gray-800">
                          {faq.question}
                        </span>
                        <span className="text-gray-500">
                          {expandedFAQ === index ? "−" : "+"}
                        </span>
                      </button>
                      {expandedFAQ === index && (
                        <div className="p-4 bg-white text-gray-600 border-t border-gray-200">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Our Support Team
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Support Options
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Mail className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Email Support
                          </h4>
                          <p className="text-gray-600">support@tecflow.com</p>
                          <p className="text-sm text-gray-500">
                            Typically responds within 4 hours
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <MessageSquare className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Live Chat
                          </h4>
                          <p className="text-gray-600">Available 9AM-6PM EST</p>
                          <p className="text-sm text-gray-500">
                            Click the chat icon in the bottom right
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <User className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Help Center
                          </h4>
                          <p className="text-gray-600">
                            Browse our knowledge base
                          </p>
                          <p className="text-sm text-gray-500">
                            100+ articles and tutorials
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <form className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="issue"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          What can we help with?
                        </label>
                        <select
                          id="issue"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option>Select an option</option>
                          <option>Account Issues</option>
                          <option>Document Generation</option>
                          <option>Billing Questions</option>
                          <option>Feature Request</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

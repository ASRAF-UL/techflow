import React, { useState } from 'react';
import axios from 'axios';
import { FileText, FileCode, Network, Download, ArrowRight, Brain, Send, Mic, Settings, Menu, Grid, Eye, Copy, Share2, ChevronRight, Clock, Star, Sparkles, ChevronLeft, Mail, Lock, X } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
      <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [prompt, setPrompt] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    console.log('Auth form submitted:', authForm);
    setCurrentPage('generate');
  };

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const callOpenAIWithBackoff = async (prompt, retries = 3, delay = 1000) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            { 
              role: "system", 
              content: "You are a technical documentation assistant. Generate professional, well-structured technical documentation based on the user's request. Use appropriate headings, bullet points, and clear explanations." 
            },
            { role: "user", content: prompt }
          ],
          max_tokens: 2000,
          temperature: 0.5,
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data.choices[0]?.message?.content || "No content generated";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('OpenAI API Error:', error.response?.data);
        setError(`API Error: ${error.response?.data?.error?.message || error.message}`);
      } else {
        console.error('Error:', error);
        setError('An unexpected error occurred');
      }
      
      if (retries > 0 && axios.isAxiosError(error) && error.response?.status === 429) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return callOpenAIWithBackoff(prompt, retries - 1, delay * 2);
      }
      
      throw error;
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    try {
      setIsGenerating(true);
      setShowPreview(true);
      setError('');
      setGeneratedContent('');
      
      const content = await callOpenAIWithBackoff(prompt);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Generation failed:', error);
      if (!error) {
        setError('Failed to generate content. Please try again later.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const LoginPage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
              TecFlow
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isRegistering ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600">
            {isRegistering 
              ? 'Join TecFlow to start creating AI-powered documents'
              : 'Sign in to access your AI documents'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                id="email"
                name="email"
                value={authForm.email}
                onChange={handleAuthChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                id="password"
                name="password"
                value={authForm.password}
                onChange={handleAuthChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          </div>

          {isRegistering && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={authForm.confirmPassword}
                  onChange={handleAuthChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {isRegistering ? 'Create Account' : 'Sign In'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
            {' '}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isRegistering ? 'Sign in' : 'Create one'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );

  if (currentPage === 'login') {
    return <LoginPage />;
  }

  if (currentPage === 'generate') {
    return (
      <div className="min-h-screen flex bg-gray-50">
        {/* Fixed Sidebar - Now with overflow-hidden */}
        <div 
          className={`${sidebarCollapsed ? 'w-16' : 'w-72'} 
          bg-white border-r border-gray-200 p-4 
          flex flex-col transition-all duration-300 ease-in-out 
          fixed h-full overflow-hidden`}
          style={{ width: sidebarCollapsed ? '4rem' : '18rem' }}
        >
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-4 top-8 bg-white border border-gray-200 rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-200 z-10"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          
          <div className="flex items-center gap-3 mb-8 px-2">
            <Brain className="w-8 h-8 text-blue-600 flex-shrink-0" />
            {!sidebarCollapsed && (
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">TecFlow</h1>
            )}
          </div>
          
          <button className={`flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-200 mb-6 ${sidebarCollapsed ? 'justify-center' : 'font-medium'}`}>
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && "New AI Document"}
          </button>

          {/* Scrollable area within sidebar */}
          <div className="flex-1 overflow-y-auto">
            {!sidebarCollapsed && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-3 px-2 flex items-center justify-between">
                    Starred
                    <Star className="w-4 h-4" />
                  </h2>
                  <div className="space-y-1">
                    <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      System Design Doc
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-3 px-2 flex items-center justify-between">
                    Recent
                    <Clock className="w-4 h-4" />
                  </h2>
                  <div className="space-y-1">
                    {['API Documentation', 'Technical Spec v2', 'Architecture Overview'].map((doc) => (
                      <button key={doc} className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        {doc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => setCurrentPage('home')}
            className={`mt-auto flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <Grid className="w-4 h-4" />
            {!sidebarCollapsed && "Back to Home"}
          </button>
        </div>

        {/* Main Content */}
        <div 
          className="flex-1 flex flex-col" 
          style={{ 
            marginLeft: sidebarCollapsed ? '4rem' : '18rem',
            width: sidebarCollapsed ? 'calc(100% - 4rem)' : 'calc(100% - 18rem)'
          }}
        >
          {/* Fixed Header */}
          <header 
            className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between fixed top-0 z-10" 
            style={{ 
              left: sidebarCollapsed ? '4rem' : '18rem',
              width: sidebarCollapsed ? 'calc(100% - 4rem)' : 'calc(100% - 18rem)'
            }}
          >
            <div className="flex items-center gap-4">
              <Menu className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">New Document</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentPage('login')}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Sign in
              </button>
            </div>
          </header>

          {/* Scrollable Main Content Area */}
          <div 
            className="flex-1 overflow-auto p-6" 
            style={{ 
              marginTop: '4rem',
              height: 'calc(100vh - 4rem)'
            }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                  AI-Powered Document Generation
                </h1>
                <p className="text-lg text-gray-600">
                  Transform your ideas into professional technical documentation in seconds.
                </p>
              </div>

              {error && !isGenerating && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                  {error}
                </div>
              )}

              {/* Example Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  "Create a technical specification for a social media app including database schema and API endpoints",
                  "Generate an API documentation template with authentication details and example requests",
                  "Design a system architecture document for an e-commerce platform with microservices",
                  "Draft a software requirements specification for a mobile banking application"
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => {
                      setPrompt(example);
                      setError('');
                    }}
                    className="p-4 text-left border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">Try this prompt</span>
                    </div>
                    <p className="text-gray-700">{example}</p>
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-8">
                <div className="p-6">
                  <textarea
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value);
                      setError('');
                    }}
                    placeholder="Describe your document requirements in detail. Be specific about the type of document, technologies involved, and any special requirements..."
                    className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 resize-none text-gray-700 min-h-[120px]"
                    rows={5}
                  />
                  <div className="flex justify-end items-center gap-2 mt-4">
                    <button 
                      type="button"
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => {
                        alert("Voice input would be implemented here");
                      }}
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-lg ${
                        prompt && !isGenerating
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-100 text-gray-400'
                      } transition-colors font-medium`}
                    >
                      {isGenerating ? 'Generating...' : 'Generate'}
                      {!isGenerating && <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Preview Section */}
                {showPreview && (
                  <div className="border-t border-gray-200">
                    <div className="p-4 flex items-center justify-between bg-gray-50 rounded-t-lg">
                      <h3 className="font-medium text-gray-900">Preview</h3>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(generatedContent);
                          }}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Copy to clipboard"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Share document"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Download document"
                          onClick={() => {
                            const blob = new Blob([generatedContent], { type: 'text/markdown' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'document.md';
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        {isGenerating ? (
                          <div className="animate-pulse space-y-4">
                            {[...Array(8)].map((_, i) => (
                              <div 
                                key={i}
                                className={`h-4 bg-gray-200 rounded ${i % 2 ? 'w-3/4' : 'w-5/6'}`}
                              ></div>
                            ))}
                          </div>
                        ) : generatedContent ? (
                          <div className="prose max-w-none">
                            {generatedContent.split('\n\n').map((paragraph, index) => (
                              <p key={index}>{paragraph}</p>
                            ))}
                          </div>
                        ) : (
                          <div className="text-gray-500 text-center py-8">
                            Your generated content will appear here
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
              TecFlow
            </h1>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 max-w-3xl leading-tight">
            Transform Natural Language into Professional Technical Documents
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">
            Streamline your documentation workflow with AI-powered solutions that instantly generate high-quality technical specifications, SRS documents, and system architectures.
          </p>
          <button 
            onClick={() => setCurrentPage('generate')}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            Try TecFlow Free <ArrowRight className="w-5 h-5" />
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
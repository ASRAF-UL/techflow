import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Menu,
  Sparkles,
  Star,
  Clock,
  FileText,
  FileCode,
  Network,
  ArrowRight,
  Wand2,
  Copy,
  Share2,
  Download,
  Edit,
  Save,
  X,
} from "lucide-react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { useLocation } from "react-router-dom";

const documentTypes = [
  {
    id: "tech-spec",
    title: "Technical Specification",
    icon: FileText,
    description:
      "Generate detailed technical specifications with structured formatting and clarity.",
    color: "bg-blue-500",
    systemPrompt: `You are a technical documentation assistant. Generate a professional Technical Specification document with the following sections:
    
1. Title Page:
   - Document Title
   - Version
   - Date
   - Author/Team

2. Introduction:
   - Purpose
   - Scope
   - Definitions/Acronyms

3. Requirements:
   - Functional Requirements
   - Non-Functional Requirements

4. System Architecture:
   - Component Diagram
   - Data Flow

5. Interfaces:
   - API Specifications
   - UI Specifications

6. Data Models:
   - Database Schema
   - Entity Relationships

Format using Markdown:
- # for main headings
- ## for section headings
- ### for subsections
- Bullet points for lists
- [DIAGRAM] placeholders where needed`,
  },
  {
    id: "srs",
    title: "Software Requirement Specification",
    icon: FileCode,
    description:
      "Create comprehensive SRS documents outlining system functionalities and requirements.",
    color: "bg-purple-500",
    systemPrompt: `You are a technical documentation assistant. Generate a professional Software Requirements Specification (SRS) document with the following sections:
    
1. Title Page:
   - Document Title
   - Version
   - Date
   - Author/Team

2. Introduction:
   - Purpose
   - Document Conventions
   - Intended Audience
   - Product Scope

3. Overall Description:
   - Product Perspective
   - Product Functions
   - User Characteristics
   - Operating Environment

4. System Features:
   - Feature 1 Description
   - Feature 2 Description

5. External Interface Requirements:
   - User Interfaces
   - Hardware Interfaces
   - Software Interfaces
   - Communications Interfaces

6. Non-Functional Requirements:
   - Performance Requirements
   - Security Requirements
   - Quality Attributes

Format using Markdown with clear headings and bullet points.`,
  },
  {
    id: "architecture",
    title: "System Architecture",
    icon: Network,
    description:
      "Design and document system architectures with clear diagrams and structured descriptions.",
    color: "bg-green-500",
    systemPrompt: `You are a technical documentation assistant. Generate a professional System Architecture document with the following sections:
    
1. Title Page:
   - Document Title
   - Version
   - Date
   - Author/Team

2. Introduction:
   - Purpose
   - Scope
   - Definitions

3. Architectural Goals:
   - Key Requirements
   - Quality Attributes
   - Constraints

4. System Overview:
   - High-Level Diagram
   - Component Interactions

5. Detailed Architecture:
   - Component 1 Description
   - Component 2 Description
   - Data Flow
   - Interfaces

6. Deployment Architecture:
   - Infrastructure Diagram
   - Deployment Scenarios

7. Cross-Cutting Concerns:
   - Security
   - Performance
   - Scalability

Use Markdown formatting with [DIAGRAM] placeholders for visual elements.`,
  },
];

const GeneratePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const selectedDocument = documentTypes.find(
    (type) => type.id === selectedType
  );
  const location = useLocation();
  const loginType = location.state?.loginType || "guest";

  useEffect(() => {
    if (generatedContent) {
      setEditedContent(generatedContent);
    }
  }, [generatedContent]);

  const callOpenAIWithBackoff = async (prompt, retries = 3, delay = 1000) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                selectedDocument?.systemPrompt ||
                "Generate professional technical documentation.",
            },
            {
              role: "user",
              content: `Create a ${selectedDocument?.title} document with the following requirements:\n\n${prompt}\n\nPlease include all relevant sections and use proper technical documentation formatting.`,
            },
          ],
          max_tokens: 2000,
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return (
        response.data.choices[0]?.message?.content || "No content generated"
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("OpenAI API Error:", error.response?.data);
        setError(
          `API Error: ${error.response?.data?.error?.message || error.message}`
        );
      } else {
        console.error("Error:", error);
        setError("An unexpected error occurred");
      }

      if (
        retries > 0 &&
        axios.isAxiosError(error) &&
        error.response?.status === 429
      ) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return callOpenAIWithBackoff(prompt, retries - 1, delay * 2);
      }

      throw error;
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }
    if (!selectedType) {
      setError("Please select a document type");
      return;
    }

    try {
      setIsGenerating(true);
      setShowPreview(true);
      setError("");
      setGeneratedContent("");

      const content = await callOpenAIWithBackoff(prompt);
      setGeneratedContent(content);
    } catch (error) {
      console.error("Generation failed:", error);
      if (!error) {
        setError("Failed to generate content. Please try again later.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(isEditing ? editedContent : generatedContent);
  };

  const handleDownloadMarkdown = () => {
    const fullDocument = `
      ${selectedDocument?.title || "Generated Document"}
      ============================================
      
      Generated: ${new Date().toLocaleDateString()}
      Author: TechFlow AI
      
      ${isEditing ? editedContent : generatedContent}
      
      ---
      Document generated by TechFlow AI - ${new Date().toLocaleString()}
    `;

    const blob = new Blob([fullDocument], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedDocument?.title || "document"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generatePDF = () => {
    const contentToUse = isEditing ? editedContent : generatedContent;
    if (!contentToUse) return;

    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });

    // Set default font
    doc.setFont("helvetica");
    doc.setFontSize(11);

    // Title Page
    doc.setFontSize(24);
    doc.setTextColor(15, 23, 42);
    doc.text(selectedDocument?.title || "Generated Document", 105, 40, {
      align: "center",
    });

    doc.setFontSize(16);
    doc.text(`Version: 1.0`, 105, 60, { align: "center" });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 70, {
      align: "center",
    });
    doc.text("Generated by TechFlow AI", 105, 80, { align: "center" });

    // Add new page for content
    doc.addPage();

    // Content formatting
    const leftMargin = 15;
    const rightMargin = 195;
    const pageWidth = rightMargin - leftMargin;
    let yPosition = 20;
    const lineHeight = 7;
    const sectionGap = 10;

    const processLine = (line) => {
      if (yPosition > 270) {
        // Near bottom of page
        doc.addPage();
        yPosition = 20;
      }

      // Skip empty lines
      if (line.trim() === "") {
        yPosition += lineHeight / 2;
        return;
      }

      // Handle headings
      if (line.startsWith("# ")) {
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text(line.substring(2), leftMargin, yPosition);
        yPosition += lineHeight + 2;
        doc.setDrawColor(200, 200, 200);
        doc.line(leftMargin, yPosition, rightMargin, yPosition);
        yPosition += sectionGap;
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        return;
      }

      if (line.startsWith("## ")) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(line.substring(3), leftMargin, yPosition);
        yPosition += lineHeight + sectionGap / 2;
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        return;
      }

      if (line.startsWith("### ")) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(line.substring(4), leftMargin, yPosition);
        yPosition += lineHeight;
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        return;
      }

      // Handle lists
      if (line.startsWith("- ") || line.startsWith("* ")) {
        doc.setFontSize(11);
        doc.text("• " + line.substring(2), leftMargin + 5, yPosition);
        yPosition += lineHeight;
        return;
      }

      // Handle diagram placeholders
      if (line.includes("[DIAGRAM]")) {
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("[Diagram placeholder]", leftMargin, yPosition);
        yPosition += lineHeight;
        doc.rect(leftMargin, yPosition, pageWidth, 40, "S");
        doc.setTextColor(15, 23, 42);
        yPosition += 45;
        return;
      }

      // Handle regular text with word wrap
      doc.setFontSize(11);
      const splitText = doc.splitTextToSize(line, pageWidth);
      doc.text(splitText, leftMargin, yPosition);
      yPosition += lineHeight * splitText.length;
    };

    // Process all content lines
    contentToUse.split("\n").forEach((line) => {
      processLine(line);
    });

    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Page ${i} of ${pageCount}`, 105, 287, { align: "center" });
    }

    // Save the PDF
    doc.save(`${selectedDocument?.title || "document"}.pdf`);
  };

  const handleSaveEdit = () => {
    setGeneratedContent(editedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(generatedContent);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div
        className={`${sidebarCollapsed ? "w-18" : "w-72"} 
        bg-white border-r border-gray-200 p-4 
        flex flex-col transition-all duration-300 ease-in-out 
        fixed h-full overflow-hidden`}
        style={{ width: sidebarCollapsed ? "4.5rem" : "18rem" }}
      >
        <div
          className={`flex items-center gap-3 mb-8 px-2 w-full ${
            sidebarCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!sidebarCollapsed && (
            <img
              src="techflow_logo.png"
              className="w-[80%] h-auto"
              alt="TechFlow Logo"
            />
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="bg-white border border-gray-200 rounded-full hover:bg-blue-100 p-2 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Menu
              className={`w-5 h-5 text-gray-500 ${
                sidebarCollapsed ? "rotate-90" : ""
              }`}
            />
          </button>
        </div>

        <button
          className={`flex items-center gap-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-200 mb-6 ${
            sidebarCollapsed
              ? "justify-center w-full px-4 py-3"
              : "font-medium px-4 py-3"
          }`}
        >
          <Sparkles className="w-4 h-4 flex-shrink-0" />
          {!sidebarCollapsed && "New AI Document"}
        </button>

        <div className="flex-1 overflow-y-auto">
          {!sidebarCollapsed && (
            <div className="space-y-6">
              {loginType === "guest" ? (
                ""
              ) : (
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
              )}

              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-3 px-2 flex items-center justify-between">
                  Recent
                  <Clock className="w-4 h-4" />
                </h2>
                {loginType === "guest" ? (
                  <div className="space-y-1">
                    <div className="bg-gray-300 rounded-xl shadow-sm p-4 max-w-sm w-full space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-lg font-semibold text-gray-900">
                          Sign in to start saving your chats
                        </h2>
                        <p className="text-sm text-gray-600">
                          Once you're signed in, you can access your recent
                          chats here.
                        </p>
                      </div>

                      <button
                        className="w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => navigate("/login")}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {[
                      "API Documentation",
                      "Technical Spec v2",
                      "Architecture Overview",
                    ].map((doc) => (
                      <button
                        key={doc}
                        className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {doc}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4 mt-auto">
          <div
            className={`flex items-center ${
              sidebarCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!sidebarCollapsed ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    U
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      User Name
                    </p>
                    <p className="text-xs text-gray-500">user@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Settings className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                U
              </div>
            )}
          </div>

          {!sidebarCollapsed && loginType === "guest" ? (
            <button className="w-full mt-3 text-xs text-blue-600 hover:underline text-left">
              Add account
            </button>
          ) : ""}
        </div>
      </div>

      <div
        className="flex-1 flex flex-col"
        style={{
          marginLeft: sidebarCollapsed ? "4.5rem" : "18rem",
          width: sidebarCollapsed
            ? "calc(100% - 4.5rem)"
            : "calc(100% - 18rem)",
        }}
      >
        <header
          className="h-16 bg-white px-6 flex items-center justify-between fixed top-0 z-10"
          style={{
            left: sidebarCollapsed ? "4.5rem" : "18rem",
            width: sidebarCollapsed
              ? "calc(100% - 4.5rem)"
              : "calc(100% - 18rem)",
          }}
        >
          <div className="flex items-center gap-4">
            {sidebarCollapsed && (
              <img
                src="techflow_logo.png"
                className="w-[11%] h-auto"
                alt="TechFlow Logo"
              />
            )}
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            {loginType === "guest" ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white h-10 px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Sign in
              </button>
            ) : (
              ""
            )}
          </div>
        </header>

        <div
          className="flex-1 overflow-auto p-6"
          style={{
            marginTop: "4.5rem",
            height: "calc(100vh - 4.5rem)",
          }}
        >
          <div className="max-w-[70%] mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                AI-Powered Document Generation
              </h1>
              <p className="text-lg text-gray-600">
                Transform your ideas into professional technical documentation
                in seconds.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {documentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`relative p-6 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${
                    selectedType === type.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className={`inline-flex p-3 rounded-lg ${type.color}`}>
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {type.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {type.description}
                  </p>
                  <ArrowRight
                    className={`absolute bottom-4 right-4 h-5 w-5 transition-opacity duration-300 ${
                      selectedType === type.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              ))}
            </div>

            {selectedType && (
              <div className="bg-transparent flex flex-col gap-4 rounded-xl">
                <div className="bg-white rounded-xl shadow-md p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`p-2 rounded-lg ${selectedDocument?.color}`}
                    >
                      <selectedDocument.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Generate {selectedDocument?.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your requirements in natural language..."
                        className="w-full min-h-20 p-4 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:border-transparent bg-gray-50 placeholder-gray-400 text-gray-600 transition-all duration-200"
                      />
                      <div className="absolute right-4 bottom-4 flex items-center gap-2 text-sm text-gray-400">
                        <Wand2 className="h-4 w-4" />
                        AI-Powered
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        Your document will be generated in PDF format
                      </div>
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className={`inline-flex items-center px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 ${
                          isGenerating || !prompt.trim()
                            ? "bg-gray-400 cursor-not-allowed"
                            : selectedDocument?.color
                        } hover:opacity-90`}
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Download className="h-5 w-5 mr-2" />
                            Generate Document
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {showPreview && (
                  <div className="border border-gray-200 rounded-xl">
                    <div className="p-4 flex items-center justify-between bg-gray-50 rounded-t-lg">
                      <h3 className="font-medium text-gray-900">
                        {selectedDocument?.title} Preview
                      </h3>
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Save changes"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Cancel editing"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setIsEditing(true)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit document"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCopyToClipboard}
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
                              title="Download as Markdown"
                              onClick={handleDownloadMarkdown}
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Download as PDF"
                              onClick={generatePDF}
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      {isGenerating ? (
                        <div className="animate-pulse space-y-4">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-4 bg-gray-200 rounded ${
                                i % 2 ? "w-3/4" : "w-5/6"
                              }`}
                            ></div>
                          ))}
                        </div>
                      ) : generatedContent ? (
                        isEditing ? (
                          <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full min-h-[500px] p-4 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:border-transparent bg-white placeholder-gray-400 text-gray-600 transition-all duration-200 font-mono text-sm"
                          />
                        ) : (
                          <div
                            className={`prose max-w-none ${
                              selectedType === "tech-spec"
                                ? "prose-blue"
                                : selectedType === "srs"
                                ? "prose-purple"
                                : "prose-green"
                            }`}
                          >
                            <div className="p-6 border border-gray-200 rounded-lg">
                              {generatedContent
                                .split("\n")
                                .map((line, index) => {
                                  if (line.startsWith("# ")) {
                                    return (
                                      <h1
                                        key={index}
                                        className="text-2xl font-bold mb-4 border-b pb-2"
                                      >
                                        {line.substring(2)}
                                      </h1>
                                    );
                                  } else if (line.startsWith("## ")) {
                                    return (
                                      <h2
                                        key={index}
                                        className="text-xl font-semibold mt-6 mb-3"
                                      >
                                        {line.substring(3)}
                                      </h2>
                                    );
                                  } else if (line.startsWith("### ")) {
                                    return (
                                      <h3
                                        key={index}
                                        className="text-lg font-medium mt-4 mb-2"
                                      >
                                        {line.substring(4)}
                                      </h3>
                                    );
                                  } else if (
                                    line.startsWith("- ") ||
                                    line.startsWith("* ")
                                  ) {
                                    return (
                                      <ul
                                        key={index}
                                        className="list-disc pl-5 my-2"
                                      >
                                        <li>{line.substring(2)}</li>
                                      </ul>
                                    );
                                  } else if (line.includes("[DIAGRAM]")) {
                                    return (
                                      <div
                                        key={index}
                                        className="my-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center"
                                      >
                                        <p className="text-gray-500 text-sm">
                                          [Diagram:{" "}
                                          {line.replace("[DIAGRAM]", "")}]
                                        </p>
                                      </div>
                                    );
                                  } else if (line.trim() === "") {
                                    return <br key={index} />;
                                  } else {
                                    return (
                                      <p
                                        key={index}
                                        className="my-3 leading-relaxed"
                                      >
                                        {line}
                                      </p>
                                    );
                                  }
                                })}
                              <div className="mt-8 pt-4 border-t text-sm text-gray-500 text-center">
                                Generated by TechFlow AI •{" "}
                                {new Date().toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="text-gray-500 text-center py-8">
                          Your generated content will appear here
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;

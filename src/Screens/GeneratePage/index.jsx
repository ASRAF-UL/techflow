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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import {
  resetChats,
  setCurrentChat,
  setChats,
} from "../../features/chats/chatSlice";
import {
  fetchChats,
  createNewChat,
  editChat,
} from "../../features/chats/chatThunks";

const documentTypes = [
  {
    id: "tech-spec",
    title: "Technical Specification",
    icon: FileText,
    description:
      "Generate detailed technical specifications with structured formatting and clarity.",
    color: "bg-blue-500",
    systemPrompt: `You are a senior technical writer creating a comprehensive Technical Specification document. Follow these guidelines:

1. DOCUMENT STRUCTURE:
   - Title Page (Title, Version, Date, Author/Team, Status, Approvers)
   - Revision History (Version, Date, Author, Changes)
   - Table of Contents
   - Detailed Introduction (Purpose, Scope, References, Definitions/Acronyms)
   - Comprehensive System Overview
   - Detailed Functional Requirements (with priority levels)
   - Non-Functional Requirements (Performance, Security, Scalability, etc.)
   - System Architecture (Detailed Components, Interactions)
   - Data Models (ER Diagrams, Schema Definitions)
   - Interfaces (API Specifications, UI Specifications)
   - Error Handling
   - Deployment Considerations
   - Appendices (Glossary, References, Supporting Materials)

2. WRITING GUIDELINES:
   - Be extremely thorough and precise
   - Include technical details for all components
   - Provide examples for complex concepts
   - Use consistent terminology
   - Number all requirements (FR-001, NFR-001, etc.)
   - Include diagrams where needed (marked as [DIAGRAM])
   - Add implementation notes where applicable
   - Specify constraints and assumptions
   - Include validation criteria for requirements

3. FORMATTING:
   - Use Markdown with clear hierarchy
   - # for main sections
   - ## for subsections
   - ### for sub-subsections
   - Bullet points for lists
   - Tables for complex data
   - Code blocks for technical examples
   - [DIAGRAM] placeholders with descriptions

4. LENGTH:
   - Minimum 2000 words
   - Comprehensive coverage of all aspects
   - No placeholder text - all content must be specific and actionable`,
  },
  {
    id: "srs",
    title: "Software Requirement Specification",
    icon: FileCode,
    description:
      "Create comprehensive SRS documents outlining system functionalities and requirements.",
    color: "bg-purple-500",
    systemPrompt: `You are a senior software engineer creating a detailed Software Requirements Specification document. Follow these guidelines:

1. DOCUMENT STRUCTURE:
   - Title Page (Document Title, Version, Date, Author/Team)
   - Revision History Table
   - Table of Contents
   - Comprehensive Introduction (Purpose, Scope, Definitions, References)
   - Overall Description (Product Perspective, Functions, User Characteristics)
   - System Features (Detailed Feature Descriptions with Use Cases)
   - External Interface Requirements (UI, Hardware, Software, Communication)
   - Non-Functional Requirements (Performance, Safety, Security, etc.)
   - System Properties (Reliability, Availability, Maintainability)
   - Business Rules
   - User Documentation
   - Appendices (Supporting Information)

2. CONTENT REQUIREMENTS:
   - Each requirement must have:
     * Unique ID (e.g., FR-001)
     * Detailed description
     * Priority level (High/Medium/Low)
     * Verification method
     * Source/reference
     * Example scenarios
   - Include at least 5-10 detailed use cases
   - Provide traceability matrix for requirements
   - Include security requirements section
   - Add performance metrics where applicable

3. FORMATTING:
   - Use Markdown with hierarchy
   - Tables for requirement specifications
   - Code blocks for interface examples
   - [DIAGRAM] placeholders for UML diagrams
   - Consistent numbering throughout

4. DETAIL LEVEL:
   - Minimum 2500 words
   - Each requirement must be testable
   - No ambiguous language
   - Technical precision required`,
  },
  {
    id: "architecture",
    title: "System Architecture",
    icon: Network,
    description:
      "Design and document system architectures with clear diagrams and structured descriptions.",
    color: "bg-green-500",
    systemPrompt: `You are a solutions architect creating a comprehensive System Architecture document. Follow these guidelines:

1. DOCUMENT STRUCTURE:
   - Title Page (Document Title, Version, Date, Architect/Team)
   - Revision History
   - Executive Summary
   - Architecture Goals and Constraints
   - System Context Diagram
   - Detailed Component Architecture
   - Data Architecture (Flows, Storage, Processing)
   - Integration Architecture
   - Deployment Architecture
   - Cross-Cutting Concerns (Security, Performance, etc.)
   - Architecture Decisions (ADR)
   - Future Considerations
   - Appendices (Patterns Used, References)

2. CONTENT REQUIREMENTS:
   - Include at least 5 detailed architecture diagrams (marked as [DIAGRAM])
   - Describe all components with:
     * Purpose and responsibilities
     * Interfaces and contracts
     * Scalability characteristics
     * Failure modes
   - Document all architecture decisions with:
     * Context
     * Decision
     * Consequences
   - Include capacity planning estimates
   - Detail security architecture
   - Provide performance characteristics

3. FORMATTING:
   - Markdown with clear hierarchy
   - [DIAGRAM] placeholders with descriptions
   - Tables for comparison of alternatives
   - Code blocks for interface contracts
   - Bullet points for component characteristics

4. DETAIL LEVEL:
   - Minimum 3000 words
   - Technical depth in all sections
   - Cover all architecture viewpoints
   - Include quantitative metrics`,
  },
];

const GeneratePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
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
  const { chats, currentChat } = useSelector((state) => state.chats);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  useEffect(() => {
    if (currentChat) {
      setSelectedType(currentChat.type);
      setPrompt(currentChat.prompt);
      setGeneratedContent(currentChat.content);
      setShowPreview(true);
    } else {
      setSelectedType(null);
      setPrompt("");
      setGeneratedContent("");
      setShowPreview(false);
    }
  }, [currentChat]);

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
          model: "gpt-4", // Using GPT-4 for better quality
          messages: [
            {
              role: "system",
              content: selectedDocument?.systemPrompt
                ? `${selectedDocument.systemPrompt}\n\nIMPORTANT INSTRUCTIONS:\n- Be extremely thorough and detailed\n- Include all relevant technical specifications\n- Provide comprehensive explanations\n- Use professional technical writing style\n- Format with clear hierarchy and structure\n- Add examples where appropriate\n- Include all standard sections plus any relevant subsections`
                : "Generate professional, highly detailed technical documentation with comprehensive explanations, examples, and proper formatting.",
            },
            {
              role: "user",
              content: `Create a comprehensive ${selectedDocument?.title} document with the following requirements:\n\n${prompt}\n\nDOCUMENT REQUIREMENTS:
1. Include ALL standard sections and subsections
2. Provide detailed technical descriptions
3. Add concrete examples where applicable (minimum 2-3 per major section)
4. Use professional terminology
5. Format with clear hierarchy (headings, subheadings, lists)
6. Include diagrams descriptions where needed (mark as [DIAGRAM])
7. Be as thorough as possible
8. Aim for at least 2500 words of detailed content
9. Number all requirements (e.g., FR-001, NFR-001)
10. Include validation criteria for all requirements`,
            },
          ],
          max_tokens: 4000,
          temperature: 0.3,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        "Generated response: ",
        response.data.choices[0]?.message?.content
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

      const content = await callOpenAIWithBackoff(prompt);
      setGeneratedContent(content);

      const chatData = {
        title: `${
          selectedDocument?.title
        } - ${new Date().toLocaleDateString()}`,
        content: content,
        type: selectedType,
        prompt: prompt,
      };

      if (currentChat) {
        dispatch(editChat({ id: currentChat.id, ...chatData }));
      } else {
        dispatch(createNewChat(chatData));
      }
    } catch (error) {
      console.error("Generation failed:", error);
      setError(error.message || "Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(isEditing ? editedContent : generatedContent);
  };

  const handleDownloadMarkdown = () => {
    const fullDocument = `# ${selectedDocument?.title || "Generated Document"}
    
**Generated**: ${new Date().toLocaleDateString()}  
**Author**: ${user?.name || "TecFlow AI"}  
**Version**: 1.0  

---

${isEditing ? editedContent : generatedContent}

---

*Document generated by TecFlow AI - ${new Date().toLocaleString()}*`;

    const blob = new Blob([fullDocument], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedDocument?.title || "document"}_${new Date()
      .toISOString()
      .slice(0, 10)}.md`;
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
    doc.text(`Author: ${user?.name || "TecFlow AI"}`, 105, 80, {
      align: "center",
    });

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

      // Handle tables (simple markdown table support)
      if (line.includes("|") && line.includes("-")) {
        const rows = contentToUse
          .split("\n")
          .slice(
            contentToUse.split("\n").indexOf(line) - 1,
            contentToUse.split("\n").indexOf(line) + 3
          )
          .filter((r) => r.includes("|"));

        if (rows.length > 1) {
          const tableData = rows.map((row) =>
            row
              .split("|")
              .map((cell) => cell.trim())
              .filter((cell) => cell)
          );

          // Simple table drawing (for more complex tables consider using autoTable plugin)
          doc.setFontSize(10);
          tableData.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
              doc.text(
                cell,
                leftMargin + cellIndex * 40,
                yPosition + rowIndex * 7
              );
            });
          });
          yPosition += tableData.length * 7 + 10;
          return;
        }
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
    doc.save(
      `${selectedDocument?.title || "document"}_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`
    );
  };

  const handleSaveEdit = () => {
    setGeneratedContent(editedContent);
    setIsEditing(false);

    if (currentChat) {
      const dataToUpdate = {
        id: currentChat.id,
        prompt: prompt,
        title: currentChat.title,
        type: currentChat.type,
        content: editedContent,
      };
      dispatch(
        editChat(dataToUpdate)
      );
    }
  };

  const handleCancelEdit = () => {
    setEditedContent(generatedContent);
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetChats());
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-full hover:bg-blue-100 p-2 shadow-sm hover:shadow-md transition-all duration-200 md:hidden"
        >
          <Menu className="w-5 h-5 text-gray-500" />
        </button>
      )}
      {isMobile ? (
        <div
          className={`${sidebarCollapsed ? "w-18" : "w-72"} 
        bg-white border-r border-gray-200 p-4 
        flex flex-col transition-all duration-300 ease-in-out 
        fixed h-full overflow-hidden z-40
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
          style={{ width: "18rem" }}
        >
          <div
            className={`flex items-center gap-3 mb-8 px-2 w-full ${
              sidebarCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <img
              src="techflow_logo.png"
              className="h-5 ml-12 mt-2 w-auto"
              alt="TecFlow Logo"
            />
          </div>

          <button
            onClick={() => {
              dispatch(setCurrentChat(null));
              setSelectedType(null);
              setPrompt("");
              setGeneratedContent("");
              setShowPreview(false);
            }}
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
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-3 px-2 flex items-center justify-between">
                    Recent
                    <Clock className="w-4 h-4" />
                  </h2>
                  {user === null ? (
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
                    // Replace the hardcoded array with your actual chats
                    <div className="space-y-1">
                      {chats?.map((chat) => (
                        <button
                          key={chat.id}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                            currentChat?.id === chat.id
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => dispatch(setCurrentChat(chat))}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              currentChat?.id === chat.id
                                ? "bg-blue-600"
                                : "bg-blue-400"
                            }`}
                          ></div>
                          <span className="truncate">{chat.title}</span>
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
                        {user ? user.name : ""}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user ? user.email : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Settings className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={handleLogout}
                    >
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

            {!sidebarCollapsed && user === null ? (
              <button className="w-full mt-3 text-xs text-blue-600 hover:underline text-left">
                Add account
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
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
                alt="TecFlow Logo"
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
            onClick={() => {
              dispatch(setCurrentChat(null));
              setSelectedType(null);
              setPrompt("");
              setGeneratedContent("");
              setShowPreview(false);
            }}
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
                {/* {user === null ? (
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
              )} */}

                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-3 px-2 flex items-center justify-between">
                    Recent
                    <Clock className="w-4 h-4" />
                  </h2>
                  {user === null ? (
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
                    // Replace the hardcoded array with your actual chats
                    <div className="space-y-1">
                      {chats?.map((chat) => (
                        <button
                          key={chat.id}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                            currentChat?.id === chat.id
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => dispatch(setCurrentChat(chat))}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              currentChat?.id === chat.id
                                ? "bg-blue-600"
                                : "bg-blue-400"
                            }`}
                          ></div>
                          <span className="truncate">{chat.title}</span>
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
                        {user ? user.name : ""}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user ? user.email : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Settings className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={handleLogout}
                    >
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

            {!sidebarCollapsed && user === null ? (
              <button className="w-full mt-3 text-xs text-blue-600 hover:underline text-left">
                Add account
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      )}

      {/* Overlay for mobile sidebar */}
      {isMobile && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 z-30 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{
          marginLeft: isMobile ? "0" : sidebarCollapsed ? "4.5rem" : "18rem",
          width: isMobile
            ? "100%"
            : sidebarCollapsed
            ? "calc(100% - 4.5rem)"
            : "calc(100% - 18rem)",
        }}
      >
        {/* Header - modified for mobile */}
        <header
          className="h-16 bg-white pl-16 pr-4  md:px-6 flex items-center justify-between fixed top-0 z-10 shadow-sm"
          style={{
            left: isMobile ? "0" : sidebarCollapsed ? "4.5rem" : "18rem",
            width: isMobile
              ? "100%"
              : sidebarCollapsed
              ? "calc(100% - 4.5rem)"
              : "calc(100% - 18rem)",
          }}
        >
          <div className="flex items-center gap-4">
            {isMobile && (
              <img
                src="techflow_logo.png"
                className="h-5 w-auto"
                alt="TecFlow Logo"
              />
            )}
            {sidebarCollapsed && !isMobile && (
              <img
                src="techflow_logo.png"
                className="w-[11%] h-auto"
                alt="TecFlow Logo"
              />
            )}
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              title="About Us"
              onClick={() => navigate("/tecflow-overview")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </button>

            {user !== null && (
              <button
                className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 md:px-4 rounded-xl hover:opacity-90 transition-opacity text-sm md:text-base"
                title="Upgrade Plan"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                <span className="hidden sm:inline">Upgrade</span>
              </button>
            )}

            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {user === null ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white h-8 md:h-10 px-3 md:px-5 py-1 md:py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
              >
                Sign in
              </button>
            ) : (
              ""
            )}
          </div>
        </header>

        <div
          className="flex-1 overflow-auto p-4 md:p-6"
          style={{
            marginTop: "4.5rem",
            height: "calc(100vh - 4.5rem)",
          }}
        >
          <div className="max-w-full md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                AI-Powered Document Generation
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                Transform your ideas into professional technical documentation
                in seconds.
              </p>
            </div>

            {error && (
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 text-red-600 rounded-lg text-sm md:text-base">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
              {documentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`relative p-4 md:p-6 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${
                    selectedType === type.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div
                    className={`inline-flex p-2 md:p-3 rounded-lg ${type.color}`}
                  >
                    <type.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <h3 className="mt-3 md:mt-4 text-base md:text-lg font-semibold text-gray-900">
                    {type.title}
                  </h3>
                  <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-600">
                    {type.description}
                  </p>
                  <ArrowRight
                    className={`absolute bottom-3 right-3 md:bottom-4 md:right-4 h-4 w-4 md:h-5 md:w-5 transition-opacity duration-300 ${
                      selectedType === type.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              ))}
            </div>

            {selectedType && (
              <div className="bg-transparent flex flex-col gap-3 md:gap-4 rounded-xl">
                <div className="bg-white rounded-xl shadow-md p-4 md:p-6 lg:p-8">
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <div
                      className={`p-1 md:p-2 rounded-lg ${selectedDocument?.color}`}
                    >
                      <selectedDocument.icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      Generate {selectedDocument?.title}
                    </h3>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <div className="relative">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your requirements"
                        className="w-full min-h-20 p-3 md:p-4 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:border-transparent bg-gray-50 placeholder-gray-400 text-gray-600 transition-all duration-200 text-sm md:text-base"
                      />
                      <div className="absolute right-3 bottom-3 md:right-4 md:bottom-4 flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-400">
                        <Wand2 className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">AI-Powered</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 md:pt-4 border-t border-gray-100 gap-2 md:gap-0">
                      <div className="text-xs md:text-sm text-gray-500">
                        Your document will be generated in PDF format
                      </div>
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className={`inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-xl text-white font-medium transition-all duration-300 text-sm md:text-base ${
                          isGenerating || !prompt.trim()
                            ? "bg-gray-400 cursor-not-allowed"
                            : selectedDocument?.color
                        } hover:opacity-90 w-full sm:w-auto justify-center`}
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-2 border-white border-t-transparent mr-2" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                            Generate Document
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {showPreview && (
                  <div className="border border-gray-200 rounded-xl">
                    <div className="p-3 md:p-4 flex items-center justify-between bg-gray-50 rounded-t-lg">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">
                        {selectedDocument?.title} Preview
                      </h3>
                      <div className="flex items-center gap-1 md:gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="p-1 md:p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Save changes"
                            >
                              <Save className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-1 md:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Cancel editing"
                            >
                              <X className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setIsEditing(true)}
                              className="p-1 md:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit document"
                            >
                              <Edit className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={handleCopyToClipboard}
                              className="p-1 md:p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Copy to clipboard"
                            >
                              <Copy className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                            <button
                              className="p-1 md:p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Share document"
                            >
                              <Share2 className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                            <button
                              className="p-1 md:p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Download as Markdown"
                              onClick={handleDownloadMarkdown}
                            >
                              <FileText className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                            <button
                              className="p-1 md:p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Download as PDF"
                              onClick={generatePDF}
                            >
                              <Download className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="p-3 md:p-4 bg-white">
                      {isGenerating ? (
                        <div className="animate-pulse space-y-3 md:space-y-4">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-3 md:h-4 bg-gray-200 rounded ${
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
                            className="w-full min-h-[300px] md:min-h-[500px] p-3 md:p-4 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:border-transparent bg-white placeholder-gray-400 text-gray-600 transition-all duration-200 font-mono text-xs md:text-sm"
                          />
                        ) : (
                          <div
                            className={`prose max-w-none text-sm md:text-base ${
                              selectedType === "tech-spec"
                                ? "prose-blue"
                                : selectedType === "srs"
                                ? "prose-purple"
                                : "prose-green"
                            }`}
                          >
                            <div className="p-3 md:p-6 border border-gray-200 rounded-lg">
                              {generatedContent
                                .split("\n")
                                .map((line, index) => {
                                  if (line.startsWith("# ")) {
                                    return (
                                      <h1
                                        key={index}
                                        className="text-xl md:text-2xl font-bold mb-3 md:mb-4 border-b pb-1 md:pb-2"
                                      >
                                        {line.substring(2)}
                                      </h1>
                                    );
                                  } else if (line.startsWith("## ")) {
                                    return (
                                      <h2
                                        key={index}
                                        className="text-lg md:text-xl font-semibold mt-4 md:mt-6 mb-2 md:mb-3"
                                      >
                                        {line.substring(3)}
                                      </h2>
                                    );
                                  } else if (line.startsWith("### ")) {
                                    return (
                                      <h3
                                        key={index}
                                        className="text-base md:text-lg font-medium mt-3 md:mt-4 mb-1 md:mb-2"
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
                                        className="list-disc pl-4 md:pl-5 my-1 md:my-2"
                                      >
                                        <li>{line.substring(2)}</li>
                                      </ul>
                                    );
                                  } else if (line.includes("[DIAGRAM]")) {
                                    return (
                                      <div
                                        key={index}
                                        className="my-2 md:my-4 p-2 md:p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center"
                                      >
                                        <p className="text-gray-500 text-xs md:text-sm">
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
                                        className="my-2 md:my-3 leading-relaxed"
                                      >
                                        {line}
                                      </p>
                                    );
                                  }
                                })}
                              <div className="mt-4 md:mt-8 pt-2 md:pt-4 border-t text-xs md:text-sm text-gray-500 text-center">
                                Generated by TecFlow AI •{" "}
                                {new Date().toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="text-gray-500 text-center py-4 md:py-8 text-sm md:text-base">
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

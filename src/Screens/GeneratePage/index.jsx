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
  Phone,
} from "lucide-react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { resetChats, setCurrentChat } from "../../features/chats/chatSlice";
import {
  fetchChats,
  createNewChat,
  editChat,
} from "../../features/chats/chatThunks";
import NotoSansKR from "../../assets/fonts/NotoSansKR-Regular-normal.js";
import NotoSansKRBold from "../../assets/fonts/NotoSansKR-Bold.js";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const GeneratePage = () => {
  const { t } = useTranslation();
  const documentTypes = [
    {
      id: "tech-spec",
      title: t("document_types.tech_spec.title"),
      icon: FileText,
      description: t("document_types.tech_spec.description"),
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
      title: t("document_types.srs.title"),
      icon: FileText,
      description: t("document_types.srs.description"),
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
   - Minimum 2000 words
   - Each requirement must be testable
   - No ambiguous language
   - Technical precision required`,
    },
    {
      id: "architecture",
      title: t("document_types.architecture.title"),
      icon: FileText,
      description: t("document_types.architecture.description"),
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
      // Detect if the prompt is in Korean (check for Korean characters)
      const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(prompt);

      console.log("Language detection - Is Korean:", isKorean);

      // System prompt with explicit language instructions
      const systemPrompt = isKorean
        ? selectedDocument?.systemPrompt
          ? `[중요] 이 문서는 반드시 한국어로 작성해야 합니다. 아래 지침을 엄격히 따르세요:\n\n${selectedDocument.systemPrompt}\n\n추가 지침:
- 반드시 한국어로만 작성할 것
- 전문적인 기술 문서 스타일 유지
- 모든 섹션과 하위 섹션 포함
- 구체적인 예시 2-3개 포함
- 기술 용어 정확히 사용
- 명확한 계층 구조 유지
- 다이어그램 설명 추가 ([DIAGRAM] 표시)
- 최소 2000단어 이상 작성
- 모든 요구사항에 번호 부여 (FR-001, NFR-001 등)
- 각 요구사항에 검증 기준 포함`
          : "[중요] 이 문서는 반드시 한국어로 작성해야 합니다. 전문적이고 상세한 기술 문서를 생성하되 다음을 준수하세요:\n- 한국어로만 작성\n- 전문적인 기술 문서 스타일\n- 포괄적인 설명과 예시\n- 명확한 구조\n- 최소 2000단어"
        : selectedDocument?.systemPrompt
        ? `${selectedDocument.systemPrompt}\n\nIMPORTANT INSTRUCTIONS:
- Be extremely thorough and detailed
- Include all relevant technical specifications
- Provide comprehensive explanations
- Use professional technical writing style
- Format with clear hierarchy and structure
- Add examples where appropriate
- Include all standard sections plus any relevant subsections`
        : "Generate professional, highly detailed technical documentation with comprehensive explanations, examples, and proper formatting.";

      // User prompt with language-specific requirements
      const userPrompt = isKorean
        ? `다음 요구사항에 따라 ${selectedDocument?.title} 문서를 한국어로 작성하세요:\n\n${prompt}\n\n문서 작성 시 반드시 다음을 준수하세요:
1. 모든 표준 섹션과 하위 섹션 포함
2. 상세한 기술 설명 제공
3. 주요 섹션마다 구체적인 예시 2-3개 포함
4. 전문 용어 사용
5. 명확한 계층 구조 유지 (제목, 소제목, 목록)
6. 필요한 곳에 다이어그램 설명 포함 ([DIAGRAM] 표시)
7. 가능한 한 철저하게 작성
8. 최소 2000단어 이상 작성
9. 모든 요구사항에 번호 부여 (예: FR-001, NFR-001)
10. 모든 요구사항에 대한 검증 기준 포함
11. 반드시 한국어로만 작성`
        : `Create a comprehensive ${selectedDocument?.title} document with the following requirements:\n\n${prompt}\n\nDOCUMENT REQUIREMENTS:
1. Include ALL standard sections and subsections
2. Provide detailed technical descriptions
3. Add concrete examples where applicable (minimum 2-3 per major section)
4. Use professional terminology
5. Format with clear hierarchy (headings, subheadings, lists)
6. Include diagrams descriptions where needed (mark as [DIAGRAM])
7. Be as thorough as possible
8. Aim for at least 2000 words of detailed content
9. Number all requirements (e.g., FR-001, NFR-001)
10. Include validation criteria for all requirements`;

      console.log("System prompt being sent:", systemPrompt);
      console.log("User prompt being sent:", userPrompt);

      const requestData = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        max_tokens: 4000,
        temperature: isKorean ? 0.1 : 0.3, // Lower temperature for Korean
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };

      console.log(
        "Full request payload:",
        JSON.stringify(requestData, null, 2)
      );

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000, // 30 seconds timeout
        }
      );

      console.log("API response:", response.data);

      const generatedContent =
        response.data.choices[0]?.message?.content || "No content generated";
      console.log("Generated content:", generatedContent);

      // Verify the response is in Korean if expected
      if (isKorean && !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(generatedContent)) {
        console.warn(
          "Expected Korean content but received non-Korean response"
        );
        throw new Error("API did not return Korean content as requested");
      }

      return generatedContent;
    } catch (error) {
      console.error("API call error:", error);

      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data,
        });

        setError(
          `API Error: ${error.response?.data?.error?.message || error.message}`
        );
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred");
      }

      if (
        retries > 0 &&
        axios.isAxiosError(error) &&
        (error.response?.status === 429 || // Too many requests
          error.response?.status === 502 || // Bad gateway
          error.response?.status === 503 || // Service unavailable
          error.response?.status === 504) // Gateway timeout
      ) {
        const nextDelay = delay * 2;
        console.log(`Retrying in ${nextDelay}ms... (${retries} retries left)`);
        await new Promise((resolve) => setTimeout(resolve, nextDelay));
        return callOpenAIWithBackoff(prompt, retries - 1, nextDelay);
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

  // const generatePDF = () => {
  //   const contentToUse = isEditing ? editedContent : generatedContent;
  //   if (!contentToUse) return;

  //   const doc = new jsPDF({
  //     unit: "mm",
  //     format: "a4",
  //     orientation: "portrait",
  //   });

  //   // Set default font
  //   doc.setFont("helvetica");
  //   doc.setFontSize(11);

  //   /* ==================== */
  //   /* IMPROVED TITLE PAGE */
  //   /* ==================== */

  //   // Calculate available width (A4 page is 210mm wide)
  //   const pageWidth = 210;
  //   const margin = 20;
  //   const contentWidth = pageWidth - 2 * margin;

  //   // Title with automatic wrapping
  //   const title = selectedDocument?.title || "Generated Document";
  //   doc.setFontSize(24);
  //   doc.setTextColor(15, 23, 42);

  //   // Split title into multiple lines if needed
  //   const titleLines = doc.splitTextToSize(title, contentWidth);

  //   // Calculate starting Y position to center vertically
  //   const lineHeight = 10; // Approximate line height for title
  //   const titleBlockHeight = titleLines.length * lineHeight;
  //   const additionalElementsHeight = 40; // Space for version, date, author
  //   const totalHeight = titleBlockHeight + additionalElementsHeight;

  //   let yPosition = (297 - totalHeight) / 2; // A4 height is 297mm

  //   // Draw title lines
  //   titleLines.forEach((line, i) => {
  //     doc.text(line, pageWidth / 2, yPosition + i * lineHeight, {
  //       align: "center",
  //       maxWidth: contentWidth,
  //     });
  //   });

  //   // Version information
  //   yPosition += titleBlockHeight + 10;
  //   doc.setFontSize(16);
  //   doc.text(`Version: 1.0`, pageWidth / 2, yPosition, { align: "center" });

  //   // Date information
  //   yPosition += 10;
  //   doc.text(
  //     `Date: ${new Date().toLocaleDateString()}`,
  //     pageWidth / 2,
  //     yPosition,
  //     {
  //       align: "center",
  //     }
  //   );

  //   // Author information
  //   yPosition += 10;
  //   doc.text(
  //     `Author: ${user?.name || "TecFlow AI"}`,
  //     pageWidth / 2,
  //     yPosition,
  //     {
  //       align: "center",
  //     }
  //   );

  //   /* ==================== */
  //   /* DOCUMENT CONTENT */
  //   /* ==================== */

  //   // Add new page for content
  //   doc.addPage();

  //   // Reset position and settings for content
  //   const leftMargin = 15;
  //   const rightMargin = 195;
  //   const contentPageWidth = rightMargin - leftMargin;
  //   yPosition = 20;
  //   const contentLineHeight = 7;
  //   const sectionGap = 10;

  //   const processLine = (line) => {
  //     if (yPosition > 270) {
  //       doc.addPage();
  //       yPosition = 20;
  //     }

  //     // Skip empty lines
  //     if (line.trim() === "") {
  //       yPosition += contentLineHeight / 2;
  //       return;
  //     }

  //     // Handle headings
  //     if (line.startsWith("# ")) {
  //       doc.setFontSize(18);
  //       doc.setFont("helvetica", "bold");
  //       const headingLines = doc.splitTextToSize(
  //         line.substring(2),
  //         contentPageWidth
  //       );
  //       doc.text(headingLines, leftMargin, yPosition);
  //       yPosition += (contentLineHeight + 2) * headingLines.length;
  //       doc.setDrawColor(200, 200, 200);
  //       doc.line(leftMargin, yPosition, rightMargin, yPosition);
  //       yPosition += sectionGap;
  //       doc.setFontSize(11);
  //       doc.setFont("helvetica", "normal");
  //       return;
  //     }

  //     if (line.startsWith("## ")) {
  //       doc.setFontSize(16);
  //       doc.setFont("helvetica", "bold");
  //       const headingLines = doc.splitTextToSize(
  //         line.substring(3),
  //         contentPageWidth
  //       );
  //       doc.text(headingLines, leftMargin, yPosition);
  //       yPosition += (contentLineHeight + sectionGap / 2) * headingLines.length;
  //       doc.setFontSize(11);
  //       doc.setFont("helvetica", "normal");
  //       return;
  //     }

  //     if (line.startsWith("### ")) {
  //       doc.setFontSize(14);
  //       doc.setFont("helvetica", "bold");
  //       const headingLines = doc.splitTextToSize(
  //         line.substring(4),
  //         contentPageWidth
  //       );
  //       doc.text(headingLines, leftMargin, yPosition);
  //       yPosition += contentLineHeight * headingLines.length;
  //       doc.setFontSize(11);
  //       doc.setFont("helvetica", "normal");
  //       return;
  //     }

  //     // Handle lists
  //     if (line.startsWith("- ") || line.startsWith("* ")) {
  //       doc.setFontSize(11);
  //       const listItemLines = doc.splitTextToSize(
  //         line.substring(2),
  //         contentPageWidth - 5
  //       );
  //       listItemLines.forEach((text, i) => {
  //         doc.text(
  //           i === 0 ? "• " + text : "  " + text,
  //           leftMargin + 5,
  //           yPosition
  //         );
  //         yPosition += contentLineHeight;
  //       });
  //       return;
  //     }

  //     // Handle diagram placeholders
  //     if (line.includes("[DIAGRAM]")) {
  //       doc.setFontSize(10);
  //       doc.setTextColor(100, 100, 100);
  //       const diagramLines = doc.splitTextToSize(
  //         "[Diagram placeholder]",
  //         contentPageWidth
  //       );
  //       doc.text(diagramLines, leftMargin, yPosition);
  //       yPosition += contentLineHeight * diagramLines.length;
  //       doc.rect(leftMargin, yPosition, contentPageWidth, 40, "S");
  //       doc.setTextColor(15, 23, 42);
  //       yPosition += 45;
  //       return;
  //     }

  //     // Handle regular text with word wrap
  //     doc.setFontSize(11);
  //     const splitText = doc.splitTextToSize(line, contentPageWidth);
  //     doc.text(splitText, leftMargin, yPosition);
  //     yPosition += contentLineHeight * splitText.length;
  //   };

  //   // Process all content lines
  //   contentToUse.split("\n").forEach((line) => {
  //     processLine(line);
  //   });

  //   // Add page numbers
  //   const pageCount = doc.internal.getNumberOfPages();
  //   for (let i = 1; i <= pageCount; i++) {
  //     doc.setPage(i);
  //     doc.setFontSize(10);
  //     doc.setTextColor(100, 100, 100);
  //     doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 287, {
  //       align: "center",
  //     });
  //   }

  //   // Save the PDF
  //   doc.save(
  //     `${selectedDocument?.title || "document"}_${new Date()
  //       .toISOString()
  //       .slice(0, 10)}.pdf`
  //   );
  // };
  function isMostlyKorean(text) {
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const nonKoreanRegex = /[a-zA-Z]/; // English letters

    let koreanCount = 0;
    let englishCount = 0;

    for (let char of text) {
      if (koreanRegex.test(char)) koreanCount++;
      if (nonKoreanRegex.test(char)) englishCount++;
    }

    // Consider it Korean only if there are more Korean than English characters
    return koreanCount > englishCount;
  }

  const generatePDF = () => {
    const contentToUse = isEditing ? editedContent : generatedContent;
    if (!contentToUse) return;

    // Detect if content is in Korean
    const isKorean = isMostlyKorean(contentToUse);
    console.log("Seleted language 000: ", isKorean);
    console.log("Seleted language content: ", contentToUse);

    // Initialize PDF
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });

    // Set default font
    let currentFont = "helvetica";
    doc.setFont(currentFont);
    doc.setFontSize(11);

    // Try to set Korean font if needed
    if (isKorean) {
      const availableFonts = doc.getFontList();
      const koreanFonts = [
        "NotoSansKR",
        "malgun",
        "gulim",
        "batang",
        "dotum",
        "gungsuh",
        "HYHeadLine",
        "HYGothic",
        "HYMyeongJo",
      ];
      const availableKoreanFont = koreanFonts.find(
        (font) => availableFonts[font]
      );

      if (availableKoreanFont) {
        currentFont = availableKoreanFont;
        doc.setFont(currentFont);
      } else {
        try {
          doc.addFileToVFS("NotoSansKR-Regular.ttf", NotoSansKR);
          doc.addFont("NotoSansKR-Regular.ttf", "NotoSansKR", "normal");
          doc.addFileToVFS("NotoSansKR-Bold.ttf", NotoSansKRBold);
          doc.addFont("NotoSansKR-Bold.ttf", "NotoSansKR", "bold");
          doc.setFont("NotoSansKR");
          currentFont = "NotoSansKR";
        } catch (e) {
          console.error("Failed to load Korean font:", e);
        }
      }
    }

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Watermark helper
    const addWatermarkToPage = (pageNum) => {
      doc.setPage(pageNum);
      doc.saveGraphicsState();
      doc.setGState(new doc.GState({ opacity: 0.2 }));
      doc.setFont(currentFont, "bold");
      doc.setFontSize(60);
      doc.setTextColor(0, 0, 0);

      // Calculate text dimensions
      const watermarkText = "TecFlow";

      // Get exact center of page
      const centerX = pageWidth / 2;
      const centerY = pageHeight / 2 + margin;

      // Save current state, rotate, then restore
      doc.text(watermarkText, centerX, centerY, {
        angle: 35,
        align: "center",
        baseline: "middle",
      });

      doc.restoreGraphicsState();
    };
    /* TITLE PAGE */
    const title =
      selectedDocument?.title ||
      (isKorean ? "생성된 문서" : "Generated Document");
    doc.setFontSize(24);
    doc.setTextColor(15, 23, 42);

    const titleLines = doc.splitTextToSize(title, contentWidth);
    const lineHeight = 10;
    const titleBlockHeight = titleLines.length * lineHeight;
    const additionalElementsHeight = 40;
    const totalHeight = titleBlockHeight + additionalElementsHeight;

    let yPosition = (297 - totalHeight) / 2;

    titleLines.forEach((line, i) => {
      doc.text(line, pageWidth / 2, yPosition + i * lineHeight, {
        align: "center",
        maxWidth: contentWidth,
      });
    });

    yPosition += titleBlockHeight + 10;
    doc.setFontSize(16);
    doc.text(
      isKorean ? `버전: 1.0` : `Version: 1.0`,
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );

    yPosition += 10;
    doc.text(
      isKorean
        ? `날짜: ${new Date().toLocaleDateString("ko-KR")}`
        : `Date: ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );

    yPosition += 10;
    doc.text(
      isKorean
        ? `작성자: ${user?.name || "TecFlow AI"}`
        : `Author: ${user?.name || "TecFlow AI"}`,
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );

    /* DOCUMENT CONTENT */
    doc.addPage();
    addWatermarkToPage(doc.internal.getNumberOfPages());

    const leftMargin = 15;
    const rightMargin = 195;
    const contentPageWidth = rightMargin - leftMargin;
    yPosition = 20;
    const contentLineHeight = 7;
    const sectionGap = 10;

    const processLine = (line) => {
      if (yPosition > 270) {
        doc.addPage();
        addWatermarkToPage(doc.internal.getNumberOfPages());
        yPosition = 20;
      }

      if (line.trim() === "") {
        yPosition += contentLineHeight / 2;
        return;
      }

      if (line.startsWith("# ")) {
        doc.setFontSize(18);
        doc.setFont(currentFont, "bold");
        const headingLines = doc.splitTextToSize(
          line.substring(2),
          contentPageWidth
        );
        doc.text(headingLines, leftMargin, yPosition);
        yPosition += (contentLineHeight + 2) * headingLines.length;
        doc.setDrawColor(200, 200, 200);
        doc.line(leftMargin, yPosition, rightMargin, yPosition);
        yPosition += sectionGap;
        doc.setFontSize(11);
        doc.setFont(currentFont, "normal");
        return;
      }

      if (line.startsWith("## ")) {
        doc.setFontSize(16);
        doc.setFont(currentFont, "bold");
        const headingLines = doc.splitTextToSize(
          line.substring(3),
          contentPageWidth
        );
        doc.text(headingLines, leftMargin, yPosition);
        yPosition += (contentLineHeight + sectionGap / 2) * headingLines.length;
        doc.setFontSize(11);
        doc.setFont(currentFont, "normal");
        return;
      }

      if (line.startsWith("### ")) {
        doc.setFontSize(14);
        doc.setFont(currentFont, "bold");
        const headingLines = doc.splitTextToSize(
          line.substring(4),
          contentPageWidth
        );
        doc.text(headingLines, leftMargin, yPosition);
        yPosition += contentLineHeight * headingLines.length;
        doc.setFontSize(11);
        doc.setFont(currentFont, "normal");
        return;
      }

      if (line.startsWith("- ") || line.startsWith("* ")) {
        doc.setFontSize(11);
        const listItemLines = doc.splitTextToSize(
          line.substring(2),
          contentPageWidth - 5
        );
        listItemLines.forEach((text, i) => {
          doc.text(
            i === 0 ? "• " + text : "  " + text,
            leftMargin + 5,
            yPosition
          );
          yPosition += contentLineHeight;
        });
        return;
      }

      if (line.includes("[DIAGRAM]")) {
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        const diagramText = isKorean
          ? "[다이어그램 자리표시자]"
          : "[Diagram placeholder]";
        const diagramLines = doc.splitTextToSize(diagramText, contentPageWidth);
        doc.text(diagramLines, leftMargin, yPosition);
        yPosition += contentLineHeight * diagramLines.length;
        doc.rect(leftMargin, yPosition, contentPageWidth, 40, "S");
        doc.setTextColor(15, 23, 42);
        yPosition += 45;
        return;
      }

      // Regular text
      doc.setFontSize(11);
      const splitText = doc.splitTextToSize(line, contentPageWidth);
      doc.text(splitText, leftMargin, yPosition);
      yPosition += contentLineHeight * splitText.length;
    };

    contentToUse.split("\n").forEach((line) => {
      processLine(line);
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(
        isKorean ? `페이지 ${i} / ${pageCount}` : `Page ${i} of ${pageCount}`,
        pageWidth / 2,
        287,
        { align: "center" }
      );
    }

    const fileName = isKorean
      ? `${selectedDocument?.title || "문서"}_${new Date()
          .toISOString()
          .slice(0, 10)}.pdf`
      : `${selectedDocument?.title || "document"}_${new Date()
          .toISOString()
          .slice(0, 10)}.pdf`;

    doc.save(fileName);
  };

  const handleRequestQuotation = async () => {
    try {
      // Generate PDF first
      const contentToUse = isEditing ? editedContent : generatedContent;
      if (!contentToUse) return;

      const isKorean = isMostlyKorean(contentToUse);
      const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });

      // Set default font
      let currentFont = "helvetica";
      doc.setFont(currentFont);
      doc.setFontSize(11);

      // Try to set Korean font if needed
      if (isKorean) {
        const availableFonts = doc.getFontList();
        const koreanFonts = [
          "NotoSansKR",
          "malgun",
          "gulim",
          "batang",
          "dotum",
          "gungsuh",
          "HYHeadLine",
          "HYGothic",
          "HYMyeongJo",
        ];
        const availableKoreanFont = koreanFonts.find(
          (font) => availableFonts[font]
        );

        if (availableKoreanFont) {
          currentFont = availableKoreanFont;
          doc.setFont(currentFont);
        } else {
          try {
            doc.addFileToVFS("NotoSansKR-Regular.ttf", NotoSansKR);
            doc.addFont("NotoSansKR-Regular.ttf", "NotoSansKR", "normal");
            doc.addFileToVFS("NotoSansKR-Bold.ttf", NotoSansKRBold);
            doc.addFont("NotoSansKR-Bold.ttf", "NotoSansKR", "bold");
            doc.setFont("NotoSansKR");
            currentFont = "NotoSansKR";
          } catch (e) {
            console.error("Failed to load Korean font:", e);
          }
        }
      }

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;

      // Watermark helper
      const addWatermarkToPage = (pageNum) => {
        doc.setPage(pageNum);
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.2 }));
        doc.setFont(currentFont, "bold");
        doc.setFontSize(60);
        doc.setTextColor(0, 0, 0);

        // Calculate text dimensions
        const watermarkText = "TecFlow";

        // Get exact center of page
        const centerX = pageWidth / 2;
        const centerY = pageHeight / 2 + margin;

        // Save current state, rotate, then restore
        doc.text(watermarkText, centerX, centerY, {
          angle: 35,
          align: "center",
          baseline: "middle",
        });

        doc.restoreGraphicsState();
      };
      /* TITLE PAGE */
      const title =
        selectedDocument?.title ||
        (isKorean ? "생성된 문서" : "Generated Document");
      doc.setFontSize(24);
      doc.setTextColor(15, 23, 42);

      const titleLines = doc.splitTextToSize(title, contentWidth);
      const lineHeight = 10;
      const titleBlockHeight = titleLines.length * lineHeight;
      const additionalElementsHeight = 40;
      const totalHeight = titleBlockHeight + additionalElementsHeight;

      let yPosition = (297 - totalHeight) / 2;

      titleLines.forEach((line, i) => {
        doc.text(line, pageWidth / 2, yPosition + i * lineHeight, {
          align: "center",
          maxWidth: contentWidth,
        });
      });

      yPosition += titleBlockHeight + 10;
      doc.setFontSize(16);
      doc.text(
        isKorean ? `버전: 1.0` : `Version: 1.0`,
        pageWidth / 2,
        yPosition,
        { align: "center" }
      );

      yPosition += 10;
      doc.text(
        isKorean
          ? `날짜: ${new Date().toLocaleDateString("ko-KR")}`
          : `Date: ${new Date().toLocaleDateString()}`,
        pageWidth / 2,
        yPosition,
        { align: "center" }
      );

      yPosition += 10;
      doc.text(
        isKorean
          ? `작성자: ${user?.name || "TecFlow AI"}`
          : `Author: ${user?.name || "TecFlow AI"}`,
        pageWidth / 2,
        yPosition,
        { align: "center" }
      );

      /* DOCUMENT CONTENT */
      doc.addPage();
      addWatermarkToPage(doc.internal.getNumberOfPages());

      const leftMargin = 15;
      const rightMargin = 195;
      const contentPageWidth = rightMargin - leftMargin;
      yPosition = 20;
      const contentLineHeight = 7;
      const sectionGap = 10;

      const processLine = (line) => {
        if (yPosition > 270) {
          doc.addPage();
          addWatermarkToPage(doc.internal.getNumberOfPages());
          yPosition = 20;
        }

        if (line.trim() === "") {
          yPosition += contentLineHeight / 2;
          return;
        }

        if (line.startsWith("# ")) {
          doc.setFontSize(18);
          doc.setFont(currentFont, "bold");
          const headingLines = doc.splitTextToSize(
            line.substring(2),
            contentPageWidth
          );
          doc.text(headingLines, leftMargin, yPosition);
          yPosition += (contentLineHeight + 2) * headingLines.length;
          doc.setDrawColor(200, 200, 200);
          doc.line(leftMargin, yPosition, rightMargin, yPosition);
          yPosition += sectionGap;
          doc.setFontSize(11);
          doc.setFont(currentFont, "normal");
          return;
        }

        if (line.startsWith("## ")) {
          doc.setFontSize(16);
          doc.setFont(currentFont, "bold");
          const headingLines = doc.splitTextToSize(
            line.substring(3),
            contentPageWidth
          );
          doc.text(headingLines, leftMargin, yPosition);
          yPosition +=
            (contentLineHeight + sectionGap / 2) * headingLines.length;
          doc.setFontSize(11);
          doc.setFont(currentFont, "normal");
          return;
        }

        if (line.startsWith("### ")) {
          doc.setFontSize(14);
          doc.setFont(currentFont, "bold");
          const headingLines = doc.splitTextToSize(
            line.substring(4),
            contentPageWidth
          );
          doc.text(headingLines, leftMargin, yPosition);
          yPosition += contentLineHeight * headingLines.length;
          doc.setFontSize(11);
          doc.setFont(currentFont, "normal");
          return;
        }

        if (line.startsWith("- ") || line.startsWith("* ")) {
          doc.setFontSize(11);
          const listItemLines = doc.splitTextToSize(
            line.substring(2),
            contentPageWidth - 5
          );
          listItemLines.forEach((text, i) => {
            doc.text(
              i === 0 ? "• " + text : "  " + text,
              leftMargin + 5,
              yPosition
            );
            yPosition += contentLineHeight;
          });
          return;
        }

        if (line.includes("[DIAGRAM]")) {
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          const diagramText = isKorean
            ? "[다이어그램 자리표시자]"
            : "[Diagram placeholder]";
          const diagramLines = doc.splitTextToSize(
            diagramText,
            contentPageWidth
          );
          doc.text(diagramLines, leftMargin, yPosition);
          yPosition += contentLineHeight * diagramLines.length;
          doc.rect(leftMargin, yPosition, contentPageWidth, 40, "S");
          doc.setTextColor(15, 23, 42);
          yPosition += 45;
          return;
        }

        // Regular text
        doc.setFontSize(11);
        const splitText = doc.splitTextToSize(line, contentPageWidth);
        doc.text(splitText, leftMargin, yPosition);
        yPosition += contentLineHeight * splitText.length;
      };

      contentToUse.split("\n").forEach((line) => {
        processLine(line);
      });

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(
          isKorean ? `페이지 ${i} / ${pageCount}` : `Page ${i} of ${pageCount}`,
          pageWidth / 2,
          287,
          { align: "center" }
        );
      }

      // Get the PDF as a blob
      const pdfBlob = doc.output("blob");

      // Create FormData to send the email with attachment
      const formData = new FormData();
      formData.append("name", user.name || "TecFlow User");
      formData.append("phone", "01666666666"); // Replace with actual phone if available
      formData.append("email", user.email);
      formData.append("service", "TecFlow");
      formData.append(
        "message",
        `Please find attached the ${
          selectedDocument?.title || "document"
        } for quotation.`
      );

      // Append the PDF file
      const pdfFile = new File(
        [pdfBlob],
        `${selectedDocument?.title || "document"}.pdf`,
        {
          type: "application/pdf",
        }
      );
      formData.append("attachment", pdfFile);

      const response = await axios.post(
        "https://techub.kr/send_email_tecflow.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data === "success") {
        alert("Quotation request sent successfully!");
      } else {
        throw new Error(response.data || "Failed to send quotation request");
      }
    } catch (error) {
      console.error("Error sending quotation request:", error);
      setError(error.message || "Failed to send quotation request");
    } finally {
      setIsGenerating(false);
    }
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
      dispatch(editChat(dataToUpdate));
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
            {!sidebarCollapsed && t("document_generation.new_document")}
          </button>

          <div className="flex-1 overflow-y-auto">
            {!sidebarCollapsed && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-3 px-2 flex items-center justify-between">
                    {t("document_generation.recent")}
                    <Clock className="w-4 h-4" />
                  </h2>
                  {user === null ? (
                    <div className="space-y-1">
                      <div className="bg-gray-300 rounded-xl shadow-sm p-4 max-w-sm w-full space-y-4">
                        <div className="space-y-2">
                          <h2 className="text-lg font-semibold text-gray-900">
                            {t("document_generation.sign_in_prompt")}
                          </h2>
                          <p className="text-sm text-gray-600">
                            {t("document_generation.sign_in_description")}
                          </p>
                        </div>

                        <button
                          className="w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={() => navigate("/login")}
                        >
                          {t("document_generation.sign_in")}
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
          <div className="flex flex-col my-2">
            <button
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-4 w-full text-sm"
              title="About Us"
              onClick={() => navigate("/tecflow-help")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
              {!sidebarCollapsed && "Help"}
            </button>
            {/* <button
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-4 w-full text-sm"
              title="Settings"
              onClick={() => navigate("/")}
            >
              <Settings className="w-5 h-5" />
              {!sidebarCollapsed && "Settings"}
            </button> */}
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
            {!sidebarCollapsed && t("document_generation.new_document")}
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
                    {t("document_generation.recent")}
                    <Clock className="w-4 h-4" />
                  </h2>
                  {user === null ? (
                    <div className="space-y-1">
                      <div className="bg-gray-300 rounded-xl shadow-sm p-4 max-w-sm w-full space-y-4">
                        <div className="space-y-2">
                          <h2 className="text-lg font-semibold text-gray-900">
                            {t("document_generation.sign_in_prompt")}
                          </h2>
                          <p className="text-sm text-gray-600">
                            {t("document_generation.sign_in_description")}
                          </p>
                        </div>

                        <button
                          className="w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={() => navigate("/login")}
                        >
                          {t("document_generation.sign_in")}
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

          <div className="flex flex-col my-2">
            <button
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-4 w-full text-sm"
              title="Help"
              onClick={() => navigate("/tecflow-help")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
              {!sidebarCollapsed && t("document_generation.help")}
            </button>
            {/* <button
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-4 w-full text-sm"
              title="Settings"
              onClick={() => navigate("/")}
            >
              <Settings className="w-5 h-5" />
              {!sidebarCollapsed && t("document_generation.settings")}
            </button> */}
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
                {t("document_generation.add_account")}
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
            <LanguageSwitcher />
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
                <span
                  className="hidden sm:inline"
                  onClick={() => navigate("/subscription")}
                >
                  {t("document_generation.upgrade_plan")}
                </span>
              </button>
            )}

            {user === null ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white h-8 md:h-10 px-3 md:px-5 py-1 md:py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
              >
                {t("document_generation.sign_in")}
              </button>
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium overflow-hidden">
                <img
                  src={user ? user.profilePic : ""}
                  alt={user ? user.name : "pp"}
                  className="w-full h-full object-fit"
                />
              </div>
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
                {t("document_generation.title")}
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                {t("document_generation.subtitle")}
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
                      {t("buttons.generate")} {selectedDocument?.title}
                    </h3>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <div className="relative">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={t("placeholders.prompt")}
                        className="w-full min-h-20 p-3 md:p-4 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:border-transparent bg-gray-50 placeholder-gray-400 text-gray-600 transition-all duration-200 text-sm md:text-base"
                      />
                      <div className="absolute right-3 bottom-3 md:right-4 md:bottom-4 flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-400">
                        <Wand2 className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">
                          {t("document_generation.ai_powered")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 md:pt-4 border-t border-gray-100 gap-2 md:gap-0">
                      <div className="text-xs md:text-sm text-gray-500">
                        {t("document_generation.document_will_be_generated")}
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

                            {t("document_generation.generating")}
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />

                            {t("document_generation.generate_button")}
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
                        {selectedDocument?.title}{" "}
                        {t("document_generation.preview_title")}
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
                            {/* <button
                              className="p-1 md:p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Share document"
                            >
                              <Share2 className="w-3 h-3 md:w-4 md:h-4" />
                            </button> */}
                            {/* <button
                              className="p-1 md:p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Download as Markdown"
                              onClick={handleDownloadMarkdown}
                            >
                              <FileText className="w-3 h-3 md:w-4 md:h-4" />
                            </button> */}
                            <button
                              className={`text-sm md:text-md p-1 md:p-2 text-white hover:opacity-80 rounded-lg transition-colors flex items-center gap-2 ${selectedDocument?.color}`}
                              title="Download as PDF"
                              onClick={generatePDF}
                            >
                              <Download className="w-4 h-4 md:w-5 md:h-5" />{" "}
                              {t("document_generation.download_pdf")}
                            </button>

                            <button
                              className={`text-sm md:text-md p-1 md:p-2 text-white hover:opacity-80 rounded-lg transition-colors flex items-center gap-2 bg-red-500`}
                              title="Request Quotation"
                              onClick={handleRequestQuotation}
                              disabled={isGenerating}
                            >
                              {isGenerating
                                ? t("document_generation.sending")
                                : t("document_generation.request_quotation")}
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
                                {t("document_generation.generated_by")} •{" "}
                                {new Date().toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="text-gray-500 text-center py-4 md:py-8 text-sm md:text-base">
                          {t("document_generation.empty_preview")}
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

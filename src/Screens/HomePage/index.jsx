import {
  Mail,
  MessageSquare,
  FileText,
  Zap,
  Download,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("getting-started");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    try {
      // Create FormData object for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("issue", formData.issue);
      formDataToSend.append("message", formData.message);

      const response = await axios.post(
        "https://techub.kr/send_email_tecflow.php",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSubmitStatus({
          success: true,
          message: t("homepage.contact.form.success_message"),
        });
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          issue: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          success: false,
          message:
            response.data.message || t("homepage.contact.form.error_message"),
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message: t("homepage.contact.form.error_message"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Header */}
      <header className="h-16 bg-white w-full pr-4 md:px-6 flex items-center justify-between fixed top-0 z-10 shadow-sm">
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
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="font-medium">Home</span>
          </Link>
          {user !== null && (
            <button
              className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 md:px-4 rounded-xl hover:opacity-90 transition-opacity text-sm md:text-base"
              title="Upgrade Plan"
              onClick={() => navigate("/subscription")}
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
              <span className="hidden sm:inline">
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

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t("homepage.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("homepage.subtitle")}
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
              {t("homepage.tabs.getting_started")}
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`px-6 py-3 font-medium ${
                activeTab === "features"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              {t("homepage.tabs.features")}
            </button>
            <button
              onClick={() => setActiveTab("troubleshooting")}
              className={`px-6 py-3 font-medium ${
                activeTab === "troubleshooting"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              {t("homepage.tabs.troubleshooting")}
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-3 font-medium ${
                activeTab === "contact"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              {t("homepage.tabs.contact")}
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            {activeTab === "getting-started" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-blue-600" />
                  {t("homepage.getting_started.title")}
                </h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      1. {t("homepage.getting_started.steps.create_account")}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {t("homepage.getting_started.steps.create_account_desc")}
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      2. {t("homepage.getting_started.steps.choose_doc")}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {t("homepage.getting_started.steps.choose_doc_desc")}
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      3. {t("homepage.getting_started.steps.input_reqs")}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {t("homepage.getting_started.steps.input_reqs_desc")}
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      4. {t("homepage.getting_started.steps.generate_refine")}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {t("homepage.getting_started.steps.generate_refine_desc")}
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      5. {t("homepage.getting_started.steps.export_share")}
                    </h3>
                    <p className="text-gray-600 mt-1 flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {t("homepage.getting_started.steps.export_share_desc")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  {t("homepage.features.title")}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {t("homepage.features.items.template_library")}
                    </h3>
                    <p className="text-gray-600">
                      {t("homepage.features.items.template_library_desc")}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {t("homepage.features.items.ai_suggestions")}
                    </h3>
                    <p className="text-gray-600">
                      {t("homepage.features.items.ai_suggestions_desc")}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {t("homepage.features.items.collaboration")}
                    </h3>
                    <p className="text-gray-600">
                      {t("homepage.features.items.collaboration_desc")}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {t("homepage.features.items.version_history")}
                    </h3>
                    <p className="text-gray-600">
                      {t("homepage.features.items.version_history_desc")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "troubleshooting" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {t("homepage.faq.title")}
                </h2>
                <div className="space-y-4">
                  {t("homepage.faq.questions", { returnObjects: true }).map(
                    (faq, index) => (
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
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {t("homepage.contact.title")}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {t("homepage.contact.support_options")}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Mail className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {t("homepage.contact.email_support")}
                          </h4>
                          <p className="text-gray-600">
                            {t("homepage.contact.email_address")}
                          </p>
                          <p className="text-sm text-gray-500">
                            {t("homepage.contact.email_response")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <MessageSquare className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {t("homepage.contact.live_chat")}
                          </h4>
                          <p className="text-gray-600">
                            {t("homepage.contact.live_chat_hours")}
                          </p>
                          <p className="text-sm text-gray-500">
                            {t("homepage.contact.live_chat_location")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <User className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {t("homepage.contact.help_center")}
                          </h4>
                          <p className="text-gray-600">
                            {t("homepage.contact.help_center_desc")}
                          </p>
                          <p className="text-sm text-gray-500">
                            {t("homepage.contact.help_center_articles")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <form className="space-y-4" onSubmit={submitEmail}>
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("homepage.contact.form.name")}
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("homepage.contact.form.email")}
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="issue"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("homepage.contact.form.issue")}
                        </label>
                        <select
                          id="issue"
                          value={formData.issue}
                          onChange={handleInputChange}
                          className="outline-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="" disabled>
                            {t("homepage.contact.form.issue_options.0")}{" "}
                            {/* Shows "Select an option" */}
                          </option>
                          {t("homepage.contact.form.issue_options", {
                            returnObjects: true,
                          })
                            .filter((_, index) => index > 0) // Skip the first option since we already added it
                            .map((option, index) => (
                              <option key={index + 1} value={option}>
                                {" "}
                                {/* index + 1 to maintain unique keys */}
                                {option}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("homepage.contact.form.message")}
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        ></textarea>
                      </div>
                      {submitStatus.message && (
                        <div
                          className={`p-3 rounded-lg ${
                            submitStatus.success
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {submitStatus.message}
                        </div>
                      )}
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? t("homepage.contact.form.sending")
                          : t("homepage.contact.form.send")}
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

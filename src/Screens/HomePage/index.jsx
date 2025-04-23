import {
  Mail,
  MessageSquare,
  FileText,
  Zap,
  Download,
  User,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Homepage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("getting-started");
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
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
                    <form className="space-y-4">
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                          {t("homepage.contact.form.issue_options", {
                            returnObjects: true,
                          }).map((option, index) => (
                            <option key={index}>{option}</option>
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {t("homepage.contact.form.send")}
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

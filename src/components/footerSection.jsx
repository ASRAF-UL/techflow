import React from "react";

const FooterSection = ({ title, children }) => {
  return (
    <div className="flex flex-col space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
      <div className="flex flex-col space-y-2">{children}</div>
    </div>
  );
};

export default FooterSection;

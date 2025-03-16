import React from "react";

const FooterLink = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-gray-500 hover:text-green-600 transition-colors duration-200"
    >
      {children}
    </a>
  );
};

export default FooterLink;

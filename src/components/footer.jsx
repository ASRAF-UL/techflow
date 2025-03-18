import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Apple,
  ShoppingBag,
} from "lucide-react";
import FooterSection from "./footerSection";
import FooterLink from "./footerLink";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="w-full mx-auto px-[7%] py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-3">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="http://localhost:3000/logo.png"
                alt="logo"
                className="h-[44px]"
              />
            </div>
            <p className="text-gray-500 mb-4">
              We're Grocery Shop, an innovative team of food suppliers.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-7 h-7 p-1 bg-main-green text-white rounded-full" />
                <span className="text-large-text">
                  789 Inner Lane, Blyes park, California, USA
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-7 h-7 p-1 bg-main-green text-white rounded-full" />
                <span className="text-large-text">+00 123 456 789</span>
                <span className="text-gray-400">or</span>
                <span className="text-large-text">+00 987 654 012</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-7 h-7 p-1 bg-main-green text-white rounded-full" />
                <span className="text-large-text">support24@marketpro.com</span>
              </div>
            </div>
          </div>

          {/* Information */}
          <FooterSection title="Information">
            <FooterLink href="/become-vendor">Become a Vendor</FooterLink>
            <FooterLink href="/affiliate">Affiliate Program</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/suppliers">Our Suppliers</FooterLink>
            <FooterLink href="/extended-plan">Extended Plan</FooterLink>
          </FooterSection>

          {/* Customer Support */}
          <FooterSection title="Customer Support">
            <FooterLink href="/help">Help Center</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/report">Report Abuse</FooterLink>
            <FooterLink href="/submit-dispute">Submit and Dispute</FooterLink>
            <FooterLink href="/policies">Policies & Rules</FooterLink>
          </FooterSection>
          <FooterSection title="My Account">
            <FooterLink href="/my-account">My Account</FooterLink>
            <FooterLink href="/order-history">Order History</FooterLink>
            <FooterLink href="/shopping-cart">Shopping Cart</FooterLink>
            <FooterLink href="/compare">Compare</FooterLink>
            <FooterLink href="/help-ticket">Help Ticket</FooterLink>
            <FooterLink href="/wishlist">Wishlist</FooterLink>
          </FooterSection>
          {/* Daily Groceries */}
          <FooterSection title="Daily Groceries">
            <FooterLink href="/dairy-eggs">Dairy & Eggs</FooterLink>
            <FooterLink href="/meat-seafood">Meat & Seafood</FooterLink>
            <FooterLink href="/breakfast">Breakfast Food</FooterLink>
            <FooterLink href="/household">Household Supplies</FooterLink>
            <FooterLink href="/pantry">Pantry Staples</FooterLink>
          </FooterSection>

          {/* Shop on The Go */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Shop on The Go
            </h3>
            <p className="text-gray-500 mb-4">
              Marketpro App is available. Get it now
            </p>
            <div className="flex space-x-4 mb-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="App Store"
                className="h-10"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Play Store"
                className="h-10"
              />
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5 text-gray-600 hover:text-green-600" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5 text-gray-600 hover:text-green-600" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5 text-gray-600 hover:text-green-600" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5 text-gray-600 hover:text-green-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
      </div>
      <div className="h-28 w-full px-[7%] bg-light-green pt-8 border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            Marketpro eCommerce © 2024. All Rights Reserved
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-gray-600 text-sm">We Are Accepting</span>
            <div className="flex space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import {Link} from 'react-router'
export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-8 px-10 flex items-center justify-between">
      
      {/* Left: Logo */}
      <div className="flex-1">
        <Link to="/" className="text-3xl font-roboto-serif font-bold text-primary-green">
          PlateMate.
        </Link>
      </div>

      {/* Center: Copyright */}
      <div className="flex-1 text-center text-gray-500 font-medium text-sm tracking-wide">
        © 2024 PlateMate. Cooking with passion.
      </div>

      {/* Right: Navigation Links */}
      <div className="flex-1 flex justify-end space-x-6 text-gray-500 font-medium text-sm">
        <Link to="/privacy-policy" className="hover:text-green-800 transition-colors">
          Privacy Policy
        </Link>
        <Link to="/terms-of-service" className="hover:text-green-800 transition-colors">
          Terms of Service
        </Link>
        <Link to="/contact" className="hover:text-green-800 transition-colors">
          Contact Us
        </Link>
      </div>
      
    </footer>
  );
};
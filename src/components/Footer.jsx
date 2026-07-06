import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <Link
          to="/"
          className="text-3xl font-roboto-serif font-bold text-primary-green"
        >
          PlateMate.
        </Link>


        <p className="text-sm font-medium tracking-wide text-gray-500">
          © 2026 PlateMate. Cooking with passion.
        </p>

        {/* Links */}
        <div className="flex flex-col gap-3 text-sm font-medium text-gray-500 sm:flex-row sm:gap-6">
          <Link
            to="/privacy-policy"
            className="transition-colors hover:text-green-800"
          >
            Privacy Policy
          </Link>

          <Link
            to="/terms-of-service"
            className="transition-colors hover:text-green-800"
          >
            Terms of Service
          </Link>

          <Link
            to="/contact"
            className="transition-colors hover:text-green-800"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
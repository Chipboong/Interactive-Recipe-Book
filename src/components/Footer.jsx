import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <Link
          to="/"
          className="font-roboto-serif font-bold text-primary-green"
          style={{ fontSize: 'clamp(1.3rem, 1rem + 1.5vw, 1.875rem)' }}
        >
          PlateMate
        </Link>

        <p className="font-roboto text-sm font-medium tracking-wide text-gray-500">
          © 2026 PlateMate. Cooking with passion.
        </p>
      </div>
    </footer>
  );
}
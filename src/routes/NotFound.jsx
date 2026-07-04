import { Link } from "react-router";

export default function NotFound() {
  return (
    <div
      style={{ height: "calc(100dvh - 100px - 73px)" }}
      className="flex items-center justify-center px-6"
    >
      <div className="max-w-md text-center">
        <h1 className="text-[67px] font-extrabold text-primary-green">404</h1>

        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Page not found
        </h2>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Looks like you've stumbled upon a page that doesn't exist or may have
          been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-primary-green px-6 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1
          className="text-6xl font-bold mb-4"
          style={{ color: "#1A3A5C", fontFamily: "var(--font-libre-franklin)" }}
        >
          404
        </h1>
        <h2
          className="text-2xl font-semibold mb-3"
          style={{ color: "#1C2028", fontFamily: "var(--font-libre-franklin)" }}
        >
          Page Not Found
        </h2>
        <p className="mb-8" style={{ color: "#5A6577" }}>
          The peptide page you are looking for does not exist or may have been moved.
          Please check the URL or return to the homepage.
        </p>
        <Link
          href="/"
          className="btn-primary"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}

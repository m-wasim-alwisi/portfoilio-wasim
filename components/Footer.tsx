export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          © {currentYear} Wasim. Crafted with
          <span className="inline-block mx-1.5 text-red-500 animate-pulse" aria-label="love">
            ❤️
          </span>
          using Next.js & Tailwind CSS.
        </p>
        {/* Optional: Add social links or a small note */}
        <p className="mt-2 text-gray-500 dark:text-gray-500 text-xs">
          Passionate about building for the web.
        </p>
      </div>
    </footer>
  );
}
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8 text-sm text-gray-400">
        <div>
          <h3 className="text-white font-semibold mb-2">SmartSchool</h3>
          <p>Next-gen School Management Platform.</p>
        </div>

        <div>
          <h4 className="text-white mb-2">Platform</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/admissions">Admissions</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-2">Resources</h4>
          <ul className="space-y-1">
            <li>Documentation</li>
            <li>Security</li>
            <li>API</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-2">Contact</h4>
          <p>support@smartschool.com</p>
          <p>+91 90000 00000</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-6">
        © {new Date().getFullYear()} SmartSchool. All rights reserved.
      </div>
    </footer>
  );
}

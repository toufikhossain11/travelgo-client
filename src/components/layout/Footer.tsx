import Link from "next/link";
import { FiCompass } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const footerLinks = {
  explore: [
    { label: "Destinations", href: "/explore" },
    { label: "Trip packages", href: "/packages" },
    { label: "Categories", href: "/explore" },
    { label: "Travel blog", href: "/blog" },
  ],
  support: [
    { label: "Help center", href: "/help" },
    { label: "Contact us", href: "/contact" },
    { label: "Cancellation policy", href: "/help#cancellation" },
    { label: "Privacy & terms", href: "/privacy" },
  ],
};

const socialIcons = [FaFacebookF, FaInstagram, FaXTwitter, FaYoutube];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0F172A]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 md:grid-cols-5 md:px-8">
        <div className="col-span-2">
          <Link href="/" className="font-display flex items-center gap-2 text-lg font-bold text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-emerald">
              <FiCompass className="h-3.5 w-3.5 text-white" />
            </span>
            TravelGo
          </Link>
          <p className="mt-4 max-w-xs text-sm text-slate-400">
            Curated tour packages from vetted local operators in 42 countries.
          </p>
          <div className="mt-5 flex gap-3">
            {socialIcons.map((Icon, i) => (
              <Link
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition hover:border-slate-500"
              >
                <Icon className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-white">Explore</p>
          <ul className="space-y-2.5 text-sm text-slate-400">
            {footerLinks.explore.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-white">Support</p>
          <ul className="space-y-2.5 text-sm text-slate-400">
            {footerLinks.support.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-white">Contact</p>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>hello@travelgo.com</li>
            <li>+880 1234 567 890</li>
            <li>Gulshan Ave, Dhaka, BD</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © 2026 TravelGo. All rights reserved.
      </div>
    </footer>
  );
}

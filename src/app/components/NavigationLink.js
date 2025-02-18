import { FaWaze } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { TfiApple } from "react-icons/tfi";

const navigationLinks = [
  {
    name: "Waze",
    href: "https://www.waze.com/ul?ll=43.507672,1.326138&navigate=yes",
    icon: <FaWaze />,
    ariaLabel: "Ouvrir dans Waze",
  },
  {
    name: "Google Maps",
    href: "https://www.google.com/maps/search/?api=1&query=43.507672,1.326138",
    icon: <SiGooglemaps />,
    ariaLabel: "Ouvrir dans Google Maps",
  },
  {
    name: "Apple Maps",
    href: "http://maps.apple.com/?q=Monica+Mariage&ll=43.507672,1.326138",
    icon: <TfiApple />,
    ariaLabel: "Ouvrir dans Apple Maps",
  },
];

export default function NavigationLinks() {
  return (
    <div className="flex justify-center gap-6 mt-10">
      {navigationLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-7xl md:text-3xl text-[#53240f] hover:opacity-80"
          aria-label={link.ariaLabel}
        >
          {link.icon}
          <span className="text-sm mt-1">{link.name}</span>
        </a>
      ))}
    </div>
  );
}

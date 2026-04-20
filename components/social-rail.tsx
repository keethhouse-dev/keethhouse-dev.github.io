"use client";

import { Mail, Instagram } from "lucide-react";

export default function SocialRail() {
  return (
    <div
      aria-label="Contact Keeth House"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-stretch rounded-l-sm overflow-hidden shadow-[0_12px_30px_-12px_rgba(29,25,20,0.35)] bg-primary"
    >
      <RailLink
        href="https://wa.me/918124338124"
        label="WhatsApp Keeth House"
        external
      >
        <WhatsAppGlyph />
      </RailLink>
      <div className="h-px bg-[var(--story-ink)]/15 mx-3" aria-hidden />
      <RailLink
        href="mailto:reservations@keethhouse.com"
        label="Email Keeth House"
      >
        <Mail className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </RailLink>
      <div className="h-px bg-[var(--story-ink)]/15 mx-3" aria-hidden />
      <RailLink
        href="https://www.instagram.com/keethhouse/"
        label="Keeth House on Instagram"
        external
      >
        <Instagram className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </RailLink>
    </div>
  );
}

function RailLink({
  href,
  label,
  children,
  external = false,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="w-12 h-12 flex items-center justify-center text-white/90 hover:text-white hover:bg-black/10 transition-colors duration-200"
    >
      {children}
    </a>
  );
}

/* Clean minimal WhatsApp glyph — no Lucide WhatsApp exists, so inline SVG. */
function WhatsAppGlyph() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.67-.51-.172-.008-.37-.01-.569-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347M12.057 21.785h-.004A9.87 9.87 0 0 1 7.1 20.45l-.356-.211-3.687.967.985-3.595-.232-.369a9.86 9.86 0 0 1-1.511-5.26c.002-5.45 4.437-9.884 9.891-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.88 11.88 0 0 0 5.684 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.82 11.82 0 0 0-3.48-8.413" />
    </svg>
  );
}

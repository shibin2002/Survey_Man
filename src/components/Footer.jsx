import { company, navLinks, services } from "../data/content"
import { scrollToId } from "../hooks/useLenis"
import Logo from "./Logo"

export default function Footer() {
  return (
    <footer className="bg-accent text-on-accent">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 pt-10 pb-8 md:grid-cols-4 md:gap-6 md:px-8 md:pt-12 md:pb-6">
        <div className="md:col-span-2">
          <Logo invert className="h-16 w-auto max-w-[80vw] object-contain md:h-24 md:max-w-none" />
          <p className="mt-1 max-w-sm text-white/75">{company.tagline}</p>
          <p className="mt-1 text-sm text-white/60">Trusted since {company.since}.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-white/55 uppercase">Navigate</p>
          <ul className="mt-2 space-y-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => scrollToId(link.href)}
                  className="text-white/85 transition-colors hover:text-white"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-white/55 uppercase">Services</p>
          <ul className="mt-3 space-y-1.5 text-sm text-white/75">
            {services.map((service) => (
              <li key={service.id}>{service.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-1.5 px-5 pt-2 pb-6 text-sm text-white/60 md:flex-row md:justify-between md:px-8 md:pt-2 md:pb-8">
          <p>© {new Date().getFullYear()} Survey Man. All rights reserved.</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${company.lat},${company.lng}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            {company.locationLine}
          </a>
        </div>
      </div>
    </footer>
  )
}

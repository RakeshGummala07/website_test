import { Link } from "react-router-dom";
import { Linkedin, Github, Twitter } from "lucide-react";
import Logo from "./Logo";
import { company } from "../config/company";
import { services } from "../data/services";

const socialIcons = { linkedin: Linkedin, github: Github, twitter: Twitter };

export default function Footer() {
  const year = new Date().getFullYear();
  const activeSocials = Object.entries(company.social).filter(([, url]) => url);

  return (
    <footer className="relative border-t border-white/[0.06] mt-20">
      <div className="container-px section-py grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
        <div className="col-span-2">
          <Logo />
          <p className="mt-4 text-sm text-ink-400 max-w-xs leading-relaxed">
            Building secure, scalable and modern digital solutions.
          </p>

          {activeSocials.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              {activeSocials.map(([key, url]) => {
                const Icon = socialIcons[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={key}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-ink-400 hover:text-ink-100 hover:border-white/[0.2] transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-sm font-medium text-ink-100">Company</h4>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-400">
            <li>
              <Link to="/about" className="hover:text-ink-100 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-ink-100 transition-colors">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-ink-100">Services</h4>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-400">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services" className="hover:text-ink-100 transition-colors">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-ink-100">Contact</h4>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-400">
            <li>{company.location.city}, {company.location.country}</li>
            <li>
              <Link to="/products" className="hover:text-ink-100 transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-ink-100 transition-colors">
                Get in touch
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-px py-6 border-t border-white/[0.06] flex flex-col-reverse md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-ink-500">
          © {year} {company.legalName}. All rights reserved.
        </p>
        <p className="text-xs text-ink-500">Hyderabad, Telangana, India</p>
      </div>
    </footer>
  );
}

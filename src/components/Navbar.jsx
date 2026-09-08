import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import { company } from "../config/company";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => setOpen(false), [location.pathname]);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="container-px pt-4 md:pt-5">
        <motion.div
          animate={{
            backgroundColor: scrolled ? "rgba(11,11,16,0.72)" : "rgba(11,11,16,0)",
            borderColor: scrolled ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0)",
            boxShadow: scrolled ? "0 8px 30px -12px rgba(0,0,0,0.6)" : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto mx-auto max-w-6xl rounded-2xl border backdrop-blur-xl"
        >
          <nav className="flex items-center justify-between px-4 md:px-5 py-3">
            <NavLink to="/" aria-label="Jayanth Technologies home">
              <Logo className="h-8 md:h-9" />
            </NavLink>

            <ul className="hidden md:flex items-center gap-1">
              {company.nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `relative px-3.5 py-2 text-sm rounded-full transition-colors duration-200 ${
                        isActive ? "text-ink-100" : "text-ink-400 hover:text-ink-100"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] border border-white/[0.08]"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <Button to="/contact" size="md">
                Let&apos;s Talk
              </Button>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] text-ink-200"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto md:hidden fixed inset-0 top-0 bg-base-950/98 backdrop-blur-2xl"
          >
            <div className="container-px pt-24 pb-10 h-full flex flex-col">
              <ul className="flex flex-col gap-1">
                {company.nav.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `block py-3.5 text-3xl font-display border-b border-white/[0.06] ${
                          isActive ? "text-ink-100" : "text-ink-400"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * company.nav.length, duration: 0.35 }}
                className="mt-auto pt-8"
              >
                <Button to="/contact" size="lg" className="w-full">
                  Let&apos;s Talk
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

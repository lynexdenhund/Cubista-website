"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface SiteHeaderProps {
  onScheduleDemo: () => void
}

export function SiteHeader({ onScheduleDemo }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const navLinks = [
    { href: "/product", label: "Product" },
    { href: "/research", label: "Research" },
    { href: "/about", label: "About" },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navRef.current &&
        toggleRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    function handleResize() {
      if (window.innerWidth > 960) setIsOpen(false)
    }

    document.addEventListener("click", handleClickOutside)
    window.addEventListener("resize", handleResize)
    return () => {
      document.removeEventListener("click", handleClickOutside)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <header className="py-3">
      <div className="mx-auto flex w-[min(1040px,92vw)] items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/imgs/cubista-blue-logo.png"
            alt="Cubista"
            width={131}
            height={32}
            className="w-[131px] max-md:w-[118px]"
            priority
          />
        </Link>

        <nav
          ref={navRef}
          aria-label="Main navigation"
          className={`flex items-center gap-6 text-[13px] font-medium text-cubista-gray-600 ml-auto mr-3.5 
            max-[960px]:hidden ${
              isOpen
                ? "max-[960px]:!flex max-[960px]:!absolute max-[960px]:top-[calc(100%+10px)] max-[960px]:left-0 max-[960px]:right-0 max-[960px]:z-20 max-[960px]:flex-col max-[960px]:gap-2.5 max-[960px]:rounded-[14px] max-[960px]:border max-[960px]:border-cubista-gray-200 max-[960px]:bg-white max-[960px]:p-3.5 max-[960px]:shadow-lg"
                : ""
            }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition-colors duration-200 hover:text-cubista-blue ${
                pathname === link.href
                  ? "text-cubista-blue after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-sm after:bg-cubista-blue"
                  : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isOpen && (
            <button
              onClick={() => {
                setIsOpen(false)
                onScheduleDemo()
              }}
              className="mt-2 inline-flex items-center gap-1.5 self-center rounded-full bg-cubista-gold px-4 py-2.5 text-xs font-medium text-white transition-all hover:brightness-110 hover:opacity-85"
            >
              Schedule a Demo
            </button>
          )}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          className="hidden max-[960px]:inline-flex ml-auto h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-cubista-gray-300 bg-white p-0 flex-col gap-[5px] cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block h-0.5 w-[18px] rounded-full bg-cubista-gray-800 transition-transform duration-300 ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-[18px] rounded-full bg-cubista-gray-800 transition-opacity duration-200 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-[18px] rounded-full bg-cubista-gray-800 transition-transform duration-300 ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>

        <button
          onClick={onScheduleDemo}
          className="inline-flex items-center gap-1.5 rounded-full bg-cubista-gold px-4 py-2.5 text-xs font-medium leading-none text-white transition-all hover:brightness-110 hover:opacity-85 max-[960px]:hidden"
        >
          <Image
            src="/assets/svg/calendar-check-02.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
            className="transition-transform duration-300 hover:translate-x-[3px]"
          />
          <span>Schedule a Demo</span>
        </button>
      </div>
    </header>
  )
}

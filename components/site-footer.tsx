import Link from "next/link"
import Image from "next/image"

interface SiteFooterProps {
  dark?: boolean
}

export function SiteFooter({ dark = false }: SiteFooterProps) {
  return (
    <footer
      className={`${
        dark
          ? "mt-0 bg-[#070e23] py-5 text-[#cbd5e1]"
          : "text-cubista-gray-500"
      }`}
    >
      <div className="mx-auto grid w-[min(1040px,92vw)] grid-cols-[auto_1fr_auto] items-center gap-4 pt-2 text-xs max-[960px]:grid-cols-1 max-[960px]:justify-items-center max-[960px]:gap-2.5 max-[960px]:text-center">
        <Image
          src="/assets/imgs/cubista-black.png"
          alt="Cubista"
          width={86}
          height={21}
          className={`w-[86px] ${dark ? "brightness-0 invert" : ""}`}
        />
        <nav
          aria-label="Footer links"
          className="flex items-center justify-center gap-2.5"
        >
          <Link
            href="/product"
            className={`transition-colors duration-300 ${
              dark ? "hover:text-white" : "hover:text-cubista-blue"
            }`}
          >
            Product
          </Link>
          <span aria-hidden="true" className="pointer-events-none">
            {"·"}
          </span>
          <Link
            href="/research"
            className={`transition-colors duration-300 ${
              dark ? "hover:text-white" : "hover:text-cubista-blue"
            }`}
          >
            Research
          </Link>
          <span aria-hidden="true" className="pointer-events-none">
            {"·"}
          </span>
          <Link
            href="/about"
            className={`transition-colors duration-300 ${
              dark ? "hover:text-white" : "hover:text-cubista-blue"
            }`}
          >
            About
          </Link>
          <span aria-hidden="true" className="pointer-events-none">
            {"·"}
          </span>
          <a
            href="https://www.linkedin.com/company/cubista/"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold transition-colors duration-300 ${
              dark ? "hover:text-white" : "hover:text-cubista-blue"
            }`}
          >
            in
          </a>
        </nav>
        <p>{"Privacy Policy - \u00A9 2026 Cubista"}</p>
      </div>
    </footer>
  )
}

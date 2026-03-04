"use client"

import { useState } from "react"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { DemoModal } from "./demo-modal"

interface PageLayoutProps {
  children: React.ReactNode
  darkFooter?: boolean
}

export function PageLayout({ children, darkFooter = false }: PageLayoutProps) {
  const [demoOpen, setDemoOpen] = useState(false)

  return (
    <>
      <SiteHeader onScheduleDemo={() => setDemoOpen(true)} />
      {typeof children === "function"
        ? (children as (openDemo: () => void) => React.ReactNode)(() =>
            setDemoOpen(true)
          )
        : children}
      <SiteFooter dark={darkFooter} />
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  )
}

interface PageLayoutWithDemoProps {
  children: (openDemo: () => void) => React.ReactNode
  darkFooter?: boolean
}

export function PageLayoutWithDemo({
  children,
  darkFooter = false,
}: PageLayoutWithDemoProps) {
  const [demoOpen, setDemoOpen] = useState(false)

  return (
    <>
      <SiteHeader onScheduleDemo={() => setDemoOpen(true)} />
      {children(() => setDemoOpen(true))}
      <SiteFooter dark={darkFooter} />
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  )
}

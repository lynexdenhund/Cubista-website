"use client"

import { useEffect, useRef } from "react"

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll(".reveal-on-scroll").forEach((child) => {
        child.classList.add("is-visible")
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    )

    el.querySelectorAll(".reveal-on-scroll").forEach((child, index) => {
      ;(child as HTMLElement).style.animationDelay = `${(index % 4) * 70}ms`
      observer.observe(child)
    })

    return () => observer.disconnect()
  }, [])

  return ref
}

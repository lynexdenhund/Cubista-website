"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Script from "next/script"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

const API_URL = "https://staging.cubista.link/api/contact/landing/"
const TURNSTILE_SITE_KEY = "0x4AAAAAACiqvXUut-FDDY7C"

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; theme: string; size: string }
      ) => string
      getResponse: (id: string) => string
      reset: (id: string) => void
    }
  }
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [feedback, setFeedback] = useState<{
    text: string
    type: "success" | "error" | ""
  }>({ text: "", type: "" })
  const [submitting, setSubmitting] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (isOpen && turnstileRef.current && window.turnstile && widgetIdRef.current === null) {
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "light",
        size: "normal",
      })
    }
  }, [isOpen])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) handleClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  })

  function handleClose() {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 250)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    const token =
      window.turnstile && widgetIdRef.current
        ? window.turnstile.getResponse(widgetIdRef.current)
        : ""

    if (!token) {
      setFeedback({
        text: "Please complete the captcha verification.",
        type: "error",
      })
      return
    }

    const formData = new FormData(form)
    const body = {
      name: (formData.get("name") as string)?.trim(),
      email: (formData.get("email") as string)?.trim(),
      company: (formData.get("company") as string)?.trim(),
      role: (formData.get("role") as string)?.trim(),
      additional_info: (formData.get("additional_info") as string)?.trim(),
      captcha_token: token,
    }

    setSubmitting(true)
    setFeedback({ text: "", type: "" })

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error(`Request failed (${res.status})`)

      setFeedback({ text: "Thank you! We'll be in touch soon.", type: "success" })
      form.reset()
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current)
      }
      setTimeout(handleClose, 2000)
    } catch {
      setFeedback({
        text: "Something went wrong. Please try again.",
        type: "error",
      })
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current)
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen && !isClosing) return null

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
      />
      <div
        className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm ${
          isClosing ? "animate-[demo-overlay-out_0.25s_ease_forwards]" : "animate-[demo-overlay-in_0.3s_ease_forwards]"
        } max-[640px]:items-stretch`}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose()
        }}
      >
        <div
          className={`relative w-[90vw] max-w-[560px] rounded-[40px] bg-white p-12 px-[52px] shadow-2xl ${
            isClosing
              ? "animate-[demo-modal-out_0.25s_ease_forwards]"
              : "animate-[demo-modal-in_0.35s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          } max-[640px]:max-w-none max-[640px]:rounded-none max-[640px]:h-full max-[640px]:w-full max-[640px]:overflow-y-auto max-[640px]:px-6 max-[640px]:py-14`}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-7 top-6 border-none bg-transparent p-0 leading-none cursor-pointer hover:opacity-60 max-[640px]:right-4 max-[640px]:top-4"
            onClick={handleClose}
          >
            <Image
              src="/assets/svg/demo/Voice.svg"
              alt=""
              width={26}
              height={26}
            />
          </button>

          <h2 className="m-0 text-center text-[50px] font-bold leading-[1.15] text-cubista-blue max-[640px]:text-[34px]">
            Get in Touch.
          </h2>
          <p className="mt-2 text-center text-lg font-medium text-black">
            Schedule a demo or ask us anything.
          </p>

          <form
            ref={formRef}
            className="mt-8 flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            <DemoField
              icon="/assets/svg/demo/input-icons-4.svg"
              type="text"
              name="name"
              placeholder="Name*"
              required
            />
            <DemoField
              icon="/assets/svg/demo/input-icons-3.svg"
              type="email"
              name="email"
              placeholder="Email*"
              required
            />
            <DemoField
              icon="/assets/svg/demo/input-icons-2.svg"
              type="text"
              name="company"
              placeholder="Company*"
              required
            />
            <DemoField
              icon="/assets/svg/demo/input-icons-1.svg"
              type="text"
              name="role"
              placeholder="Role/Title*"
              required
            />
            <div className="relative flex items-start">
              <Image
                src="/assets/svg/demo/input-icons.svg"
                alt=""
                width={16}
                height={16}
                className="pointer-events-none absolute left-[18px] top-[18px]"
                aria-hidden="true"
              />
              <textarea
                name="additional_info"
                placeholder="What's your biggest relationship data challenge?"
                className="w-full min-h-[110px] resize-y rounded-3xl border-[1.5px] border-[#d4d4d4] bg-white py-4 pl-11 pr-[18px] font-[inherit] text-sm text-[#1a1a1a] outline-none transition-colors focus:border-cubista-blue placeholder:text-[#888]"
              />
            </div>

            <p className="mt-2 text-[13px] italic text-[#c24]">
              *Required fields
            </p>

            <div ref={turnstileRef} className="mt-2 flex justify-center" />

            {feedback.text && (
              <p
                className={`mt-2 text-center text-sm font-medium ${
                  feedback.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {feedback.text}
              </p>
            )}

            <div className="mt-5 flex justify-end gap-3.5 max-[640px]:flex-col-reverse">
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer rounded-full border-[1.5px] border-[#d4d4d4] bg-white px-8 py-3 font-[inherit] text-sm font-medium text-[#363636] transition-all hover:border-[#999] hover:opacity-80 max-[640px]:w-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="cursor-pointer rounded-full border-none bg-cubista-gold px-8 py-3 font-[inherit] text-sm font-semibold text-white transition-all hover:brightness-110 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60 max-[640px]:w-full"
              >
                {submitting ? "Sending\u2026" : "Request Demo"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes demo-overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes demo-overlay-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes demo-modal-in {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes demo-modal-out {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.92) translateY(20px); }
        }
      `}</style>
    </>
  )
}

function DemoField({
  icon,
  type,
  name,
  placeholder,
  required,
}: {
  icon: string
  type: string
  name: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div className="relative flex items-center">
      <Image
        src={icon}
        alt=""
        width={16}
        height={16}
        className="pointer-events-none absolute left-[18px]"
        aria-hidden="true"
      />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-full border-[1.5px] border-[#d4d4d4] bg-white py-3.5 pl-11 pr-[18px] font-[inherit] text-sm text-[#1a1a1a] outline-none transition-colors focus:border-cubista-blue placeholder:text-[#888]"
      />
    </div>
  )
}

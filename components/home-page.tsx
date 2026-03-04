"use client"

import Image from "next/image"
import { PageLayoutWithDemo } from "./page-layout"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const PPTX_URL =
  "https://www.dropbox.com/scl/fi/b49vqttcpgkfo7z1r22vt/2026-State-of-the-Relationship-Driven-Enterprise-Survey-rev-G-2025-12-10.pptx?rlkey=jdbse7eyl3erkw01nh2dehedl&e=3&dl=1"

function getViewerUrl() {
  return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(PPTX_URL)}`
}

export function HomePageClient() {
  const mainRef = useScrollReveal<HTMLElement>()

  return (
    <PageLayoutWithDemo darkFooter>
      {(openDemo) => (
        <main ref={mainRef}>
          {/* Hero */}
          <section className="mx-auto w-[min(1040px,92vw)] pt-[22px] text-center">
            <h1 className="m-0 text-[clamp(34px,5vw,64px)] font-bold leading-[1.06] tracking-tight text-[#17233e]">
              Unlock Your Relationship Data
            </h1>
            <p className="mx-auto mt-4 text-[clamp(17px,2vw,30px)] leading-[1.35] text-[#2e3a55]">
              Uncover opportunities, strengthen connections,
              <br />
              and drive growth-all in one platform.
            </p>
            <button
              onClick={openDemo}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-cubista-gold px-4 py-2.5 text-xs font-medium leading-none text-white transition-all hover:brightness-110 hover:opacity-85"
            >
              <Image
                src="/assets/svg/home/calendar-check-02.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden="true"
              />
              <span>Schedule a Demo</span>
            </button>

            <div className="relative z-[1] mx-auto mt-9 -mb-[110px] w-[min(860px,100%)]">
              <Image
                src="/assets/imgs/home/first-section-main-chat.png"
                alt="Cubista relationship intelligence interface"
                width={860}
                height={540}
                className="w-full"
                priority
              />
            </div>
          </section>

          {/* Fragmentation */}
          <section className="reveal-on-scroll relative z-[2] mt-0 border-t border-[#e0e0e0] bg-background pt-[62px]">
            <div className="mx-auto grid w-[min(1040px,92vw)] grid-cols-[1fr_minmax(260px,355px)] items-center gap-[30px] max-[960px]:grid-cols-1">
              <div>
                <h2 className="m-0 text-[35px] font-medium leading-[1.18] text-cubista-blue-dark">
                  Avoid Fragmentation
                </h2>
                <p className="mt-3 max-w-[630px] text-lg leading-relaxed text-cubista-blue">
                  Relationship intelligence breaks when it{"'"}s scattered across
                  inboxes, CRMs, chat threads, and disconnected notes.
                </p>
                <p className="mt-3 max-w-[630px] text-lg leading-relaxed text-black">
                  Cubista centralizes those signals and maps them into one living
                  context layer your team can actually use.
                </p>
              </div>
              <Image
                src="/assets/imgs/home/integrations.png"
                alt="Cubista integrations screen"
                width={355}
                height={300}
                className="w-full max-[960px]:mx-auto max-[960px]:max-w-[380px]"
              />
            </div>
          </section>

          {/* Problem */}
          <section className="reveal-on-scroll mt-[72px] text-center">
            <div
              className="mx-auto mb-[52px] h-0 w-[432px] max-w-[90vw] border-t border-[#e0e0e0]"
              aria-hidden="true"
            />
            <div className="mx-auto w-[min(1040px,92vw)]">
              <h2 className="m-0 text-[35px] font-medium leading-[1.2] text-cubista-blue-dark max-[640px]:text-[30px]">
                Why Existing Solutions Don{"'"}t Solve the Problem
              </h2>
              <p className="mx-auto mt-2.5 max-w-[740px] text-lg leading-[1.7] text-black">
                Legacy tools collect records-not relationships. They miss
                influence paths, trust signals, and the real-time context that
                drives decisions in relationship-driven enterprises.
              </p>
            </div>
          </section>

          {/* Help */}
          <section className="reveal-on-scroll mt-[78px] overflow-hidden bg-cubista-dark py-[74px] pb-[82px] text-white max-[960px]:mt-[66px]">
            <div className="mx-auto w-[min(1040px,92vw)]">
              <h2 className="m-0 text-center text-[50px] font-medium text-white max-[640px]:text-[36px]">
                Cubista Can Help
              </h2>
              <p className="mx-auto mt-2.5 mb-[100px] max-w-[720px] text-center text-xl text-white">
                Cubista was built to solve this exact problem. With Cubista, you
                can:
              </p>

              <div className="grid grid-cols-2 items-stretch gap-[46px] max-[960px]:grid-cols-1">
                <div>
                  <h3 className="m-0 text-[25px] font-semibold text-[#8aa2ff]">
                    Unify All Your Relationship Data
                  </h3>
                  <p className="mt-2.5 mb-[50px] text-xl leading-relaxed text-white">
                    Seamlessly integrate data from emails, CRMs, calendars,
                    spreadsheets, and external platforms into a single, trusted
                    source of truth.
                  </p>

                  <h3 className="mt-[50px] text-[25px] font-semibold text-[#8aa2ff]">
                    Leverage a Conversational AI Tool
                  </h3>
                  <p className="mt-2.5 mb-[50px] text-xl leading-relaxed text-white">
                    Ask questions, uncover insights, and take action-all in
                    natural language. Tuned specifically to relationship data, it
                    unlocks:
                  </p>
                  <ul className="mb-[50px] list-disc pl-5">
                    <li className="mb-2.5 text-xl leading-relaxed text-white">
                      <span className="text-[#8aa2ff]">
                        Hidden Opportunities:
                      </span>{" "}
                      Identify untapped connections and missed follow-ups.
                    </li>
                    <li className="mb-2.5 text-xl leading-relaxed text-white">
                      <span className="text-[#8aa2ff]">
                        Stronger Relationships:
                      </span>{" "}
                      Personalize every interaction with the right context.
                    </li>
                    <li className="mb-2.5 text-xl leading-relaxed text-white">
                      <span className="text-[#8aa2ff]">Smarter Decisions:</span>{" "}
                      Act with confidence, knowing you have the full picture.
                    </li>
                  </ul>
                  <p className="text-xl leading-relaxed text-white">
                    By transforming scattered information into a strategic asset,
                    Cubista empowers you to strengthen relationships, uncover
                    growth opportunities, and make faster, smarter decisions.
                  </p>
                </div>
                <div className="relative flex items-center justify-center">
                  <Image
                    src="/assets/imgs/home/chat-elipse.png"
                    alt=""
                    width={600}
                    height={600}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  <Image
                    src="/assets/imgs/home/third-section-chat.png"
                    alt="Cubista chat interface"
                    width={460}
                    height={500}
                    className="relative z-[1] h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* Needed Card */}
              <article className="reveal-on-scroll mx-auto mt-[94px] max-w-[840px] rounded-[40px] bg-cubista-dark-surface p-10 px-8 text-center max-[640px]:p-[25px] max-[640px]:px-4">
                <h3 className="m-0 text-[50px] font-medium leading-[1.15] text-white">
                  What Is Really Needed
                </h3>
                <p className="mx-auto mt-4 max-w-[720px] text-2xl leading-[1.55] text-[#8aa2ff]">
                  A solution that unifies all relationship data, regardless of
                  where it lives-no silos, no gaps-and provides a conversational
                  AI tool specifically tuned to relationship data. This tool
                  should make it easy to extract critical insights, uncover hidden
                  opportunities, and act with confidence.
                </p>
                <button
                  onClick={() => window.open(getViewerUrl(), "_blank")}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border-none bg-cubista-blue px-5 py-3 text-sm font-medium text-white transition-all hover:brightness-110 hover:opacity-85"
                >
                  <span>
                    Explore the State of the Relationship-Driven Enterprise
                  </span>
                  <Image
                    src="/assets/svg/home/arrow-narrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 hover:translate-x-1"
                  />
                </button>
              </article>
            </div>
          </section>
        </main>
      )}
    </PageLayoutWithDemo>
  )
}

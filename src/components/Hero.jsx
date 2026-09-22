import { company } from "../data/content"
import { scrollToId } from "../hooks/useLenis"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-32 pb-16"
    >
      <img
        src="/hero-coast.png"
        alt="Aerial coastline - Survey Man"
        className="hero-img absolute inset-0 h-full w-full object-cover object-center md:object-[50%_45%] lg:object-center"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-2 md:px-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="mx-auto flex w-[88vw] max-w-[560px] translate-x-4 translate-y-8 flex-col items-stretch text-center leading-none text-white md:w-[520px] md:translate-x-10 md:translate-y-10 lg:w-[580px] lg:translate-x-14 lg:translate-y-12">
            <span
              className="flex w-full justify-center gap-[0.32em] whitespace-nowrap leading-none scale-y-[1.28] scale-x-[1.12] origin-center text-[7.8vw] md:gap-[0.38em] md:text-[46px] lg:text-[54px] xl:text-[58px]"
              style={{ fontFamily: "'Anton', sans-serif", letterSpacing: "0.08em" }}
            >
              <span>SURVEY</span>
              <span>MAN</span>
            </span>
            <span
              className="mt-3 flex w-full justify-center gap-[1.35em] font-normal leading-none scale-x-[1.08] scale-y-125 origin-center text-white/90 text-[2.9vw] md:mt-3.5 md:gap-[1.5em] md:text-[14.5px] lg:text-[16px] xl:text-[17px]"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.22em" }}
            >
              <span>From</span><span>Land</span><span>to</span><span>the</span><span>Sea</span>
            </span>
          </h1>
          <p className="max-w-xl translate-y-12 text-center text-sm leading-relaxed text-white/80 md:translate-y-16 md:text-base lg:translate-y-24">
            {company.support}
          </p>
          <div className="flex translate-y-12 flex-wrap items-center justify-center gap-3 md:translate-y-16 lg:translate-y-24">
            <button
              type="button"
              onClick={() => scrollToId("#services")}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent"
            >
              Explore Services
            </button>
            <button
              type="button"
              onClick={() => scrollToId("#contact")}
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm text-white backdrop-blur-md hover:bg-white/15"
            >
              Get a Survey
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

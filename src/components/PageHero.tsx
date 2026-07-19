import Link from "next/link";
import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  backgroundImage?: string;
};

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  backgroundImage = "/images/hero-industrial.webp",
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[68vh] items-center overflow-hidden pt-36 pb-20 md:pt-40 md:pb-24">
      <div className="absolute inset-0 z-0 bg-[#0B1220]">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.42]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/55 to-[#0B1220]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/90 via-[#0B1220]/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-primary backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {eyebrow}
          </div>
          <h1 className="mb-7 text-4xl leading-[0.92] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
            {highlight ? (
              <>
                {" "}
                <span className="text-primary">{highlight}</span>
              </>
            ) : null}
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/80">{description}</p>
          <div className="flex flex-wrap gap-4">
            {primaryHref && primaryLabel && (
              <Link href={primaryHref} className="btn-premium btn-gold">
                {primaryLabel}
              </Link>
            )}
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

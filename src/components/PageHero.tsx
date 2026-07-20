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
  backgroundImage = "/visuals/excavator-worksite.jpg",
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[58vh] items-end overflow-hidden pb-16 pt-36 md:min-h-[64vh] md:items-center md:pb-20 md:pt-40">
      <div className="absolute inset-0 z-0 bg-[#0B1220]">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="media-kenburns object-cover brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-[#0B1220]/45 to-[#0B1220]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/85 via-[#0B1220]/30 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {eyebrow}
          </p>
          <h1 className="mb-5 text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
            {highlight ? (
              <>
                {" "}
                <span className="text-primary">{highlight}</span>
              </>
            ) : null}
          </h1>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {description}
          </p>
          <div className="flex flex-wrap gap-3">
            {primaryHref && primaryLabel && (
              <Link href={primaryHref} className="btn-premium btn-gold">
                {primaryLabel}
              </Link>
            )}
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
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

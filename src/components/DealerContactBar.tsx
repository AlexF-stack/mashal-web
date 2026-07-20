"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { company, companyLinks } from "@/lib/company";
import { useI18n } from "@/lib/i18n-context";

/** Sticky mobile dealer bar — 2-click path to human contact (industry best practice) */
export default function DealerContactBar() {
  const { t } = useI18n();

  return (
    <div className="fixed inset-x-0 bottom-0 z-[140] border-t border-white/10 bg-[#0F172A]/95 px-3 py-2.5 backdrop-blur-md md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2">
        <a
          href={companyLinks.phone}
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white/8 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white"
          aria-label={`${t.home.call} ${company.phoneDisplay}`}
        >
          <Phone className="h-4 w-4 text-primary" />
          {t.home.call}
        </a>
        <a
          href={companyLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white/8 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white"
        >
          <MessageCircle className="h-4 w-4 text-primary" />
          {t.home.whatsapp}
        </a>
        <Link
          href="/sav?type=devis"
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-primary py-2.5 text-[10px] font-bold uppercase tracking-wider text-background"
        >
          {t.nav.devis}
        </Link>
      </div>
    </div>
  );
}

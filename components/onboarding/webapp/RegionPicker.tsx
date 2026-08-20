"use client";

import { useState } from "react";
import { REGIONS } from "@/lib/onboarding/regions";
import type { RegionSelection } from "@/lib/onboarding/types";

/*
 * Q-06: viloyat -> tuman tanlash.
 *
 * Bir nechta viloyatdan tuman tanlash mumkin: viloyat ochiladi, ichidan
 * kerakli tumanlar belgilanadi. Tanlanganlar tepada "chip" koʻrinishida
 * turadi, shunda nomzod nimani tanlaganini yoʻqotmaydi.
 */
export default function RegionPicker({
  value,
  onChange,
}: {
  value: RegionSelection[];
  onChange: (next: RegionSelection[]) => void;
}) {
  const [openRegion, setOpenRegion] = useState<string | null>(null);

  const districtsOf = (regionCode: string) =>
    value.find((v) => v.region_code === regionCode)?.district_codes ?? [];

  const toggleDistrict = (regionCode: string, districtCode: string) => {
    const current = districtsOf(regionCode);
    const nextDistricts = current.includes(districtCode)
      ? current.filter((c) => c !== districtCode)
      : [...current, districtCode];

    const rest = value.filter((v) => v.region_code !== regionCode);
    onChange(
      nextDistricts.length > 0
        ? [...rest, { region_code: regionCode, district_codes: nextDistricts }]
        : rest,
    );
  };

  const selectedCount = value.reduce((s, v) => s + v.district_codes.length, 0);

  return (
    <div>
      {selectedCount > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {value.map((sel) => {
            const region = REGIONS.find((r) => r.code === sel.region_code);
            if (!region) return null;
            return sel.district_codes.map((dc) => {
              const district = region.districts.find((d) => d.code === dc);
              return (
                <button
                  key={dc}
                  type="button"
                  onClick={() => toggleDistrict(sel.region_code, dc)}
                  className="inline-flex items-center gap-1.5 rounded-pill bg-brand-100 py-1.5 pl-3 pr-2.5 text-[13px] font-semibold text-brand-700"
                >
                  {district?.name ?? dc}
                  <span aria-hidden className="text-[15px] leading-none">×</span>
                  <span className="sr-only">olib tashlash</span>
                </button>
              );
            });
          })}
        </div>
      )}

      <div className="space-y-2">
        {REGIONS.map((region) => {
          const chosen = districtsOf(region.code);
          const open = openRegion === region.code;
          return (
            <div key={region.code} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <button
                type="button"
                onClick={() => setOpenRegion(open ? null : region.code)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-3 p-4 text-left"
              >
                <span className="text-[15px] font-semibold text-ink">{region.name}</span>
                <span className="flex shrink-0 items-center gap-2">
                  {chosen.length > 0 && (
                    <span className="rounded-pill bg-brand-500 px-2 py-0.5 text-[11.5px] font-bold text-white">
                      {chosen.length}
                    </span>
                  )}
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-4 w-4 text-mute transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    fill="none"
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              {open && (
                <ul className="grid grid-cols-1 gap-1.5 border-t border-line p-3 sm:grid-cols-2">
                  {region.districts.map((d) => {
                    const active = chosen.includes(d.code);
                    return (
                      <li key={d.code}>
                        <button
                          type="button"
                          onClick={() => toggleDistrict(region.code, d.code)}
                          aria-pressed={active}
                          className={`w-full rounded-xl px-3 py-2.5 text-left text-[14px] transition-colors duration-150 ${
                            active
                              ? "bg-brand-50 font-semibold text-brand-700"
                              : "text-body hover:bg-surface-2"
                          }`}
                        >
                          {active && <span aria-hidden className="mr-1.5">✓</span>}
                          {d.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

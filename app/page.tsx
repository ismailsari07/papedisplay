"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function formatGregorian(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatHijri(date: Date) {
  try {
    return new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return "Hicri tarih desteklenmiyor";
  }
}

export default function Home() {
  const now = useNow();
  return (
    <div className="h-screen w-screen bg-neutral-950 text-neutral-50 flex justify-center items-center">
      <div className="w-full flex flex-col p-6">
        <header className="mb-16 flex justify-between items-center gap-3">
          <div className="w-1/2 flex flex-col p-2">
            <div className="text-neutral-50 font-bold text-9xl">
              {formatTime(now)}
            </div>
            <div className="text-neutral-400 text-3xl">
              {formatGregorian(now)}
            </div>
            <div className="text-neutral-400 text-3xl">{formatHijri(now)}</div>
          </div>
          <div className="w-1/2 flex gap-5">
            <InfoCard
              title="Cuma (Jumuah)"
              value={"2:00"}
              subtitle="Hutbe & Cemaat"
              accent="from-emerald-400 to-lime-300"
            />
            <InfoCard
              title="Güneş"
              value={"7:28"}
              subtitle=""
              accent="from-emerald-400 to-lime-300"
            />
          </div>
        </header>

        <section id="prayer-times" className="flex gap-5 justify-between mb-16">
          <PrayerCard label="Sabah" time="05:12" ikame="07:00" />
          <PrayerCard label="Öğle" time="12:45" ikame="02:00" />
          <PrayerCard label="İkindi" time="4:41" ikame="05:00" />
          <PrayerCard label="Akşam" time="6:11" ikame="06:37" />
          <PrayerCard label="Yatsı" time="7:29" ikame="08:05" active />
        </section>

        <footer className="flex items-center justify-between pt-2 border-t border-neutral-800">
          <div className="text-neutral-400 text-[clamp(12px,1.6vw,18px)]">
            Toronto, ON • 336 Pape Ave, Toronto, ON M4M 2W7
          </div>
        </footer>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  value,
  subtitle,
  accent,
}: {
  title: string;
  value: string;
  subtitle?: string;
  accent?: string;
}) {
  return (
    <div
      className={`w-full flex flex-col gap-1 rounded-2xl p-5 bg-neutral-900/60 border border-neutral-800 shadow-xl`}
    >
      <div className="text-neutral-300 text-[clamp(14px,1.8vw,22px)] mb-1">
        {title}
      </div>
      <div className="font-bold tabular-nums text-[clamp(36px,6.8vw,88px)] leading-none">
        {value}
      </div>
      {subtitle && (
        <div className="mt-1 text-neutral-500 text-[clamp(12px,1.6vw,18px)]">
          {subtitle}
        </div>
      )}
      {/* Dekoratif accent (opsiyonel gradient underline) */}
      <div
        className={`mt-auto h-1 rounded-full bg-gradient-to-r ${accent ?? "from-sky-400 to-cyan-300"}`}
      />
    </div>
  );
}

function PrayerCard({
  label,
  time,
  ikame,
  active,
}: {
  label: string;
  time: string;
  ikame: string;
  active?: boolean;
}) {
  return (
    <div
      className={`w-1/2 rounded-3xl p-3 border shadow-xl transition-colors ${active ? "border-emerald-400/70 bg-emerald-500/10" : "border-neutral-800 bg-neutral-900/60"}`}
    >
      <div className="flex items-center justify-between mb-7">
        <div className="text-4xl text-neutral-300 font-bold">{label}</div>
        {/* active && (
          <span className="text-[clamp(12px,1.8vw,18px)] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/50">
            Sıradaki
          </span>
    )*/}
      </div>
      <div className="">
        <div className="text-2xl text-neutral-400 font-semibold">
          Ezan Vakti:
        </div>
        <span className="text-8xl">{time}</span>
        {label === "Güneş" ? null : (
          <>
            <div className="text-2xl text-neutral-400 font-semibold">
              Ikame Vakti:
            </div>
            <span className="text-8xl">{ikame}</span>
          </>
        )}
      </div>
    </div>
  );
}

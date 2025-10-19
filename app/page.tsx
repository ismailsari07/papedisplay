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
  const myStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "red",
    color: "white",
  };
  return (
    <>
      <div style={myStyle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat autem,
        sit quasi atque illum iusto?
      </div>
      <div className="h-screen w-screen bg-neutral-950 text-neutral-50 flex justify-center items-center">
        <div className="w-full flex flex-col p-6">
          <header className="mb-16 flex flex-col justify-between items-center gap-3">
            <div className="text-neutral-50 font-bold text-[256px]">
              {formatTime(now)}
              <span className="text-7xl text-neutral-400">p.m.</span>
            </div>
            <div className="text-neutral-400 text-7xl">
              {formatGregorian(now)}
            </div>
            <div className="text-neutral-400 text-7xl">{formatHijri(now)}</div>
          </header>

          <section
            id="prayer-times"
            className="flex gap-5 justify-between items-start"
          >
            <PrayerCard label="Fajr" time="05:12" ikame="07:00" />
            <PrayerCard label="Dhuhr" time="12:45" ikame="02:00" />
            <PrayerCard label="Asr" time="4:41" ikame="05:00" />
            <PrayerCard label="Maghrib" time="6:11" ikame="06:37" />
            <PrayerCard label="Isha" time="7:29" ikame="08:05" active />
          </section>

          <section id="jumaah-info" className="">
            <InfoCard
              title="Jumuah"
              value={"2:00"}
              subtitle=""
              accent="from-emerald-400 to-lime-300"
            />
          </section>

          <footer className="flex items-center justify-between pt-2 border-t border-neutral-800">
            <div className="text-neutral-400 text-[clamp(12px,1.6vw,18px)]">
              Toronto, ON • 336 Pape Ave, Toronto, ON M4M 2W7
            </div>
          </footer>
        </div>
      </div>
    </>
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
      className={`w-2/5 p-2 flex justify-center items-center gap-1 rounded-2xl bg-neutral-900/60 border border-neutral-800 shadow-xl mx-auto`}
    >
      <div className="text-neutral-50 text-9xl mb-1 font-semibold">
        {title}:
      </div>
      <div className="font-bold text-neutral-300 text-9xl leading-none">
        &nbsp;{value}
        <span className="text-6xl">p.m.</span>
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
        <div className="text-[140px] text-neutral-50 font-bold">{label}</div>
        {/* active && (
          <span className="text-[clamp(12px,1.8vw,18px)] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/50">
            Sıradaki
          </span>
    )*/}
      </div>
      <div>
        <div className="text-4xl text-neutral-300">Adhan Time:</div>
        <span className="text-[160px]  text-neutral-300">{time}</span>
        <span className="text-7xl text-neutral-400">
          {label === "Fajr" ? "a.m." : "p.m"}
        </span>

        <div className={`w-full h-0.5 bg-neutral-500 rounded-full my-3`} />

        <div className="text-4xl text-neutral-50 font-semibold">Iqama:</div>
        <span className="text-[160px] text-neutral-50">{ikame}</span>
        <span className="text-6xl text-neutral-400">a.m.</span>
        {label === "Fajr" && (
          <>
            <div className={`w-full h-0.5 bg-neutral-500 rounded-full my-3`} />
            <div className="text-4xl text-neutral-50 font-semibold">
              Sunrise:
            </div>
            <span className="text-[160px] text-neutral-50">{"07:30"}</span>
            <span className="text-6xl text-neutral-400">a.m.</span>
          </>
        )}
      </div>
    </div>
  );
}

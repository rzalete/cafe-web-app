import { HeroSection } from "@/components/home/hero-section";
import { InfoCard } from "@/components/home/info-card";

const visitCards = [
  {
    id: "hours",
    title: "Jam Buka",
    description:
      "Senin - Jumat 08.00 - 22.00, Sabtu - Minggu 07.00 - 23.00.",
    tone: "light" as const,
  },
  {
    id: "location",
    title: "Lokasi",
    description:
      "Jl. Panglima Polim No. 18, Jakarta Selatan. Mudah dijangkau untuk singgah sebentar atau duduk lebih lama.",
    tone: "dark" as const,
  },
  {
    id: "contact",
    title: "Kontak",
    description:
      "WhatsApp +62 811 9000 120 dan Instagram @ruangteduh.cafe untuk tanya meja atau jam ramai.",
    tone: "dark" as const,
  },
];

const hospitalityNotes = [
  {
    title: "Suasana yang dicari tamu",
    description:
      "Datang untuk kopi pagi, kerja singkat dengan laptop, janji santai, atau ngobrol panjang selepas kantor.",
  },
  {
    title: "Pilihan yang terasa akrab",
    description:
      "Fokus pada kopi, pastry, makanan ringan, dan menu nyaman yang cocok untuk ritme harian kota.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-100">
      <HeroSection />

      <section className="mx-auto mt-10 grid w-full max-w-5xl gap-6 md:grid-cols-3">
        {visitCards.map((card) => (
          <InfoCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            tone={card.tone}
          />
        ))}
      </section>

      <section className="mx-auto mt-10 grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-stone-800 bg-stone-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Tentang Ruang Teduh
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Tempat singgah untuk ritme kota yang butuh jeda.
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-stone-300">
            Bukan sekadar tempat minum kopi, Ruang Teduh dirancang untuk tamu
            yang ingin merasa tenang, dilayani dengan hangat, dan punya alasan
            untuk kembali besok pagi atau akhir pekan nanti.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-stone-950/40 p-4">
              <p className="text-sm text-stone-400">Paling pas untuk</p>
              <p className="mt-2 font-medium text-stone-100">
                Kopi pagi, meeting santai, dan sore yang lebih pelan.
              </p>
            </div>

            <div className="rounded-2xl bg-stone-950/40 p-4">
              <p className="text-sm text-stone-400">Ritme layanan</p>
              <p className="mt-2 font-medium text-stone-100">
                Walk-in tetap nyaman, reservasi tersedia untuk meja yang lebih
                terencana.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {hospitalityNotes.map((note) => (
            <article
              key={note.title}
              className="rounded-3xl border border-stone-800 bg-stone-900 p-6"
            >
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="mt-3 leading-7 text-stone-300">
                {note.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

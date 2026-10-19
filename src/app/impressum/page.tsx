import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Impressum | Natalia Ulmer Erziehungsberatung',
  description: 'Impressum und gesetzliche Anbieterkennzeichnung gemäß § 5 DDG von Natalia Ulmer, Erziehungsberatung in Laupheim.',
  alternates: {
    canonical: '/impressum/',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-14 shadow-xs border border-stone-200/80">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[var(--color-muted)] hover:text-[var(--color-dark)] mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Zurück zur Startseite
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-sand)] flex items-center justify-center text-[var(--color-gold-text)]">
            <ShieldCheck size={20} />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-gold-text)]">
            Rechtliche Angaben
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif mb-8 text-[var(--color-dark)]">Impressum</h1>

        <div className="space-y-8 text-sm md:text-base text-[var(--color-muted)] leading-relaxed">
          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h2>
            <p className="text-[var(--color-dark)] font-medium">
              Natalia Ulmer<br />
              Erziehungsberatung & Pädagogisches Eltern-Coaching<br />
              Sebastianstraße 9<br />
              88471 Laupheim<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-3">Kontakt</h2>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-[var(--color-dark)]">
                <Phone size={16} className="text-[var(--color-gold-text)] shrink-0" />
                <span>Telefon: <a href="tel:+4915170657581" className="underline hover:text-[var(--color-gold-text)]">+49 1517 0657581</a></span>
              </p>
              <p className="flex items-center gap-2 text-[var(--color-dark)]">
                <Mail size={16} className="text-[var(--color-gold-text)] shrink-0" />
                <span>E-Mail: <a href="mailto:Ulmernatalia@gmail.com" className="underline hover:text-[var(--color-gold-text)]">Ulmernatalia@gmail.com</a></span>
              </p>
              <p className="flex items-center gap-2 text-[var(--color-dark)]">
                <MapPin size={16} className="text-[var(--color-gold-text)] shrink-0" />
                <span>Standort: 88471 Laupheim (Region Biberach / Ulm)</span>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">Berufsbezeichnung & berufsrechtliche Regelungen</h2>
            <p>
              Berufsbezeichnung: Staatlich anerkannte Erzieherin (verliehen in der Bundesrepublik Deutschland).<br />
              Tätigkeit: Freiberufliche Erziehungsberatung und pädagogisches Eltern-Coaching.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a 
                href="https://ec.europa.eu/consumers/odr/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-[var(--color-dark)] text-[var(--color-gold-text)] break-all"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section className="pt-6 border-t border-stone-200">
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">Haftung für Inhalte und Links</h2>
            <p className="text-xs leading-relaxed">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


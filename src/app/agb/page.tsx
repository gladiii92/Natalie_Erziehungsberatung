import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AGB & Beratungsbedingungen | Natalia Ulmer Erziehungsberatung',
  description: 'Allgemeine Geschäftsbedingungen und Rahmenbedingungen für Erziehungsberatung und Eltern-Coaching bei Natalia Ulmer.',
  alternates: {
    canonical: '/agb/',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function AgbPage() {
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
            <FileText size={20} />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-gold-text)]">
            Transparente Vertragsbedingungen
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif mb-8 text-[var(--color-dark)]">Allgemeine Geschäftsbedingungen (AGB)</h1>

        <div className="space-y-8 text-sm md:text-base text-[var(--color-muted)] leading-relaxed">
          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">1. Geltungsbereich & Anbieterin</h2>
            <p>
              Diese Geschäftsbedingungen gelten für alle Beratungsleistungen, Coachings, Einzelsitzungen und Begleitpakete zwischen Natalia Ulmer (nachfolgend „Beraterin“) und dem Klienten (nachfolgend „Klient“).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">2. Gegenstand & Wichtige rechtliche Abgrenzung</h2>
            <p>
              Die Erziehungsberatung und das pädagogische Eltern-Coaching bieten Hilfe zur Selbsthilfe, alltagsnahe Orientierung und fachliche Begleitung in Erziehungs- und Familienfragen auf Basis von über 15 Jahren pädagogischer Praxiserfahrung.
            </p>
            <div className="mt-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-amber-950 text-xs md:text-sm">
              <strong>Wichtiger rechtlicher Hinweis:</strong> Die Beratung stellt ausdrücklich <strong>keine</strong> heilkundliche Psychotherapie, ärztliche Behandlung oder Rechts-/Mediatorenberatung dar. Es werden keine Diagnosen gestellt oder Heilversprechen abgegeben. Bei akuten psychiatrischen oder körperlichen Erkrankungen des Kindes oder der Eltern ist fachärztliche Hilfe in Anspruch zu nehmen.
            </div>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">3. Zustandekommen des Vertrags</h2>
            <p>
              Die Darstellung der Angebote auf der Website stellt kein verbindliches Angebot dar. Der Vertrag kommt durch Terminvereinbarung im gegenseitigen Einvernehmen (per E-Mail, Telefon oder Buchungsbestätigung) zustande.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">4. Termine, Absagen & Ausfallhonorar</h2>
            <p>
              Vereinbarte Beratungstermine sind verbindlich reserviert. Sollte ein Klient einen Termin nicht wahrnehmen können, ist dieser mindestens <strong>24 Stunden vor dem Termin</strong> per Telefon oder E-Mail abzusagen.
            </p>
            <p className="mt-2">
              Bei Absagen von weniger als 24 Stunden vor dem Termin oder bei Nichterscheinen wird das vereinbarte Ausfallhonorar für die reservierte Zeit berechnet, es sei denn, die Verhinderung beruht auf einem unverschuldeten Notfall.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">5. Honorar & Zahlungsbedingungen</h2>
            <p>
              Es gelten die im Vorfeld vereinbarten Preise. Das Honorar ist nach Rechnungsstellung ohne Abzug innerhalb von 14 Tagen per Banküberweisung fällig. Bei mehrwöchigen Paketen können individuelle Ratenzahlungen schriftlich vereinbart werden.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">6. Widerrufsbelehrung für Verbraucher</h2>
            <p>
              Verbraucher haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14 Tage ab dem Tag des Vertragsschlusses.
            </p>
            <p className="mt-2">
              Um Ihr Widerrufsrecht auszuüben, müssen Sie Natalia Ulmer, Sebastianstraße 9, 88471 Laupheim, E-Mail: Ulmernatalia@gmail.com mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss informieren.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">7. Vertraulichkeit</h2>
            <p>
              Die Beraterin verpflichtet sich, über alle im Rahmen der Beratung anvertrauten persönlichen und familiären Angelegenheiten strengstes Stillschweigen zu bewahren – auch über das Ende der Beratung hinaus.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


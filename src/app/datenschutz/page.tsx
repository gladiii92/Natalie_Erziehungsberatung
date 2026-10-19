import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Lock, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Natalia Ulmer Erziehungsberatung',
  description: 'Datenschutzerklärung gemäß DSGVO von Natalia Ulmer, Erziehungsberatung in Laupheim.',
  alternates: {
    canonical: '/datenschutz/',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function DatenschutzPage() {
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
            <Lock size={20} />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-gold-text)]">
            DSGVO-Konformität
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif mb-8 text-[var(--color-dark)]">Datenschutzerklärung</h1>

        <div className="space-y-8 text-sm md:text-base text-[var(--color-muted)] leading-relaxed">
          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">1. Datenschutz auf einen Blick</h2>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO, BDSG) sowie dieser Datenschutzerklärung.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">2. Verantwortliche Stelle</h2>
            <p className="text-[var(--color-dark)] font-medium">
              Natalia Ulmer<br />
              Sebastianstraße 9<br />
              88471 Laupheim<br />
              Telefon: +49 1517 0657581<br />
              E-Mail: Ulmernatalia@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">3. Bereitstellung und Hosting der Website</h2>
            <p>
              Diese Website wird als statische Website bereitgestellt. Beim Aufruf der Seiten erfasst der Webserver automatisch technische Server-Log-Dateien (z. B. IP-Adresse in anonymisierter Form, Datum und Uhrzeit der Serveranfrage, Browsertyp, aufgerufene URL). Dies ist technisch erforderlich, um die Stabilität und Sicherheit der Website zu gewährleisten (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">4. Lokale Schriften (Kein Google Fonts CDN-Tracking)</h2>
            <p>
              Diese Seite nutzt zur einheitlichen und ansprechenden Darstellung Schriftarten, die über Next.js lokal auf unserem Server eingebunden sind. Es findet <strong>keine Verbindung zu Servern von Google in den USA</strong> statt. Ihre IP-Adresse wird zu keinem Zeitpunkt an Dritte zu Schriftarten-Zwecken übertragen (100% DSGVO-konform nach LG München I).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">5. Datenerfassung über das Kontaktformular</h2>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten (Name, E-Mail-Adresse, Telefonnummer, Wunschpaket, Nachricht) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert und verarbeitet.
            </p>
            <p className="mt-2">
              <strong>Rechtsgrundlage:</strong> Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf Ihrer ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
            </p>
            <p className="mt-2">
              <strong>Speicherdauer:</strong> Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">6. SSL- bzw. TLS-Verschlüsselung</h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">7. Ihre Rechte als betroffene Person</h2>
            <p>
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Datenverarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
              <li>Beschwerde bei einer zuständigen Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">8. Externe Partnerlinks (Affiliate-Transparenz)</h2>
            <p>
              Auf dieser Website befinden sich dezent gekennzeichnete Verlinkungen zu den Partnerseiten von Ringana und LR Health & Beauty. Beim Anklicken dieser externen Links verlassen Sie diese Website und werden auf die Angebote der jeweiligen Drittanbieter weitergeleitet. Es gelten die Datenschutzbestimmungen der jeweiligen Betreiber.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, X, ArrowRight, Heart, Sparkles, Leaf, ShieldCheck, 
  CheckCircle2, Star, Mail, Phone, MapPin, Instagram, 
  ExternalLink, ChevronDown, AlertCircle, Loader2, Award, Clock
} from 'lucide-react';

interface PackageOption {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  price: string;
  isPopular?: boolean;
  features: string[];
}

const PACKAGES: PackageOption[] = [
  {
    id: 'impuls',
    name: 'Impuls-Beratung',
    tagline: 'Für schnelle Klarheit bei einer akuten Herausforderung',
    duration: '60 Minuten 1:1 online',
    price: '149 €',
    features: [
      '60 Min. gezielte Videoberatung via Zoom/Teams',
      'Lösungsorientierte Sofort-Deeskalation für deinen Alltag',
      'Konkrete Handlungsschritte für typische Trigger-Situationen',
      'Aufzeichnung der Sitzung auf Wunsch inklusive'
    ]
  },
  {
    id: 'harmonie',
    name: '21-Tage Familien-Harmonie',
    tagline: 'Der praxiserprobte Weg zu friedlichen Abenden & verlässlicher Kooperation',
    duration: '3 Wochen Intensiv-Begleitung',
    price: '990 €',
    isPopular: true,
    features: [
      '4x 45 Min. 1:1 Coaching-Sessions mit Natalia',
      'Das 48h-Akut-Deeskalations-Protokoll bei Wutanfällen',
      'Voice-Memo-Joker (Mo–Fr) für schnelle Hilfe im Alltag',
      'Kühlschrank-Kartenset: 10 Wort-für-Wort Deeskalations-Sätze',
      '14-Tage Entlastungsgarantie: Volle Zufriedenheit oder Geld zurück'
    ]
  },
  {
    id: 'transformation',
    name: 'Ganzheitliche Begleitung',
    tagline: 'Tiefgreifende Veränderung für das gesamte Familiensystem',
    duration: '3 Monate Rundum-Begleitung',
    price: '2.400 €',
    features: [
      '10x 60 Min. Einzelsitzungen für Eltern & Paardynamik',
      'Priorisierter Sprachnachrichten-Support direkt im Alltag',
      'Begleitung bei Geschwisterrivalität & Schlafproblemen',
      'Ganzheitliche Familienvision & nachhaltige Routinen'
    ]
  }
];

const FAQS = [
  {
    q: 'Muss mein Kind beim Beratungstermin dabei sein?',
    a: 'Nein, in der Regel finden die Gespräche ausschließlich zwischen dir (und auf Wunsch deinem Partner) und mir statt. Als Mütter und Eltern haben wir den stärksten Hebel auf die Atmosphäre und Dynamik im Haus. Dein Kind muss nicht „behandelt“ werden – wir schaffen die Rahmenbedingungen, in denen es sich sicher und verstanden fühlt.'
  },
  {
    q: 'Wie schnell spüren wir die ersten Veränderungen?',
    a: 'Die meisten Mütter berichten bereits nach der allerersten Sitzung oder innerhalb der ersten 48 Stunden von spürbarer Entlastung, weil sie genau wissen, was sie im nächsten Konfliktmoment tun und sagen können, ohne die Beherrschung zu verlieren.'
  },
  {
    q: 'Findet die Beratung online oder vor Ort in Laupheim statt?',
    a: 'Die Beratungen finden flexibel und zeitsparend online via Zoom statt – ganz bequem von deinem Sofa aus, ohne Anfahrtsstress oder Babysitter-Suche. Für Klienten aus der Region Laupheim, Ulm und Biberach sind auf Anfrage auch persönliche Termine möglich.'
  },
  {
    q: 'Was unterscheidet deinen Ansatz von Ratgeberbüchern?',
    a: 'Ratgeber geben starre Rezepte. Nach über 15 Jahren pädagogischer Leitung in Kitas weiß ich: Jedes Kind und jede Familie ist einzigartig. Ich gebe dir kein Lehrbuch-Wissen, sondern handfeste Deeskalations-Strategien, die exakt zu deinem Charakter, deinem Kind und eurem Alltag passen.'
  }
];

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('21-Tage Familien-Harmonie');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Formular-Zustand für 4-Stufen Event Chain
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: '21-Tage Familien-Harmonie',
    message: '',
    consent: false,
    botcheck: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openContact = (pkgTitle?: string) => {
    if (pkgTitle) {
      setSelectedPackage(pkgTitle);
      setFormData(prev => ({ ...prev, package: pkgTitle }));
    }
    setIsContactOpen(true);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      setFormError('Bitte willige in die Verarbeitung deiner Angaben ein.');
      setFormState('error');
      return;
    }

    if (formData.botcheck) {
      setFormState('success');
      return;
    }

    setFormState('loading');
    setFormError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'PUBLIC_ACCESS_KEY', // Wird durch Kundenschlüssel ersetzt oder läuft in Fail-Safe
          to: 'Ulmernatalia@gmail.com',
          from_name: formData.name,
          subject: `Neue Beratung-Anfrage von ${formData.name} (${formData.package})`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Keine Angabe',
          gewähltes_paket: formData.package,
          nachricht: formData.message || 'Keine Nachricht hinterlassen',
          ort: 'Website www.natalia-erziehungsberatung.de',
          zeitpunkt: new Date().toLocaleString('de-DE')
        })
      });

      const resJson = await response.json();
      if (response.ok && resJson.success) {
        setFormState('success');
      } else {
        throw new Error('API Fehler');
      }
    } catch {
      // 100% Fail-Safe: Kein Lead geht verloren
      setFormError('Hinweis: Die automatische Übertragung ist temporär nicht erreichbar. Bitte nutze die 1-Klick E-Mail Übertragung:');
      setFormState('error');
    }
  };

  const mailtoFallback = `mailto:Ulmernatalia@gmail.com?subject=${encodeURIComponent(
    `Anfrage Erstgespräch: ${formData.name} - ${formData.package}`
  )}&body=${encodeURIComponent(
    `Hallo Natalia,\n\nich interessiere mich für das Erstgespräch / ${formData.package}.\n\nName: ${formData.name}\nE-Mail: ${formData.email}\nTelefon: ${formData.phone}\n\nHerausforderung:\n${formData.message}`
  )}`;

  return (
    <>
      {/* Sticky Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xs py-3.5' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center">
          {/* Brand Logo & Typo */}
          <Link href="/" className="flex items-center gap-3.5 group focus:outline-none shrink-0 py-1">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-stone-200/90 shadow-2xs group-hover:scale-105 transition-transform bg-[#FAF7F4] shrink-0">
              <Image 
                src="/logo-icon.png" 
                alt="Natalia Ulmer Logo Emblem" 
                width={88} 
                height={88} 
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-dark)] group-hover:text-[var(--color-gold-text)] transition-colors leading-none">
                Natalia Ulmer
              </span>
              <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[var(--color-gold-text)] font-sans mt-1">
                Erziehungsberatung
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            <a href="#ueber-mich" className="whitespace-nowrap text-xs uppercase tracking-widest font-semibold text-[var(--color-dark)] hover:text-[var(--color-gold-text)] transition-colors">
              Über mich
            </a>
            <a href="#methode" className="whitespace-nowrap text-xs uppercase tracking-widest font-semibold text-[var(--color-dark)] hover:text-[var(--color-gold-text)] transition-colors">
              R.U.H.E.-Methode
            </a>
            <a href="#angebote" className="whitespace-nowrap text-xs uppercase tracking-widest font-semibold text-[var(--color-dark)] hover:text-[var(--color-gold-text)] transition-colors">
              Begleitformate
            </a>
            <a href="#faq" className="whitespace-nowrap text-xs uppercase tracking-widest font-semibold text-[var(--color-dark)] hover:text-[var(--color-gold-text)] transition-colors">
              FAQ
            </a>
            <button 
              onClick={() => openContact()}
              className="btn-primary whitespace-nowrap text-xs px-6 py-2.5 shadow-2xs"
            >
              Erstgespräch buchen
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-[var(--color-dark)] rounded-lg hover:bg-stone-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Navigation umschalten"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--color-bg)] flex flex-col justify-center items-center gap-8 md:hidden px-6 text-center">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-stone-500 hover:text-black"
            aria-label="Menü schließen"
          >
            <X size={28} />
          </button>
          <a 
            href="#ueber-mich" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-serif text-3xl text-[var(--color-dark)] hover:text-[var(--color-gold-text)]"
          >
            Über mich
          </a>
          <a 
            href="#methode" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-serif text-3xl text-[var(--color-dark)] hover:text-[var(--color-gold-text)]"
          >
            R.U.H.E.-Methode
          </a>
          <a 
            href="#angebote" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-serif text-3xl text-[var(--color-dark)] hover:text-[var(--color-gold-text)]"
          >
            Begleitformate
          </a>
          <a 
            href="#faq" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-serif text-3xl text-[var(--color-dark)] hover:text-[var(--color-gold-text)]"
          >
            Häufige Fragen
          </a>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); openContact(); }}
            className="btn-primary w-full max-w-xs mt-4"
          >
            Kostenloses Erstgespräch
          </button>
        </div>
      )}

      <main id="main-content">
        {/* HERO SECTION */}
        <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden">
          <div className="watercolor-blob blob-pink w-[500px] h-[500px] -top-20 -right-24"></div>
          <div className="watercolor-blob blob-sage w-[380px] h-[380px] bottom-10 -left-20"></div>

          <div className="container-custom grid md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            <div className="order-2 md:order-1">
              {/* Google Business Profile Trust Pill */}
              <a 
                href="https://share.google/79rCRsuPmN24j4k8C" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-stone-200/90 shadow-2xs mb-6 hover:border-[var(--color-gold)] transition-colors group"
              >
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[var(--color-dark)] tracking-wide">
                  5.0 auf Google • Erziehungsberatung Laupheim & Region Ulm
                </span>
                <ExternalLink size={12} className="text-stone-400 group-hover:text-[var(--color-gold-text)] transition-colors" />
              </a>

              {/* Hormozi Painkiller Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] mb-6 text-[var(--color-dark)]">
                <span className="block font-light">Schluss mit Wutanfällen & Schlafkampf.</span>
                <span className="font-script text-[var(--color-gold-text)] block mt-2 text-4xl sm:text-5xl lg:text-6xl">
                  Gelassen erziehen. Bei dir beginnen.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--color-muted)] mb-8 max-w-lg leading-relaxed">
                Vom täglichen Familiendrama zu echter Verbundenheit und friedlichen Abenden in 21 Tagen. 
                Pädagogische Begleitung für Mütter – <strong>ohne Anschreien, ohne ständige Machtkämpfe und ohne Schuldgefühle</strong>.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <button 
                  onClick={() => openContact()}
                  className="btn-primary px-8 py-3.5 shadow-sm"
                >
                  Kostenloses Erstgespräch buchen
                </button>
                <a 
                  href="#angebote" 
                  className="btn-secondary px-8 py-3.5"
                >
                  Begleitpakete ansehen
                </a>
              </div>

              {/* Trust Features */}
              <div className="mt-10 pt-6 border-t border-stone-200/60 grid grid-cols-3 gap-4 text-xs font-medium text-[var(--color-muted)]">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-[var(--color-gold-text)] shrink-0" />
                  <span>15+ Jahre Praxiserfahrung</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[var(--color-gold-text)] shrink-0" />
                  <span>14-Tage Entlastungsgarantie</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[var(--color-gold-text)] shrink-0" />
                  <span>Sofort-Hilfe in 48 Std.</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 md:order-2 relative">
              <div className="relative z-10 rounded-[32px] overflow-hidden shadow-xl aspect-[4/5] max-h-[72vh] mx-auto bg-stone-200">
                <Image 
                  src="/input_file_1.png" 
                  alt="Natalia Ulmer - Staatlich anerkannte Erzieherin und Erziehungsberaterin" 
                  width={800}
                  height={1000}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-full h-full border-2 border-[var(--color-gold)] rounded-[32px] -z-0 opacity-40 hidden md:block"></div>
            </div>
          </div>
        </section>

        {/* MANIFESTO SECTION */}
        <section className="bg-white py-20 relative text-center border-y border-stone-200/60">
          <div className="container-custom max-w-3xl mx-auto">
            <span className="font-script text-3xl sm:text-4xl text-[var(--color-gold-text)] block mb-3">
              Selbstbestimmt. Verbunden. Echt.
            </span>
            <p className="text-xl sm:text-2xl text-[var(--color-dark)] font-serif italic leading-relaxed">
              „Erziehung beginnt nicht beim fehlerhaften Verhalten deines Kindes, sondern bei deiner inneren Sicherheit und deinem eigenen Halt.“
            </p>
          </div>
        </section>

        {/* ÜBER MICH SECTION */}
        <section id="ueber-mich" className="section-padding bg-[var(--color-bg)]">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
              <div className="rounded-[36px] overflow-hidden shadow-lg bg-stone-200">
                <Image 
                  src="/input_file_0.png" 
                  alt="Portrait Natalia Ulmer Erziehungsberatung" 
                  width={700}
                  height={875}
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-gold-text)] block mb-2">
                  Deine Wegbegleiterin
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif mb-6 text-[var(--color-dark)]">
                  Ich begleite dich mit Herz, Empathie und 15 Jahren Kita-Praxis
                </h2>

                <div className="space-y-4 text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
                  <p>
                    Hallo, ich bin <strong>Natalia Ulmer</strong>. Als gelernte Erzieherin und pädagogische Fachkraft kenne ich die täglichen Zerreißproben junger Familien: Der Morgen beginnt gehetzt, das Kind trotzt bei den Schuhen, an der Supermarktkasse eskaliert die Situation und abends liegst du mit Tränen im Bett und fragst dich: <em>„Was mache ich bloß falsch?“</em>
                  </p>
                  <p>
                    Die Antwort ist einfach: <strong>Du machst nichts falsch.</strong> Dir fehlen schlicht erprobte Deeskalations-Werkzeuge, die im echten Alltag funktionieren – ohne endlose Ratgeber-Theorie.
                  </p>
                  <p>
                    Mein Ansatz verbindet fundierte Entwicklungspsychologie mit praktischer Alltagstauglichkeit. Ich helfe dir, klare Grenzen zu setzen, ohne laut zu werden – damit dein Zuhause wieder ein Ort der Zuflucht und Freude wird.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="font-script text-3xl text-[var(--color-gold-text)]">Ich freue mich auf dich!</div>
                    <div className="font-serif font-bold text-lg text-[var(--color-dark)]">Natalia Ulmer</div>
                  </div>
                  <button 
                    onClick={() => openContact()}
                    className="btn-primary"
                  >
                    Erstgespräch anfragen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METHODE (DAS R.U.H.E.-SYSTEM) */}
        <section id="methode" className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="font-script text-3xl text-[var(--color-gold-text)] block mb-2">
                Struktur statt Ohnmacht
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[var(--color-dark)] mb-4">
                Das R.U.H.E.-Prinzip für entspannte Mütter
              </h2>
              <p className="text-[var(--color-muted)] text-base">
                Die 4 Säulen, mit denen wir verfahrene Familiendynamiken nachhaltig und liebevoll lösen.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  letter: 'R',
                  title: 'Ruhe bewahren',
                  desc: 'Lerne, in Akutsituationen das eigene Nervensystem in 60 Sekunden herunterzufahren, bevor der Geduldsfaden reißt.'
                },
                {
                  letter: 'U',
                  title: 'Ursachen erkennen',
                  desc: 'Verstehe die neurobiologische Botschaft hinter Trotz, Wutanfällen und Verweigerung deines Kindes.'
                },
                {
                  letter: 'H',
                  title: 'Halt & Grenzen',
                  desc: 'Setze liebevolle, unumstößliche Leitplanken. Kinder brauchen Orientierung, keine Diskussionen über Selbstverständliches.'
                },
                {
                  letter: 'E',
                  title: 'Echte Verbindung',
                  desc: 'Schaffe tägliche 10-Minuten-Rituale, die das Vertrauen stärken und den Schlafkampf am Abend dauerhaft beenden.'
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="p-8 rounded-3xl bg-[var(--color-bg)] border border-stone-200/70 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white text-[var(--color-gold-text)] font-serif font-bold text-2xl flex items-center justify-center mb-6 shadow-2xs">
                      {item.letter}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[var(--color-dark)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BEGLEITFORMATE (HORMOZI GRAND SLAM OFFER) */}
        <section id="angebote" className="section-padding bg-[var(--color-bg)] relative">
          <div className="container-custom">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="font-script text-3xl text-[var(--color-gold-text)] block mb-2">
                Transparente Begleitung
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-dark)] mb-4">
                Wähle deinen Weg zu mehr Familienfrieden
              </h2>
              <p className="text-[var(--color-muted)] text-base">
                Keine versteckten Abos. Klare Ergebnisse mit verbindlichem Halt.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`p-8 md:p-10 rounded-[36px] bg-white flex flex-col justify-between transition-all duration-300 border ${
                    pkg.isPopular 
                      ? 'border-[var(--color-gold)] shadow-xl relative scale-100 md:scale-105 z-10 ring-1 ring-[var(--color-gold)]/20' 
                      : 'border-stone-200/80 shadow-xs'
                  }`}
                >
                  <div>
                    {pkg.isPopular && (
                      <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-sand)] text-[var(--color-gold-text)] text-[10px] uppercase tracking-widest font-bold mb-4">
                        Meistgewählte Begleitung
                      </span>
                    )}
                    <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-muted)] mb-2">
                      {pkg.name}
                    </h3>
                    <div className="font-serif text-3xl text-[var(--color-dark)] mb-1">
                      {pkg.duration}
                    </div>
                    <div className="text-2xl font-bold text-[var(--color-gold-text)] mb-4">
                      {pkg.price}
                    </div>
                    <p className="text-xs text-[var(--color-muted)] mb-8 leading-relaxed">
                      {pkg.tagline}
                    </p>

                    <ul className="space-y-3.5 mb-8">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-[var(--color-dark)] leading-normal">
                          <CheckCircle2 size={16} className="text-[var(--color-gold-text)] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => openContact(pkg.name)}
                    className={`w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
                      pkg.isPopular 
                        ? 'bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-hover)] shadow-sm' 
                        : 'bg-[var(--color-bg)] text-[var(--color-dark)] hover:bg-[var(--color-dark)] hover:text-white border border-stone-200'
                    }`}
                  >
                    Jetzt unverbindlich anfragen
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="section-padding bg-white">
          <div className="container-custom max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-script text-3xl text-[var(--color-gold-text)] block mb-2">
                Häufige Fragen
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[var(--color-dark)] mb-4">
                Antworten auf deine wichtigsten Fragen
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl border border-stone-200/80 bg-[var(--color-bg)] overflow-hidden transition-all"
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left text-base font-serif font-bold text-[var(--color-dark)] focus:outline-none"
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown 
                      size={20} 
                      className={`text-stone-500 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-[var(--color-gold-text)]' : ''}`} 
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 text-sm text-[var(--color-muted)] leading-relaxed border-t border-stone-200/40 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCKER 3 LÖSUNG: DEZENTER PARTNER- & FRISCHEKOSMETIK BEREICH */}
        <section className="py-16 bg-[var(--color-bg)] border-t border-stone-200/60">
          <div className="container-custom max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-muted)] block mb-2">
              Transparenz & Ergänzung
            </span>
            <h3 className="text-2xl font-serif text-[var(--color-dark)] mb-3">
              Ganzheitliches Wohlbefinden für Mütter & Familien
            </h3>
            <p className="text-sm text-[var(--color-muted)] max-w-xl mx-auto mb-8 leading-relaxed">
              Ein gelassenes Familienleben beginnt bei einer Mutter, die auch gut für ihre eigene Energie und Gesundheit sorgt. 
              Als persönliche Empfehlung nutze und teile ich nachhaltige Frischepflege und Vitalstoffe:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-serif font-bold text-lg text-[var(--color-dark)]">Ringana Frischepartner</h4>
                    <span className="text-[10px] uppercase font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded">Partnerempfehlung</span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4">
                    100% frische Wirkstoffkosmetik und natürliche Körperpflege ohne künstliche Konservierungsstoffe – ideal für die empfindliche Haut von Mutter und Kind.
                  </p>
                </div>
                <a 
                  href="https://natalia.ringana.com/" 
                  target="_blank" 
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-gold-text)] hover:underline"
                >
                  <span>Zum Ringana Frischeshop</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-serif font-bold text-lg text-[var(--color-dark)]">LR Health & Beauty</h4>
                    <span className="text-[10px] uppercase font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded">Partnerempfehlung</span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4">
                    Hochwertige Produkte für Vitalität, Zellschutz und Regeneration zur Stärkung der mütterlichen Resilienz im fordernden Familienalltag.
                  </p>
                </div>
                <a 
                  href="https://www.lrworld.com/Natiulmer" 
                  target="_blank" 
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-gold-text)] hover:underline"
                >
                  <span>Zum LR Partnershop</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION SECTION */}
        <section className="bg-white py-20 text-center border-t border-stone-200/60 relative">
          <div className="container-custom max-w-2xl mx-auto">
            <span className="font-script text-3xl text-[var(--color-gold-text)] block mb-2">
              Der erste Schritt
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[var(--color-dark)] mb-4">
              Bereit für friedliche Abende und neue Leichtigkeit?
            </h2>
            <p className="text-base text-[var(--color-muted)] mb-8 leading-relaxed">
              Buche jetzt dein unverbindliches 20-minütiges Kennenlerngespräch. 
              Wir sprechen über eure Situation und finden heraus, wie ich dich gezielt unterstützen kann.
            </p>
            <button 
              onClick={() => openContact()}
              className="btn-primary px-10 py-4 text-xs"
            >
              Kostenloses Erstgespräch anfragen
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[var(--color-bg)] py-16 border-t border-stone-200/80 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-14">
            {/* Col 1: Brand & Logo (Breiter Raum, kein Kollidieren!) */}
            <div className="md:col-span-5 lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-3.5 mb-5 group">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-stone-200 shadow-2xs bg-[#FAF7F4] shrink-0">
                  <Image 
                    src="/logo-icon.png" 
                    alt="Natalia Ulmer Logo" 
                    width={96} 
                    height={96} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[var(--color-dark)] group-hover:text-[var(--color-gold-text)] transition-colors leading-none">
                    Natalia Ulmer
                  </span>
                  <span className="text-[11px] tracking-[0.22em] uppercase font-semibold text-[var(--color-gold-text)] font-sans mt-1">
                    Erziehungsberatung
                  </span>
                </div>
              </Link>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-6 max-w-sm">
                Ganzheitliche Erziehungsberatung & pädagogisches Eltern-Coaching mit Herz und 15 Jahren Praxis für Laupheim, Ulm, Biberach & Online.
              </p>
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.instagram.com/natalia.erziehungsberatung/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Natalia Ulmer auf Instagram"
                  className="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-[var(--color-gold-text)] hover:border-[var(--color-gold)] transition-colors shadow-2xs"
                >
                  <Instagram size={16} />
                </a>
                <a 
                  href="https://share.google/79rCRsuPmN24j4k8C" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Google Unternehmensprofil Natalia Ulmer"
                  className="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-[var(--color-gold-text)] hover:border-[var(--color-gold)] transition-colors shadow-2xs"
                >
                  <MapPin size={16} />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-[var(--color-dark)] mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs text-[var(--color-muted)]">
                <li><a href="#ueber-mich" className="hover:text-[var(--color-dark)] transition-colors">Über mich</a></li>
                <li><a href="#methode" className="hover:text-[var(--color-dark)] transition-colors">R.U.H.E.-Methode</a></li>
                <li><a href="#angebote" className="hover:text-[var(--color-dark)] transition-colors">Begleitformate</a></li>
                <li><a href="#faq" className="hover:text-[var(--color-dark)] transition-colors">Häufige Fragen</a></li>
              </ul>
            </div>

            {/* Col 3: Rechtliches */}
            <div className="md:col-span-2 lg:col-span-3">
              <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-[var(--color-dark)] mb-4">
                Rechtliches (Deutschland)
              </h4>
              <ul className="space-y-2.5 text-xs text-[var(--color-muted)]">
                <li>
                  <Link href="/impressum/" className="hover:text-[var(--color-dark)] font-medium transition-colors">
                    Impressum (§ 5 DDG)
                  </Link>
                </li>
                <li>
                  <Link href="/datenschutz/" className="hover:text-[var(--color-dark)] font-medium transition-colors">
                    Datenschutzerklärung (DSGVO)
                  </Link>
                </li>
                <li>
                  <Link href="/agb/" className="hover:text-[var(--color-dark)] font-medium transition-colors">
                    AGB & Widerrufsbelehrung
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Kontakt & Standort */}
            <div className="md:col-span-3 lg:col-span-3">
              <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-[var(--color-dark)] mb-4">
                Kontakt & Standort
              </h4>
              <ul className="space-y-2.5 text-xs text-[var(--color-muted)]">
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="text-[var(--color-gold-text)] shrink-0 mt-0.5" />
                  <span>Sebastianstraße 9<br />88471 Laupheim</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-[var(--color-gold-text)] shrink-0" />
                  <a href="tel:+4915170657581" className="hover:underline">+49 1517 0657581</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-[var(--color-gold-text)] shrink-0" />
                  <a href="mailto:Ulmernatalia@gmail.com" className="hover:underline">Ulmernatalia@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-200/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--color-muted)]">
            <div>
              &copy; {new Date().getFullYear()} Natalia Ulmer – Erziehungsberatung. Alle Rechte vorbehalten.
            </div>
            <div className="text-[11px] text-stone-400">
              Pädagogisches Eltern-Coaching • Laupheim, Ulm & Online
            </div>
          </div>
        </div>
      </footer>

      {/* KONTAKT-MODAL (4-STUFEN EVENT CHAIN MIT FAIL-SAFE) */}
      {isContactOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsContactOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Kostenloses Erstgespräch anfragen"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-black rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Schließen"
            >
              <X size={20} />
            </button>

            {formState === 'success' ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-[#F6E3E3] text-[var(--color-gold-text)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-serif text-[var(--color-dark)] mb-2">Vielen Dank, {formData.name || 'liebe Mama'}!</h3>
                <p className="text-sm text-[var(--color-muted)] mb-6 leading-relaxed">
                  Deine Anfrage für <strong>{formData.package}</strong> ist eingegangen. Ich werde mich innerhalb von 24–48 Stunden persönlich bei dir melden.
                </p>
                <button 
                  onClick={() => { setIsContactOpen(false); setFormState('idle'); }}
                  className="btn-primary w-full justify-center"
                >
                  Zurück zur Übersicht
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-[var(--color-gold-text)] uppercase tracking-widest text-[10px] font-bold block mb-1">
                    Unverbindlich & Vertraulich
                  </span>
                  <h3 className="text-2xl font-serif text-[var(--color-dark)]">Kostenloses Erstgespräch</h3>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    Fülle das Formular aus und wir stimmen gemeinsam einen passenden Telefon- oder Zoom-Termin ab.
                  </p>
                </div>

                {formState === 'error' && (
                  <div className="mb-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                      <span className="font-semibold">{formError}</span>
                    </div>
                    <a 
                      href={mailtoFallback}
                      className="btn-primary w-full justify-center text-xs uppercase tracking-widest mt-2"
                    >
                      Direkt per E-Mail senden
                    </a>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input 
                    type="text" 
                    name="botcheck" 
                    value={formData.botcheck} 
                    onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })} 
                    className="hidden" 
                    tabIndex={-1} 
                    autoComplete="off" 
                  />

                  <div>
                    <label htmlFor="f-name" className="block text-xs uppercase tracking-wider font-semibold text-[var(--color-dark)] mb-1">
                      Dein Name *
                    </label>
                    <input 
                      required
                      type="text" 
                      id="f-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-[var(--color-dark)] focus:outline-none"
                      placeholder="Vor- und Nachname"
                    />
                  </div>

                  <div>
                    <label htmlFor="f-email" className="block text-xs uppercase tracking-wider font-semibold text-[var(--color-dark)] mb-1">
                      Deine E-Mail-Adresse *
                    </label>
                    <input 
                      required
                      type="email" 
                      id="f-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-[var(--color-dark)] focus:outline-none"
                      placeholder="deine.email@beispiel.de"
                    />
                  </div>

                  <div>
                    <label htmlFor="f-phone" className="block text-xs uppercase tracking-wider font-semibold text-[var(--color-dark)] mb-1">
                      Telefonnummer (optional für Rückruf)
                    </label>
                    <input 
                      type="tel" 
                      id="f-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-[var(--color-dark)] focus:outline-none"
                      placeholder="+49 151 ..."
                    />
                  </div>

                  <div>
                    <label htmlFor="f-package" className="block text-xs uppercase tracking-wider font-semibold text-[var(--color-dark)] mb-1">
                      Gewünschtes Format
                    </label>
                    <select
                      id="f-package"
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:border-[var(--color-dark)] focus:outline-none"
                    >
                      <option value="21-Tage Familien-Harmonie">21-Tage Familien-Harmonie (990 €)</option>
                      <option value="Impuls-Beratung">Impuls-Beratung (149 €)</option>
                      <option value="Ganzheitliche Begleitung">Ganzheitliche Begleitung 3 Monate (2.400 €)</option>
                      <option value="Erstgespräch / Unentschlossen">Erstgespräch / Noch unentschlossen</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="f-msg" className="block text-xs uppercase tracking-wider font-semibold text-[var(--color-dark)] mb-1">
                      Deine aktuelle Herausforderung (optional)
                    </label>
                    <textarea 
                      id="f-msg"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-[var(--color-dark)] focus:outline-none"
                      placeholder="Wie alt sind deine Kinder? Wo wünschst du dir die meiste Unterstützung?"
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <input 
                      required
                      type="checkbox" 
                      id="f-consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-stone-300 accent-[var(--color-gold)] cursor-pointer"
                    />
                    <label htmlFor="f-consent" className="text-xs text-[var(--color-muted)] leading-relaxed cursor-pointer">
                      Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert und verarbeitet werden. Details in der{' '}
                      <Link href="/datenschutz/" target="_blank" className="underline hover:text-[var(--color-dark)] font-medium">
                        Datenschutzerklärung
                      </Link>
                      .
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={formState === 'loading'}
                    className="btn-primary w-full flex justify-center items-center gap-2 mt-4"
                  >
                    {formState === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Wird übermittelt...</span>
                      </>
                    ) : (
                      <span>Unverbindliche Anfrage absenden</span>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}


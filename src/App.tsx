import { useState, useEffect, ReactNode, FormEvent } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'motion/react'
import { Menu, X, ArrowRight, Star, Instagram, Mail, Phone, Heart, Sparkles, Leaf } from 'lucide-react';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Section = ({ children, className = "", id = "" }: { children: ReactNode, className?: string, id?: string }) => {
  return (
    <motion.section 
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className={`section-padding ${className}`}
    >
      {children}
    </motion.section>
  );
};

type LegalSection = 'impressum' | 'datenschutz' | 'agb' | null;

const LegalModal = ({ section, onClose }: { section: LegalSection, onClose: () => void }) => {
  if (!section) return null;

  const content = {
    impressum: (
      <div className="space-y-4 text-sm text-[var(--color-dark)]">
        <h2 className="text-2xl font-serif mb-4">Impressum</h2>
        <p>Angaben gemäß § 5 TMG</p>
        <p>
          [Vorname Nachname]<br />
          [Straße Hausnummer]<br />
          [PLZ Ort]
        </p>
        <h3 className="text-lg font-bold mt-4">Kontakt</h3>
        <p>
          Telefon: [Telefonnummer]<br />
          E-Mail: [E-Mail-Adresse]
        </p>
        <h3 className="text-lg font-bold mt-4">Umsatzsteuer-ID</h3>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          [DE999999999]
        </p>
        <h3 className="text-lg font-bold mt-4">Redaktionell verantwortlich</h3>
        <p>
          [Vorname Nachname]<br />
          [Straße Hausnummer]<br />
          [PLZ Ort]
        </p>
        <h3 className="text-lg font-bold mt-4">EU-Streitschlichtung</h3>
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-gold)]">https://ec.europa.eu/consumers/odr/</a>.<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
        <h3 className="text-lg font-bold mt-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h3>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </div>
    ),
    datenschutz: (
      <div className="space-y-4 text-sm text-[var(--color-dark)]">
        <h2 className="text-2xl font-serif mb-4">Datenschutzerklärung</h2>
        <h3 className="text-lg font-bold">1. Datenschutz auf einen Blick</h3>
        <p><strong>Allgemeine Hinweise</strong><br/>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
        <h3 className="text-lg font-bold mt-4">2. Hosting</h3>
        <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:<br/>[Name des Hosters]</p>
        <h3 className="text-lg font-bold mt-4">3. Allgemeine Hinweise und Pflichtinformationen</h3>
        <p><strong>Datenschutz</strong><br/>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
        <p><strong>Hinweis zur verantwortlichen Stelle</strong><br/>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br/>[Vorname Nachname]<br/>[Straße Hausnummer]<br/>[PLZ Ort]<br/><br/>Telefon: [Telefonnummer]<br/>E-Mail: [E-Mail-Adresse]</p>
        <h3 className="text-lg font-bold mt-4">4. Datenerfassung auf dieser Website</h3>
        <p><strong>Cookies</strong><br/>Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an.</p>
        <p><strong>Kontaktformular</strong><br/>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.</p>
      </div>
    ),
    agb: (
      <div className="space-y-4 text-sm text-[var(--color-dark)]">
        <h2 className="text-2xl font-serif mb-4">Allgemeine Geschäftsbedingungen (AGB)</h2>
        <h3 className="text-lg font-bold">1. Geltungsbereich</h3>
        <p>Für die Geschäftsbeziehung zwischen [Name des Anbieters] (nachfolgend „Anbieter“) und dem Kunden (nachfolgend „Kunde“) gelten ausschließlich die nachfolgenden Allgemeinen Geschäftsbedingungen in ihrer zum Zeitpunkt der Bestellung gültigen Fassung.</p>
        <h3 className="text-lg font-bold mt-4">2. Vertragsschluss</h3>
        <p>Die Darstellung der Dienstleistungen auf der Website stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung dar.</p>
        <h3 className="text-lg font-bold mt-4">3. Leistungen</h3>
        <p>Der Umfang der vertraglichen Leistungen ergibt sich aus der Leistungsbeschreibung des Anbieters.</p>
        <h3 className="text-lg font-bold mt-4">4. Preise und Zahlung</h3>
        <p>Es gelten die zum Zeitpunkt des Vertragsschlusses vereinbarten Preise. Die Zahlung erfolgt nach Rechnungsstellung.</p>
        <h3 className="text-lg font-bold mt-4">5. Haftung</h3>
        <p>Ansprüche des Kunden auf Schadensersatz sind ausgeschlossen. Hiervon ausgenommen sind Schadensersatzansprüche des Kunden aus der Verletzung des Lebens, des Körpers, der Gesundheit oder aus der Verletzung wesentlicher Vertragspflichten.</p>
      </div>
    )
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X size={24} />
        </button>
        {content[section]}
      </motion.div>
    </div>
  );
};


const ContactModal = ({ onClose }: { onClose: () => void }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate network request
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-8 max-w-lg w-full relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X size={24} />
        </button>
        
        {formState === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[var(--color-sand)] text-[var(--color-gold)] rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles size={32} />
            </div>
            <h3 className="text-2xl font-serif mb-4">Vielen Dank!</h3>
            <p className="text-[var(--color-muted)] mb-8">Deine Anfrage wurde erfolgreich versendet. Ich werde mich schnellstmöglich bei dir melden.</p>
            <button onClick={onClose} className="btn-primary w-full justify-center">Schließen</button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-serif mb-2">Kostenloses Erstgespräch</h2>
            <p className="text-[var(--color-muted)] mb-6 text-sm">Fülle das Formular aus und ich melde mich bei dir für einen Termin.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-dark)] mb-1">Name</label>
                <input required type="text" id="name" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] focus:border-[var(--color-gold)] transition-colors" placeholder="Dein Name" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-dark)] mb-1">E-Mail</label>
                <input required type="email" id="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] focus:border-[var(--color-gold)] transition-colors" placeholder="deine@email.de" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-dark)] mb-1">Telefon (optional)</label>
                <input type="tel" id="phone" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] focus:border-[var(--color-gold)] transition-colors" placeholder="+49 123 456789" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--color-dark)] mb-1">Nachricht (optional)</label>
                <textarea id="message" rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] focus:border-[var(--color-gold)] transition-colors" placeholder="Deine Nachricht an mich..."></textarea>
              </div>

              <div className="flex items-start gap-2">
                <input required type="checkbox" id="privacy" className="mt-1 accent-[var(--color-gold)]" />
                <label htmlFor="privacy" className="text-xs text-[var(--color-muted)]">
                  Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert werden.
                </label>
              </div>

              <button type="submit" disabled={formState === 'submitting'} className="btn-primary w-full flex justify-center items-center gap-2">
                {formState === 'submitting' ? 'Wird gesendet...' : 'Anfrage absenden'}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLegalSection, setActiveLegalSection] = useState<LegalSection>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Über mich', href: '#about' },
    { name: 'Angebote', href: '#services' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container-custom flex justify-between items-center">
          <a href="#" className="flex flex-col">
            <span className="font-serif text-xl md:text-2xl font-medium tracking-[0.1em] text-[var(--color-dark)] uppercase">Natalia</span>
            <span className="text-[var(--color-gold)] font-script text-lg -mt-1">Erziehungsberatung</span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm uppercase tracking-widest hover:text-[var(--color-gold)] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button onClick={() => setIsContactModalOpen(true)} className="btn-primary text-sm uppercase tracking-widest">
              Kontakt
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-[var(--color-dark)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-[var(--color-bg)] z-40 flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="font-serif text-3xl hover:text-[var(--color-gold)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsContactModalOpen(true); }}
              className="btn-primary mt-4"
            >
              Kostenloses Erstgespräch
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Watercolor Blobs */}
        <div className="watercolor-blob blob-pink w-[400px] h-[400px] -top-20 -right-20"></div>
        <div className="watercolor-blob blob-sage w-[300px] h-[300px] bottom-20 -left-20"></div>
        
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center h-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="order-2 md:order-1"
          >
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 items-center mb-6">
              <span className="text-[var(--color-gold)] uppercase tracking-[0.2em] text-xs font-semibold">Erziehungsberatung</span>
              <Heart size={14} className="text-[var(--color-gold)] fill-[var(--color-gold)] opacity-40 ml-2" />
              <div className="h-[1px] w-12 bg-[var(--color-gold)]"></div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 relative">
              <span className="block mb-2 font-light">Gelassen erziehen.</span>
              <span className="font-script text-[var(--color-gold)] lowercase mt-2 block">Bei dir beginnen.</span>
              <Leaf className="absolute -top-12 -left-12 text-[var(--color-sage)] opacity-10 w-24 h-24 rotate-[-15deg]" />
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-sm md:text-base text-[var(--color-muted)] mb-10 max-w-sm font-medium uppercase tracking-widest leading-loose">
              Für Mütter, die sich nach mehr Leichtigkeit und Verbundenheit sehnen.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <button onClick={() => setIsContactModalOpen(true)} className="btn-primary uppercase tracking-widest text-xs px-10">Kontakt</button>
              <a href="#about" className="btn-secondary uppercase tracking-widest text-xs px-10">Über mich</a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative z-10 rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] aspect-[3/4] md:aspect-[4/5] max-h-[80vh] mx-auto">
              <img 
                src="Bilder/input_file_1.png" 
                alt="Natalia - Erziehungsberatung" 
                className="w-full h-full object-cover sepia-[.1] brightness-[1.05] contrast-[1.05] saturate-[0.85]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements behind image */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[var(--color-gold)] rounded-[20px] -z-10 opacity-30 hidden md:block"></div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Section */}
      <Section className="bg-white py-24 relative overflow-hidden">
        <div className="watercolor-blob blob-pink w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="container-custom text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-script text-4xl text-[var(--color-gold)] mb-4">Selbstbestimmt. Verbunden. Echt.</h2>
            <p className="text-xl md:text-2xl text-[var(--color-dark)] font-serif italic border-t border-[var(--color-sand)] pt-6 mt-6">
              Erziehung beginnt nicht bei deinem Kind, sondern bei dir.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Quote Banner */}
      <div className="bg-[var(--color-sand)] py-12 overflow-hidden">
        <div className="container-custom relative">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center justify-center text-center px-10 py-16 rounded-[40px] border border-white/50 backdrop-blur-sm relative"
          >
            <div className="absolute top-0 right-10 -translate-y-1/2">
                <Leaf size={48} className="text-[var(--color-sage)] opacity-30 rotate-45" />
            </div>
            <p className="font-serif italic text-2xl md:text-3xl text-[var(--color-dark)] max-w-xl leading-relaxed mb-4">
              "Du darfst gut für dich sorgen, damit du gut für deine Kinder da sein kannst."
            </p>
            <Heart size={16} className="text-[var(--color-gold)] fill-[var(--color-gold)] opacity-40 mt-4" />
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <Section id="about" className="bg-white relative">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-script text-5xl text-[var(--color-gold)] mb-6">Du bist wichtig.</h2>
            <p className="text-xl md:text-2xl text-[var(--color-muted)] leading-relaxed italic">
              Wenn es dir gut geht, geht es auch deiner Familie gut.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="rounded-[40px] overflow-hidden shadow-2xl relative">
                <img 
                  src="Bilder/input_file_0.png" 
                  alt="Natalia Portrait" 
                  className="w-full h-auto object-cover aspect-[4/5] sepia-[.1] brightness-[1.05] contrast-[1.05] saturate-[0.85]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[var(--color-sand)] rounded-full blur-[40px] -z-10"></div>
            </motion.div>
            
            <div>
              <h2 className="text-3xl md:text-4xl mb-8 font-serif">Ich begleitete dich dabei</h2>
              <div className="space-y-6 text-[var(--color-muted)] text-lg leading-relaxed">
                <p>
                  Ich begleite dich dabei, deinen eigenen Weg zu finden - mit Herz, Verständnis und auf Augenhöhe.
                </p>
                <div className="h-[1px] w-12 bg-[var(--color-gold)] opacity-30"></div>
                <p className="font-serif italic text-xl text-[var(--color-dark)]">
                  Für eine Erziehung, die sich leicht und stimmig anfühlt.
                </p>
                <p>
                    Mein Ansatz verbindet Empathie mit praktischen Lösungen für den Alltag. Als Natalia freue ich mich darauf, dich und deine Familie ein Stück zu begleiten.
                </p>
              </div>
              <div className="mt-10 pt-10 border-t border-[var(--color-sand)]">
                <div className="font-script text-3xl text-[var(--color-gold)] mb-2">Ich freue mich auf dich!</div>
                <div className="text-xl font-serif text-[var(--color-dark)]">Natalia</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services" className="bg-[var(--color-bg)]">
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="text-[var(--color-gold)] font-script text-4xl mb-4">Mein Angebot für dich</div>
            <h2 className="text-3xl md:text-4xl mb-6">Wie ich dich unterstütze</h2>
            <div className="w-24 h-[1px] bg-[var(--color-gold)] mx-auto opacity-30"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "SELBSTGRENZUNG STATT AUFGEBEN",
                desc: "Lerne, deine eigenen Bedürfnisse wahrzunehmen und gesunde Grenzen zu setzen – ohne Schuldgefühle.",
                icon: <Heart size={32} className="text-[var(--color-gold)] mb-4" />
              },
              {
                title: "PRÄSENZ STATT PERFEKTION",
                desc: "Sei im Hier und Jetzt – für dich und deine Kinder. Echte Verbindung entsteht in kleinen Momenten.",
                icon: <Sparkles size={32} className="text-[var(--color-gold)] mb-4" />
              },
              {
                title: "GELASSENHEIT STATT STRESS",
                desc: "Verstehe, was hinter herausforderndem Verhalten steckt und finde neue Wege für einen entspannten Familienalltag.",
                icon: <Leaf size={32} className="text-[var(--color-gold)] mb-4" />
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--color-sand)] hover:border-[var(--color-gold)]/30 transition-all duration-500"
              >
                <div className="mb-6 bg-[var(--color-sand)] w-16 h-16 rounded-full flex items-center justify-center">{service.icon}</div>
                <h3 className="text-xs tracking-[0.2em] font-semibold mb-6 text-[var(--color-dark)] border-b border-[var(--color-sand)] pb-4">{service.title}</h3>
                <p className="text-[var(--color-muted)] text-base leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 max-w-2xl mx-auto bg-white p-12 rounded-[40px] text-center border border-[var(--color-sand)] shadow-sm">
             <div className="text-[var(--color-gold)] font-script text-3xl mb-4">Veränderung ist möglich.</div>
             <p className="font-serif italic text-xl mb-8">
                Für dich. Für deine Kinder. Für eure gemeinsame Zukunft.
             </p>
             <button onClick={() => setIsContactModalOpen(true)} className="btn-primary px-12 uppercase tracking-widest text-xs">
                Jetzt kostenloses Erstgespräch buchen
             </button>
          </div>
        </div>
      </Section>

      {/* Packages Section */}
      <Section id="work-with-me" className="bg-[var(--color-bg)] py-24 relative overflow-hidden">
        <div className="watercolor-blob blob-pink w-[600px] h-[600px] -right-40 top-40 opacity-10"></div>
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="text-[var(--color-gold)] font-script text-4xl mb-4">Gemeinsam gehen</div>
            <h2 className="text-3xl md:text-5xl mb-6 font-serif">Deine Begleitung</h2>
            <p className="text-[var(--color-muted)] max-w-xl mx-auto">
              Wähle den Weg, der sich für dich gerade richtig anfühlt. Jede Reise beginnt mit einem ersten Schritt.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "IMPULS-GESPRÄCH",
                duration: "Einzelsitzung",
                price: "99€",
                description: "Perfekt für eine akute Herausforderung oder um erste Klarheit in einer spezifischen Situation zu gewinnen.",
                features: ["60 Minuten online", "Lösungsorientierter Fokus", "Handfeste Übungen", "Aufzeichnung auf Wunsch"],
                featured: false
              },
              {
                name: "WEGBEGLEITER",
                duration: "1 Monat",
                price: "Ab 349€",
                description: "Für Mütter, die eine Phase der Veränderung intensiv und mit Halt durchschreiten möchten.",
                features: ["3 x 60 Min. Einzelsitzungen", "WhatsApp-Support zwischen den Sessions", "Individuelles Begleitmaterial", "Inkl. Human Design Kurz-Reading"],
                featured: true
              },
              {
                name: "TRANSFORMATION",
                duration: "6 Monate",
                price: "Auf Anfrage",
                description: "Die tiefe Reise zu dir selbst und einer völlig neuen Familiendynamik. Nachhaltig und tiefgreifend.",
                features: ["12 x 60 Min. Einzelsitzungen", "Priorisierter Support", "Vision-Coaching", "Ganzheitliche Begleitung"],
                featured: false
              }
            ].map((pkg, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className={`p-10 rounded-[40px] flex flex-col h-full bg-white transition-all duration-500 border ${
                  pkg.featured 
                    ? "border-[var(--color-gold)] shadow-[0_20px_50px_rgba(201,169,110,0.1)] scale-105 z-10" 
                    : "border-[var(--color-sand)]"
                }`}
              >
                {pkg.featured && (
                  <div className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.2em] font-bold mb-4 bg-[var(--color-sand)] px-4 py-1 rounded-full w-fit">
                    Besonders beliebt
                  </div>
                )}
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-muted)] mb-2 font-sans">{pkg.name}</h3>
                <div className="font-serif text-3xl mb-1">{pkg.duration}</div>
                <div className="text-[var(--color-gold)] font-medium mb-6">{pkg.price}</div>
                
                <p className="text-sm text-[var(--color-muted)] mb-8 leading-relaxed">
                  {pkg.description}
                </p>
                
                <ul className="space-y-4 mb-10 mt-auto">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-[var(--color-dark)] group">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] opacity-40 group-hover:opacity-100 transition-opacity"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className={`w-full py-4 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                    pkg.featured 
                      ? "bg-[var(--color-gold)] text-white hover:bg-[var(--color-dark)]" 
                      : "bg-[var(--color-sand)] text-[var(--color-dark)] hover:bg-[var(--color-gold)] hover:text-white"
                  }`}
                >
                  Anfragen
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Booking CTA */}
      <Section id="contact" className="bg-white text-center py-24 relative overflow-hidden">
        <div className="watercolor-blob blob-sage w-[400px] h-[400px] -bottom-20 -right-20 opacity-20"></div>
        <div className="container-custom max-w-2xl relative z-10">
          <h2 className="text-3xl md:text-4xl mb-6">Lass uns kennenlernen</h2>
          <p className="text-[var(--color-muted)] mb-10 text-lg">
            Bist du bereit für den nächsten Schritt? Buche jetzt dein unverbindliches Erstgespräch und wir finden heraus, wie ich dich unterstützen kann.
          </p>
          <button onClick={() => setIsContactModalOpen(true)} className="btn-primary">
            Kostenloses Erstgespräch buchen
          </button>
          <p className="mt-6 text-xs text-[var(--color-muted)] uppercase tracking-widest">Dauer: ca. 30 Minuten • Via Zoom</p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-[var(--color-bg)] text-[var(--color-dark)] py-20 border-t border-[var(--color-sand)]">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <a href="#" className="font-serif text-2xl font-bold block mb-6">Natalia</a>
              <div className="flex gap-4">
                <a href="https://instagram.com/natalia.erziehungsberatung" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[var(--color-sand)] flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="mailto:hallo@natalia.erziehungsberatung.de" className="w-10 h-10 rounded-full border border-[var(--color-sand)] flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-white transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif mb-4 uppercase tracking-[0.2em] text-xs font-semibold">Navigation</h4>
              <ul className="space-y-2 text-sm text-[var(--color-muted)]">
                <li><a href="#about" className="hover:text-[var(--color-gold)]">Über mich</a></li>
                <li><a href="#services" className="hover:text-[var(--color-gold)]">Angebote</a></li>
                <li><a href="#contact" className="hover:text-[var(--color-gold)]">Kontakt</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif mb-4 uppercase tracking-[0.2em] text-xs font-semibold">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-[var(--color-muted)]">
                <li><button onClick={() => setActiveLegalSection('impressum')} className="hover:text-[var(--color-gold)] text-left">Impressum</button></li>
                <li><button onClick={() => setActiveLegalSection('datenschutz')} className="hover:text-[var(--color-gold)] text-left">Datenschutz</button></li>
                <li><button onClick={() => setActiveLegalSection('agb')} className="hover:text-[var(--color-gold)] text-left">AGB</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif mb-4 uppercase tracking-[0.2em] text-xs font-semibold">Kontakt</h4>
              <ul className="space-y-2 text-sm text-[var(--color-muted)]">
                <li className="flex items-center gap-2"><Mail size={14} /> hallo@natalia.erziehungsberatung.de</li>
                <li className="flex items-center gap-2 font-script text-lg text-[var(--color-gold)] mt-2">Mehr Verbindung. Mehr Gelassenheit. Mehr DU.</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-xs pt-8 border-t border-[var(--color-sand)] text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} Natalia Erziehungsberatung. All rights reserved.
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {activeLegalSection && (
          <LegalModal section={activeLegalSection} onClose={() => setActiveLegalSection(null)} />
        )}
        {isContactModalOpen && (
          <ContactModal onClose={() => setIsContactModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

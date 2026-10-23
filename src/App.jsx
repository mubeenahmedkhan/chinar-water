import { useEffect, useState } from 'react'
import logo from './assets/logo.webp'
import mark from './assets/mark.png'
import bottle from './assets/bottle.webp'

/* ------------------------------------------------------------------
   Edit business details here — everything on the site reads from this.
------------------------------------------------------------------- */
const BIZ = {
  name: 'Chinar Mineral Water Trading LLC',
  nameAr: 'تشينار لتجارة المياه المعدنية ش.ذ.م.م',
  phoneDisplay: '050 255 3204',
  phoneTel: '+971502553204',
  whatsapp: '971502553204',
  email: 'chinarwater2025@gmail.com',
  city: 'Dubai, United Arab Emirates',
  license: '1531893',
}

/* Chinar tree photo: drop your own photo at public/chinar.jpg and it is used first.
   Otherwise it falls back to Wikimedia Commons photos of the Chinar (Platanus orientalis). */
const CHINAR_PHOTOS = [
  '/chinar.jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Chinar_tree.jpg?width=1800',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Platanus_orientalis_tree.JPG?width=1800',
]

const WA_LINK = `https://wa.me/${BIZ.whatsapp}?text=${encodeURIComponent(
  'Hello Chinar Water, I would like to order 5 gallon bottles.'
)}`

/* A simple chinar leaf shape, used for the falling-leaf animation */
const LEAF =
  'M50 2 L57 21 L71 13 L67 34 L91 29 L80 45 L98 55 L74 60 L80 78 L60 68 L54 84 L52 98 L48 98 L46 84 L40 68 L20 78 L26 60 L2 55 L20 45 L9 29 L33 34 L29 13 L43 21 Z'

function Leaf({ style, className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <path d={LEAF} fill="currentColor" />
    </svg>
  )
}

function FallingLeaves({ count = 9 }) {
  const leaves = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 97) % 100}%`,
    size: 14 + ((i * 7) % 18),
    delay: `${(i * 1.7) % 12}s`,
    dur: `${13 + ((i * 3) % 9)}s`,
    opacity: 0.12 + ((i * 5) % 10) / 50,
  }))
  return (
    <div className="leaves" aria-hidden="true">
      {leaves.map((l, i) => (
        <span
          key={i}
          className="leaf-wrap"
          style={{ left: l.left, animationDelay: l.delay, animationDuration: l.dur }}
        >
          <Leaf className="leaf" style={{ width: l.size, height: l.size, opacity: l.opacity }} />
        </span>
      ))}
    </div>
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const close = () => setOpen(false)
  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" onClick={close} aria-label="Chinar Mineral Water home">
          <img src={mark} alt="" width="34" height="36" />
          <span>
            Chinar<small>Mineral Water</small>
          </span>
        </a>
        <nav className="nav__links">
          <a href="#story" onClick={close}>Our Story</a>
          <a href="#product" onClick={close}>Product</a>
          <a href="#order" onClick={close}>How to Order</a>
          <a href="#contact" onClick={close}>Contact</a>
          <a href={`tel:${BIZ.phoneTel}`} className="btn btn--red btn--sm">Call {BIZ.phoneDisplay}</a>
        </nav>
        <button className="nav__toggle" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <FallingLeaves />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow fade-up" style={{ '--d': '0.05s' }}>Bottled Drinking Water · Dubai</p>
          <h1 className="fade-up" style={{ '--d': '0.15s' }}>
            Pure water,<br />
            <span className="red">naturally</span> refreshing.
          </h1>
          <p className="lead fade-up" style={{ '--d': '0.3s' }}>
            Low-sodium 5 gallon drinking water, delivered fresh to homes and offices across Dubai.
          </p>
          <div className="hero__cta fade-up" style={{ '--d': '0.45s' }}>
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn--red">
              <WhatsIcon /> Order on WhatsApp
            </a>
            <a href={`tel:${BIZ.phoneTel}`} className="btn btn--ghost">
              <PhoneIcon /> {BIZ.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="hero__visual fade-in" style={{ '--d': '0.25s' }}>
          <div className="ripples" aria-hidden="true">
            <i /><i /><i />
          </div>
          <img src={bottle} alt="Chinar 5 gallon bottled drinking water" className="bottle" width="524" height="997" />
        </div>
      </div>
      <a href="#story" className="scroll-cue" aria-label="Scroll down"><span /></a>
    </section>
  )
}

function Marquee() {
  const items = ['Pure', 'Low Sodium', '5 Gallon', 'Home & Office', 'Delivered in Dubai', 'Hygienically Sealed']
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.concat(row).map((t, i) => (
          <span key={i}>
            {t} <Leaf className="marquee__leaf" />
          </span>
        ))}
      </div>
    </div>
  )
}

function ChinarPhoto() {
  const [idx, setIdx] = useState(0)
  if (idx >= CHINAR_PHOTOS.length) return <div className="story__photo story__photo--fallback" />
  const isWiki = CHINAR_PHOTOS[idx].includes('wikimedia')
  return (
    <>
      <img
        src={CHINAR_PHOTOS[idx]}
        alt="A Chinar tree in autumn"
        className="story__photo"
        loading="lazy"
        onError={() => setIdx((i) => i + 1)}
      />
      {isWiki && (
        <a className="photo-credit" href="https://commons.wikimedia.org/wiki/Category:Platanus_orientalis" target="_blank" rel="noopener">
          Photo: Wikimedia Commons
        </a>
      )}
    </>
  )
}

function Story() {
  return (
    <section className="story" id="story">
      <ChinarPhoto />
      <div className="story__shade" />
      <div className="container story__content">
        <p className="eyebrow eyebrow--light reveal">Our Story</p>
        <h2 className="reveal">Named after the Chinar.</h2>
        <p className="reveal">
          The Chinar tree stands tall for centuries — a symbol of shade, strength and purity.
          We carry that same promise into every bottle: clean, balanced water you can trust, every day.
        </p>
      </div>
    </section>
  )
}

const FEATURES = [
  { t: 'Low Sodium', d: 'Light, balanced taste that is gentle for the whole family.', icon: 'drop' },
  { t: 'Sealed & Hygienic', d: 'Every bottle is capped and sealed for your safety.', icon: 'shield' },
  { t: 'Doorstep Delivery', d: 'Fresh bottles delivered to your home or office in Dubai.', icon: 'truck' },
  { t: 'Easy Refills', d: 'One message on WhatsApp and your next order is on the way.', icon: 'refresh' },
]

function Features() {
  return (
    <section className="section features">
      <div className="container">
        <div className="features__grid">
          {FEATURES.map((f, i) => (
            <div key={f.t} className="feature reveal" style={{ '--d': `${i * 0.08}s` }}>
              <div className="feature__icon"><Icon name={f.icon} /></div>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Product() {
  return (
    <section className="section product" id="product">
      <div className="container product__grid">
        <div className="product__visual reveal">
          <div className="product__circle" />
          <img src={bottle} alt="Chinar 5 gallon water bottle" width="524" height="997" loading="lazy" />
        </div>
        <div className="product__copy">
          <p className="eyebrow reveal">Our Product</p>
          <h2 className="reveal">5 Gallon Bottled Drinking Water</h2>
          <p className="reveal muted">
            Our signature 18.9 litre bottle — made for home and office dispensers.
            Low in sodium, sealed for freshness and delivered right to your door.
          </p>
          <ul className="specs reveal">
            <li><span>Size</span><strong>5 Gallon · 18.9 L</strong></li>
            <li><span>Type</span><strong>Low Sodium</strong></li>
            <li><span>Best for</span><strong>Homes & Offices</strong></li>
            <li><span>Delivery</span><strong>Across Dubai</strong></li>
          </ul>
          <div className="reveal">
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn--red">Get price & order</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Order() {
  const steps = [
    { n: '01', t: 'Call or WhatsApp', d: `Reach us on ${BIZ.phoneDisplay}.` },
    { n: '02', t: 'Share your location', d: 'Tell us your address and how many bottles you need.' },
    { n: '03', t: 'Enjoy pure water', d: 'We deliver fresh, sealed bottles to your door.' },
  ]
  return (
    <section className="section order" id="order">
      <div className="container">
        <p className="eyebrow center reveal">How to Order</p>
        <h2 className="center reveal">Three simple steps.</h2>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={s.n} className="step reveal" style={{ '--d': `${i * 0.12}s` }}>
              <span className="step__n">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    if (data._honey) return
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${BIZ.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: `New enquiry from ${data.name || 'website'} — Chinar Water`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json.success === 'false' || json.success === false) throw new Error('failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="eyebrow reveal">Contact</p>
          <h2 className="reveal">Let’s get you hydrated.</h2>
          <p className="muted reveal">Order, ask about pricing, or set up regular office delivery. We’ll get back to you quickly.</p>
          <div className="contact__list">
            <a className="contact__item reveal" href={`tel:${BIZ.phoneTel}`}>
              <span className="ci"><PhoneIcon /></span>
              <span><small>Phone</small>{BIZ.phoneDisplay}</span>
            </a>
            <a className="contact__item reveal" href={WA_LINK} target="_blank" rel="noopener">
              <span className="ci"><WhatsIcon /></span>
              <span><small>WhatsApp</small>{BIZ.phoneDisplay}</span>
            </a>
            <a className="contact__item reveal" href={`mailto:${BIZ.email}`}>
              <span className="ci"><Icon name="mail" /></span>
              <span><small>Email</small>{BIZ.email}</span>
            </a>
            <div className="contact__item reveal">
              <span className="ci"><Icon name="pin" /></span>
              <span><small>Location</small>{BIZ.city}</span>
            </div>
          </div>
        </div>

        <form className="card form reveal" onSubmit={onSubmit}>
          <h3>Send us a message</h3>
          <input type="text" name="_honey" className="hp" tabIndex="-1" autoComplete="off" />
          <label>
            <span>Name</span>
            <input name="name" required placeholder="Your name" />
          </label>
          <label>
            <span>Phone</span>
            <input name="phone" type="tel" required placeholder="05X XXX XXXX" />
          </label>
          <label>
            <span>Email <em>(optional)</em></span>
            <input name="email" type="email" placeholder="you@example.com" />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="4" required placeholder="e.g. 4 bottles weekly to Al Barsha" />
          </label>
          <button className="btn btn--red btn--block" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'sent' && <p className="form__note ok">Thank you! We’ll get back to you shortly.</p>}
          {status === 'error' && (
            <p className="form__note err">
              Couldn’t send right now. Please <a href={WA_LINK} target="_blank" rel="noopener">WhatsApp us</a> or call {BIZ.phoneDisplay}.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src={logo} alt="Chinar Mineral Water" className="footer__logo" width="160" height="182" loading="lazy" />
        <div className="footer__meta">
          <p><strong>{BIZ.name}</strong></p>
          <p dir="rtl" lang="ar">{BIZ.nameAr}</p>
          <p>Dubai Trade License No. {BIZ.license}</p>
          <p className="muted">© {new Date().getFullYear()} Chinar Mineral Water. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Features />
        <Product />
        <Order />
        <Contact />
      </main>
      <Footer />
      <a href={WA_LINK} target="_blank" rel="noopener" className="wa-float" aria-label="Chat on WhatsApp">
        <WhatsIcon />
      </a>
    </>
  )
}

/* ---------------- Icons ---------------- */
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  )
}
function WhatsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.7 17.8L0 24l6.3-1.7A11.8 11.8 0 0 0 24 12c0-3.2-1.2-6.1-3.5-8.4z" />
    </svg>
  )
}
function Icon({ name }) {
  const p = { viewBox: '0 0 24 24', width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  switch (name) {
    case 'drop':
      return <svg {...p}><path d="M12 2.7S5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.7 12 2.7z" /></svg>
    case 'shield':
      return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
    case 'truck':
      return <svg {...p}><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
    case 'refresh':
      return <svg {...p}><path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.5 9a9 9 0 0 1 14.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15" /></svg>
    case 'mail':
      return <svg {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>
    case 'pin':
      return <svg {...p}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
    default:
      return null
  }
}

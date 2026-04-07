import { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag, Instagram, MapPin, Truck, Clock, Shield, Star,
  MessageCircle, ChevronDown, ExternalLink, Package, Zap,
  CheckCircle, ArrowRight, X, Menu, Tag, Users, Hash
} from 'lucide-react';
import './index.css';

// ─── DATA ──────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1,
    name: 'Nike Air Jordan 1 Retro High OG',
    brand: 'Jordan Brand',
    size: 'Multiple Sizes',
    price: 220,
    originalPrice: 180,
    category: 'Sneakers',
    badge: 'HOT',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    condition: 'Deadstock',
    available: true,
  },
  {
    id: 2,
    name: 'Supreme Box Logo Hoodie FW23',
    brand: 'Supreme',
    size: 'S / M / L',
    price: 380,
    originalPrice: 168,
    category: 'Streetwear',
    badge: 'RARE',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
    condition: 'Brand New',
    available: true,
  },
  {
    id: 3,
    name: 'New Balance 550 White Green',
    brand: 'New Balance',
    size: '8 / 9 / 10 / 11',
    price: 140,
    originalPrice: 110,
    category: 'Sneakers',
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    condition: 'Deadstock',
    available: true,
  },
  {
    id: 4,
    name: 'Off-White x Nike Dunk Low',
    brand: 'Off-White',
    size: '9 / 9.5 / 10',
    price: 720,
    originalPrice: 180,
    category: 'Sneakers',
    badge: 'GRAIL',
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23be8e6?w=600&q=80',
    condition: 'Deadstock',
    available: false,
  },
  {
    id: 5,
    name: 'Essentials Fear of God Tracksuit',
    brand: 'Fear of God',
    size: 'S / M / L / XL',
    price: 160,
    originalPrice: 100,
    category: 'Streetwear',
    badge: null,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
    condition: 'Brand New',
    available: true,
  },
  {
    id: 6,
    name: 'Yeezy Boost 350 V2 Zebra',
    brand: 'Adidas',
    size: '8.5 / 9 / 10',
    price: 290,
    originalPrice: 220,
    category: 'Sneakers',
    badge: 'LIMITED',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80',
    condition: 'Deadstock',
    available: true,
  },
];

const REVIEWS = [
  {
    name: 'Marcus T.',
    location: 'New Britain, CT',
    text: 'Alex is the real deal. Got my Jordan 1s faster than expected, packed perfectly. Legit seller, no cap.',
    rating: 5,
    item: 'Jordan 1 Retro High',
  },
  {
    name: 'Jaylen R.',
    location: 'New Milford, CT',
    text: 'Met up locally, shoes were DS and verified auth. Will definitely buy again. Super easy transaction.',
    rating: 5,
    item: 'Yeezy 350 V2',
  },
  {
    name: 'Kevin M.',
    location: 'Hartford, CT',
    text: 'Shipped fast, came in perfect condition. Alex communicates well and ships quickly. 10/10 reseller.',
    rating: 5,
    item: 'Supreme Hoodie',
  },
  {
    name: 'Devon L.',
    location: 'Waterbury, CT',
    text: 'Bought a pair of NB 550s and they came DS in the og box. Prices are fair for the market. Plugged!',
    rating: 5,
    item: 'New Balance 550',
  },
];

const TICKER_ITEMS = [
  'SNEAKERS', 'STREETWEAR', 'SUPREME', 'JORDAN', 'YEEZY',
  'OFF-WHITE', 'ESSENTIALS', 'NEW BALANCE', 'FAST SHIPPING',
  'CT MEETUPS', 'DEADSTOCK', 'AUTHENTICATED', 'PLUGGED BY A1EX',
];

const HOW_TO_BUY = [
  {
    step: '01',
    title: 'Browse the Drops',
    desc: 'Check out available inventory below or see the latest drops on Instagram @pluggedbya1ex',
    icon: <ShoppingBag size={24} />,
  },
  {
    step: '02',
    title: 'DM Alex',
    desc: 'Slide into the DMs on Instagram. Come ready — say the item, your size, and your location.',
    icon: <MessageCircle size={24} />,
  },
  {
    step: '03',
    title: 'Lock It In',
    desc: 'We agree on a price. Payment accepted via Zelle, CashApp, or Venmo. Come money ready.',
    icon: <Tag size={24} />,
  },
  {
    step: '04',
    title: 'Ship or Meetup',
    desc: 'We ship fast or meet locally in New Milford / New Britain CT. You receive your heat.',
    icon: <Package size={24} />,
  },
];

// ─── COMPONENTS ────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass nav-glow' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 cursor-pointer">
          <img src="/logo.png" alt="Plugged By A1ex Logo" className="h-10 w-10 rounded-full object-cover border border-red-600/40" />
          <div>
            <span className="font-display text-xl tracking-wider text-white">PLUGGED</span>
            <span className="font-display text-xl tracking-wider text-red-500">BY A1EX</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Shop', 'How It Works', 'Reviews', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 cursor-pointer tracking-wide uppercase"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.instagram.com/pluggedbya1ex/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 btn-ghost px-4 py-2 rounded-full text-sm font-semibold cursor-pointer"
          >
            <Instagram size={16} />
            <span>@pluggedbya1ex</span>
          </a>
          <a
            href="https://www.instagram.com/pluggedbya1ex/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red px-5 py-2 rounded-full text-sm font-bold text-white cursor-pointer"
          >
            DM TO COP
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden cursor-pointer text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {['Shop', 'How It Works', 'Reviews', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-white/80 hover:text-white font-medium tracking-wide uppercase text-sm cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="https://www.instagram.com/pluggedbya1ex/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red px-5 py-3 rounded-full text-sm font-bold text-white text-center cursor-pointer"
          >
            DM TO COP ON INSTAGRAM
          </a>
        </div>
      )}
    </nav>
  );
}

function TickerBanner({ reverse = false }: { reverse?: boolean }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden py-3 border-y border-red-600/20 bg-red-600/5">
      <div className={`flex gap-12 whitespace-nowrap ${reverse ? 'animate-ticker-reverse' : 'animate-ticker'}`}
        style={{ width: 'max-content' }}>
        {items.map((item, i) => (
          <span key={i} className="text-xs font-bold tracking-[0.3em] text-white/40 flex items-center gap-6">
            {item}
            <span className="text-red-600">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(204,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,0,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-800/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        {/* Left — Text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em] text-red-400 uppercase mb-8 border border-red-600/30">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            CT's Plug for Heat
          </div>

          <h1 className="font-display text-7xl md:text-8xl lg:text-9xl leading-none tracking-wide mb-6">
            <span className="block text-white">PLUGGED</span>
            <span className="block text-shimmer">BY A1EX</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg mb-10 mx-auto lg:mx-0">
            Premium reseller based in Connecticut. Sneakers, streetwear & more — fast shipping or local meetups. DM me money ready.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
            <a
              href="https://www.instagram.com/pluggedbya1ex/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red px-8 py-4 rounded-full font-bold text-white flex items-center gap-2 cursor-pointer text-base"
            >
              <Instagram size={20} />
              DM TO COP NOW
            </a>
            <a
              href="#shop"
              className="btn-ghost px-8 py-4 rounded-full font-bold text-white flex items-center gap-2 cursor-pointer text-base"
            >
              <ShoppingBag size={20} />
              VIEW DROPS
            </a>
          </div>

          {/* Quick stats */}
          <div className="flex gap-8 justify-center lg:justify-start">
            <div>
              <div className="font-display text-3xl text-red-500">CT</div>
              <div className="text-xs text-white/40 uppercase tracking-widest">Based</div>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <div className="font-display text-3xl text-red-500">FAST</div>
              <div className="text-xs text-white/40 uppercase tracking-widest">Shipping</div>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <div className="font-display text-3xl text-red-500">DS</div>
              <div className="text-xs text-white/40 uppercase tracking-widest">Deadstock</div>
            </div>
          </div>
        </div>

        {/* Right — Logo */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative animate-float">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-red-600/20 blur-[40px] scale-110" />
            <div className="animate-pulse-red w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-red-600/30 flex items-center justify-center relative">
              <img
                src="/logo.png"
                alt="Plugged By A1ex"
                className="w-64 h-64 md:w-88 md:h-88 rounded-full object-cover border-4 border-red-600/50"
                style={{ width: '88%', height: '88%' }}
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 glass-red px-4 py-2 rounded-full flex items-center gap-2">
              <CheckCircle size={14} className="text-red-400" />
              <span className="text-xs font-bold text-white tracking-wide">VERIFIED SELLER</span>
            </div>
            <div className="absolute -top-4 -left-4 glass px-3 py-2 rounded-full flex items-center gap-2">
              <MapPin size={12} className="text-red-400" />
              <span className="text-xs font-bold text-white/80">NEW MILFORD / NEW BRITAIN, CT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest uppercase text-white/60">Scroll</span>
        <ChevronDown size={20} className="text-red-500 animate-bounce" />
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { icon: <Star size={18} className="text-yellow-400" />, value: '100%', label: 'AUTHENTIC GOODS' },
    { icon: <Truck size={18} className="text-red-400" />, value: '1-3 DAY', label: 'SHIPPING' },
    { icon: <MapPin size={18} className="text-red-400" />, value: 'CT', label: 'LOCAL MEETUPS' },
    { icon: <Shield size={18} className="text-red-400" />, value: 'DS', label: 'DEADSTOCK ONLY' },
  ];

  return (
    <section className="py-6 bg-red-600/8 border-y border-red-600/20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 glass-red rounded-xl flex items-center justify-center shrink-0">
              {s.icon}
            </div>
            <div>
              <div className="font-display text-xl tracking-wider text-white">{s.value}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Shop() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Sneakers', 'Streetwear'];

  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  const badgeColors: Record<string, string> = {
    HOT: 'bg-orange-600',
    RARE: 'bg-purple-600',
    NEW: 'bg-blue-600',
    GRAIL: 'bg-yellow-500 text-black',
    LIMITED: 'bg-red-600',
  };

  return (
    <section id="shop" className="py-24 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">Available Now</span>
            <h2 className="font-display text-5xl md:text-7xl tracking-wide mt-3 mb-3">
              CURRENT <span className="text-red-500">DROPS</span>
            </h2>
            <p className="text-white/50 text-base max-w-md">All items are deadstock / brand new unless stated. DM to inquire about sizing, shipping, or meetups.</p>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold cursor-pointer transition-all duration-200 ${
                  filter === cat
                    ? 'bg-red-600 text-white'
                    : 'glass text-white/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="product-card glass rounded-2xl overflow-hidden border border-white/5 cursor-pointer group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 ${badgeColors[product.badge]} px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white`}>
                    {product.badge}
                  </div>
                )}

                {/* Available indicator */}
                <div className={`absolute top-3 right-3 flex items-center gap-1.5 glass px-3 py-1 rounded-full`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${product.available ? 'bg-green-400' : 'bg-red-500'}`} />
                  <span className="text-[10px] font-bold text-white/80">{product.available ? 'AVAILABLE' : 'SOLD'}</span>
                </div>

                {/* Condition */}
                <div className="absolute bottom-3 left-3 glass px-2 py-1 rounded-full text-[10px] font-bold text-white/80 tracking-wider">
                  {product.condition}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="text-[10px] text-red-400 font-bold tracking-widest uppercase mb-1">{product.brand} · {product.category}</div>
                <h3 className="text-white font-bold text-base leading-tight mb-2">{product.name}</h3>
                <div className="text-white/40 text-xs mb-4">Size: {product.size}</div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-white/30 line-through mb-0.5">Retail: ${product.originalPrice}</div>
                    <div className="font-display text-3xl text-white">${product.price}</div>
                  </div>
                  {product.available ? (
                    <a
                      href="https://www.instagram.com/pluggedbya1ex/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-red px-4 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 cursor-pointer"
                    >
                      <Instagram size={14} />
                      DM TO COP
                    </a>
                  ) : (
                    <span className="text-sm text-white/30 font-bold">SOLD OUT</span>
                  )}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-white/40 text-sm mb-5 tracking-wide">Don't see what you're looking for? Hit the DMs — I can source it.</p>
          <a
            href="https://www.instagram.com/pluggedbya1ex/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 btn-red px-8 py-4 rounded-full font-bold text-white cursor-pointer text-base"
          >
            <Instagram size={20} />
            FOLLOW FOR NEW DROPS
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-dark-surface/50">
      <div className="section-divider mb-0" />
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="text-center mb-16">
          <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">Simple Process</span>
          <h2 className="font-display text-5xl md:text-7xl tracking-wide mt-3 mb-4">
            HOW TO <span className="text-red-500">COP</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">No complicated checkout. Just slide in the DMs and let's make it happen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_TO_BUY.map((step, i) => (
            <div key={i} className="relative glass rounded-2xl p-6 border border-white/5 group hover:border-red-600/30 transition-all duration-300">
              {/* Step number */}
              <div className="font-display text-6xl text-red-600/15 absolute top-4 right-4 leading-none">{step.step}</div>

              {/* Icon */}
              <div className="w-12 h-12 glass-red rounded-xl flex items-center justify-center mb-5 text-red-400 relative z-10">
                {step.icon}
              </div>

              <h3 className="text-white font-bold text-base mb-3 relative z-10">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed relative z-10">{step.desc}</p>

              {/* Arrow connector (not on last) */}
              {i < HOW_TO_BUY.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                  <ArrowRight size={20} className="text-red-600/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="mt-14 glass rounded-2xl p-8 border border-white/5 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="text-red-400 text-xs font-bold tracking-[0.3em] uppercase mb-2">Payment Accepted</div>
            <h3 className="text-white font-bold text-2xl mb-2">Quick & Safe Payments</h3>
            <p className="text-white/50 text-sm">I accept Zelle, CashApp, and Venmo. Payment upfront for shipped orders. Cash for local meetups.</p>
          </div>
          <div className="flex gap-4 text-center">
            {['Zelle', 'CashApp', 'Venmo', 'Cash'].map((p) => (
              <div key={p} className="glass-red px-4 py-3 rounded-xl">
                <div className="text-xs font-bold text-red-300 tracking-wide">{p}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ShippingSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Shipping */}
          <div className="glass rounded-3xl p-8 md:p-10 border border-white/5 relative overflow-hidden group hover:border-red-600/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-[60px]" />
            <div className="relative z-10">
              <div className="w-14 h-14 glass-red rounded-2xl flex items-center justify-center mb-6 text-red-400">
                <Truck size={28} />
              </div>
              <h3 className="font-display text-4xl tracking-wide text-white mb-3">FAST SHIPPING</h3>
              <p className="text-white/50 leading-relaxed mb-6">All items ship within 24-48 hours of payment. Tracking provided. Packages insured & professionally packed.</p>
              <ul className="space-y-3">
                {['USPS Priority / First Class', 'Full tracking provided', 'Secure bubble-wrap packaging', 'Ships within 1-2 business days'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle size={14} className="text-red-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Meetups */}
          <div className="glass rounded-3xl p-8 md:p-10 border border-white/5 relative overflow-hidden group hover:border-red-600/30 transition-all duration-300">
            <div className="absolute top-0 left-0 w-48 h-48 bg-red-800/10 rounded-full blur-[60px]" />
            <div className="relative z-10">
              <div className="w-14 h-14 glass-red rounded-2xl flex items-center justify-center mb-6 text-red-400">
                <MapPin size={28} />
              </div>
              <h3 className="font-display text-4xl tracking-wide text-white mb-3">LOCAL MEETUPS</h3>
              <p className="text-white/50 leading-relaxed mb-6">Prefer to meet in person? I do local meetups in New Milford and New Britain, CT. Safe public spots only.</p>
              <ul className="space-y-3">
                {['New Milford, CT', 'New Britain, CT', 'Public locations only', 'Cash is king for meetups'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle size={14} className="text-red-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-dark-surface/30">
      <div className="section-divider mb-0" />
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="text-center mb-14">
          <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">Customer Love</span>
          <h2 className="font-display text-5xl md:text-7xl tracking-wide mt-3 mb-4">
            WHAT THEY <span className="text-red-500">SAY</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            <span className="text-white/40 text-sm ml-2">5.0 · All verified buyers</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((review, i) => (
            <div key={i} className="glass rounded-2xl p-6 border border-white/5 hover:border-red-600/20 transition-all duration-300">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-5">"{review.text}"</p>

              <div className="pt-4 border-t border-white/5">
                <div className="font-bold text-white text-sm">{review.name}</div>
                <div className="text-[10px] text-white/40 tracking-wide">{review.location}</div>
                <div className="text-[10px] text-red-400 font-bold mt-1 tracking-widest uppercase">{review.item}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass rounded-3xl p-10 md:p-16 border border-white/5 relative overflow-hidden text-center">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto glass-red rounded-full flex items-center justify-center mb-6 text-red-400">
              <Instagram size={36} />
            </div>

            <h2 className="font-display text-5xl md:text-7xl tracking-wide mb-4">
              FOLLOW THE <span className="text-red-500">PLUG</span>
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">
              New drops posted daily. Shipping highlights. Meetup clips. Follow <span className="text-white font-bold">@pluggedbya1ex</span> and never miss heat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/pluggedbya1ex/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red px-10 py-4 rounded-full font-bold text-white flex items-center gap-2 justify-center cursor-pointer text-base"
              >
                <Instagram size={20} />
                @pluggedbya1ex
                <ExternalLink size={16} />
              </a>
              <a
                href="https://www.instagram.com/pluggedbya1ex/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-10 py-4 rounded-full font-bold text-white flex items-center gap-2 justify-center cursor-pointer text-base"
              >
                <MessageCircle size={20} />
                SEND A DM
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/8">
              <div>
                <div className="font-display text-4xl text-red-500 mb-1">180+</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Followers</div>
              </div>
              <div>
                <div className="font-display text-4xl text-red-500 mb-1">2</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Posts & Growing</div>
              </div>
              <div>
                <div className="font-display text-4xl text-red-500 mb-1">100%</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="section-divider mb-12" />
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">Get In Touch</span>
        <h2 className="font-display text-5xl md:text-7xl tracking-wide mt-3 mb-4">
          READY TO <span className="text-red-500">COP?</span>
        </h2>
        <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">
          Don't overthink it. Slide in the DMs with what you want, your size, and your location. I'll handle the rest.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          <div className="glass rounded-2xl p-6 border border-white/5 text-center">
            <Instagram size={28} className="text-red-400 mx-auto mb-3" />
            <div className="text-white font-bold mb-1">Instagram DM</div>
            <div className="text-white/40 text-sm">@pluggedbya1ex</div>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/5 text-center">
            <MapPin size={28} className="text-red-400 mx-auto mb-3" />
            <div className="text-white font-bold mb-1">Location</div>
            <div className="text-white/40 text-sm">New Milford / New Britain, CT</div>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/5 text-center">
            <Clock size={28} className="text-red-400 mx-auto mb-3" />
            <div className="text-white font-bold mb-1">Response Time</div>
            <div className="text-white/40 text-sm">Usually within a few hours</div>
          </div>
        </div>

        <a
          href="https://www.instagram.com/pluggedbya1ex/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 btn-red px-12 py-5 rounded-full font-bold text-white cursor-pointer text-lg"
        >
          <Instagram size={24} />
          DM ME RIGHT NOW
          <ArrowRight size={20} />
        </a>

        <p className="text-white/20 text-xs mt-6 tracking-widest uppercase">Come money ready · No refunds · All sales final</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Plugged By A1ex" className="h-10 w-10 rounded-full object-cover border border-red-600/40" />
            <div>
              <div className="font-display text-lg tracking-wider">
                <span className="text-white">PLUGGED</span>
                <span className="text-red-500">BY A1EX</span>
              </div>
              <div className="text-[10px] text-white/30 tracking-widest uppercase">CT's Premier Reseller</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-xs text-white/30 uppercase tracking-widest">
            <a href="#shop" className="hover:text-white transition-colors cursor-pointer">Shop</a>
            <a href="#how-it-works" className="hover:text-white transition-colors cursor-pointer">How It Works</a>
            <a href="#reviews" className="hover:text-white transition-colors cursor-pointer">Reviews</a>
            <a href="https://www.instagram.com/pluggedbya1ex/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1">
              <Instagram size={12} /> Instagram
            </a>
          </div>
        </div>

        <div className="section-divider my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/20 tracking-widest">
          <span>© 2026 PLUGGED BY A1EX. ALL RIGHTS RESERVED.</span>
          <span>NEW MILFORD / NEW BRITAIN, CT · @pluggedbya1ex</span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ───────────────────────────────────────────────────────────────

export default function App() {
  return (
    <main className="font-body text-white bg-dark-bg grain selection:bg-red-600 selection:text-white">
      <Navbar />
      <Hero />
      <TickerBanner />
      <TrustBar />
      <Shop />
      <TickerBanner reverse />
      <HowItWorks />
      <ShippingSection />
      <Reviews />
      <InstagramSection />
      <Contact />
      <Footer />
    </main>
  );
}

import { useState, useEffect } from 'react';
import {
  ShoppingBag, Instagram, MapPin, Truck, Clock, Shield, Star,
  MessageCircle, ChevronDown, ExternalLink, Package,
  CheckCircle, ArrowRight, X, Menu, Tag
} from 'lucide-react';
import './index.css';

// ─── INSTAGRAM DM LINK ────────────────────────────────────────────────────
const IG_URL = 'https://www.instagram.com/pluggedbya1ex/';
const IG_DM  = 'https://ig.me/m/pluggedbya1ex';

// ─── PRODUCT DATA (matching what Alex actually sells) ──────────────────────

const PRODUCTS = [
  {
    id: 1,
    name: 'LV Monogram Beanie',
    brand: 'Louis Vuitton',
    size: 'One Size',
    price: 280,
    category: 'Accessories',
    badge: 'HOT',
    image: '/lv_beanie.png',
    condition: 'Brand New',
    available: true,
  },
  {
    id: 2,
    name: 'Chrome Hearts Trucker Hat',
    brand: 'Chrome Hearts',
    size: 'One Size',
    price: 350,
    category: 'Accessories',
    badge: 'RARE',
    image: '/chrome_hearts_hat.png',
    condition: 'Brand New',
    available: true,
  },
  {
    id: 3,
    name: 'LV Monogram Messenger Bag',
    brand: 'Louis Vuitton',
    size: 'Medium',
    price: 1200,
    category: 'Bags',
    badge: 'GRAIL',
    image: '/lv_bag.png',
    condition: 'Like New',
    available: true,
  },
  {
    id: 4,
    name: 'Denim Tears Cotton Wreath Jeans',
    brand: 'Denim Tears',
    size: '30 / 32 / 34',
    price: 320,
    category: 'Streetwear',
    badge: 'LIMITED',
    image: '/denim_tears.png',
    condition: 'Brand New',
    available: true,
  },
  {
    id: 5,
    name: 'Essentials Oversized Hoodie',
    brand: 'Fear of God',
    size: 'S / M / L / XL',
    price: 120,
    category: 'Streetwear',
    badge: null,
    image: '/essentials_hoodie.png',
    condition: 'Brand New',
    available: true,
  },
  {
    id: 6,
    name: 'Jordan 4 Retro "Bred Reimagined"',
    brand: 'Jordan Brand',
    size: '8 / 9 / 10 / 11',
    price: 290,
    category: 'Sneakers',
    badge: 'HOT',
    image: '/jordan_4.png',
    condition: 'Deadstock',
    available: true,
  },
  {
    id: 7,
    name: 'Supreme Box Logo Beanie',
    brand: 'Supreme',
    size: 'One Size',
    price: 95,
    category: 'Accessories',
    badge: 'NEW',
    image: '/supreme_beanie.png',
    condition: 'Brand New',
    available: true,
  },
  {
    id: 8,
    name: 'Chrome Hearts Hollywood Hoodie',
    brand: 'Chrome Hearts',
    size: 'M / L / XL',
    price: 680,
    category: 'Streetwear',
    badge: 'RARE',
    image: '/chrome_hearts_hoodie.png',
    condition: 'Brand New',
    available: false,
  },
  {
    id: 9,
    name: 'LV Monogram Bifold Wallet',
    brand: 'Louis Vuitton',
    size: 'One Size',
    price: 420,
    category: 'Accessories',
    badge: null,
    image: '/lv_wallet.png',
    condition: 'Like New',
    available: true,
  },
];

const REVIEWS = [
  {
    name: 'Marcus T.',
    location: 'New Britain, CT',
    text: 'Copped an LV beanie from Alex — came fast, legit, and the quality is crazy. Real plug right here.',
    rating: 5,
    item: 'LV Beanie',
  },
  {
    name: 'Jaylen R.',
    location: 'New Milford, CT',
    text: "Met up locally for Chrome Hearts hat, it's fire. Super easy transaction and Alex keeps it real. Will be back.",
    rating: 5,
    item: 'Chrome Hearts Hat',
  },
  {
    name: 'Kevin M.',
    location: 'Hartford, CT',
    text: 'Shipped fast, the Essentials hoodie came in perfect condition. Alex communicates well and ships quickly. 10/10.',
    rating: 5,
    item: 'Essentials Hoodie',
  },
  {
    name: 'Devon L.',
    location: 'Waterbury, CT',
    text: 'Got Denim Tears jeans shipped to me — DS, perfect condition. Prices are fair for the market. Plugged!',
    rating: 5,
    item: 'Denim Tears Jeans',
  },
  {
    name: 'Tommy S.',
    location: 'Danbury, CT',
    text: 'Alex sourced me a pair of Jordan 4s I couldn\'t find anywhere. Came DS in the OG box. Instant follow.',
    rating: 5,
    item: 'Jordan 4 Bred',
  },
];

const TICKER_ITEMS = [
  'LOUIS VUITTON', 'CHROME HEARTS', 'DENIM TEARS', 'ESSENTIALS',
  'SUPREME', 'JORDAN', 'DESIGNER', 'STREETWEAR', 'FAST SHIPPING',
  'CT MEETUPS', 'DEADSTOCK', 'AUTHENTIC', 'PLUGGED BY A1EX',
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass nav-glow' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0">
          <img src="/logo.png" alt="Plugged By A1ex Logo" className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border border-red-600/40" />
          <div className="hidden xs:block">
            <span className="font-display text-lg sm:text-xl tracking-wider text-white">PLUGGED</span>
            <span className="font-display text-lg sm:text-xl tracking-wider text-red-500">BY A1EX</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
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

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 btn-ghost px-4 py-2 rounded-full text-sm font-semibold cursor-pointer"
          >
            <Instagram size={16} />
            <span>@pluggedbya1ex</span>
          </a>
          <a
            href={IG_DM}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red px-5 py-2 rounded-full text-sm font-bold text-white cursor-pointer inline-block text-center"
          >
            DM TO COP
          </a>
        </div>

        {/* Mobile CTA + hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={IG_DM}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <Instagram size={14} />
            DM
          </a>
          <button
            className="cursor-pointer text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-[56px] bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 px-6">
          {['Shop', 'How It Works', 'Reviews', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-display text-3xl text-white/90 hover:text-red-400 transition-colors tracking-widest cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {item.toUpperCase()}
            </a>
          ))}
          <a
            href={IG_DM}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red px-8 py-4 rounded-full text-base font-bold text-white flex items-center gap-3 cursor-pointer mt-4"
            onClick={() => setMenuOpen(false)}
          >
            <Instagram size={20} />
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
      <div className={`flex gap-8 sm:gap-12 whitespace-nowrap ${reverse ? 'animate-ticker-reverse' : 'animate-ticker'}`}
        style={{ width: 'max-content' }}>
        {items.map((item, i) => (
          <span key={i} className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-white/40 flex items-center gap-4 sm:gap-6">
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
    <section id="home" className="relative min-h-[100svh] flex flex-col items-center justify-center pt-20 pb-8 sm:pt-24 sm:pb-12 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(204,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,0,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-red-800/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left — Text */}
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 glass px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] text-red-400 uppercase mb-6 sm:mb-8 border border-red-600/30">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            CT's Plug for Heat
          </div>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-wide mb-4 sm:mb-6">
            <span className="block text-white">PLUGGED</span>
            <span className="block text-shimmer">BY A1EX</span>
          </h1>

          <p className="text-white/60 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mb-8 sm:mb-10 mx-auto lg:mx-0">
            Premium reseller based in Connecticut. Designer, sneakers, streetwear & more — fast shipping or local meetups. DM me money ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10">
            <a
              href={IG_DM}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-white flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
            >
              <Instagram size={20} />
              DM TO COP NOW
            </a>
            <a
              href="#shop"
              className="btn-ghost px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-white flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
            >
              <ShoppingBag size={20} />
              VIEW DROPS
            </a>
          </div>

          {/* Quick stats */}
          <div className="flex gap-6 sm:gap-8 justify-center lg:justify-start">
            {[
              { val: 'CT', label: 'Based' },
              { val: 'FAST', label: 'Shipping' },
              { val: '100%', label: 'Authentic' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center lg:items-start">
                <div className="font-display text-2xl sm:text-3xl text-red-500">{s.val}</div>
                <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest">{s.label}</div>
                {i < 2 && <div className="hidden lg:block" />}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Logo */}
        <div className="flex-1 flex items-center justify-center order-1 lg:order-2 mb-4 lg:mb-0">
          <div className="relative animate-float">
            <div className="absolute inset-0 rounded-full bg-red-600/20 blur-[40px] scale-110" />
            <div className="animate-pulse-red w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-2 border-red-600/30 flex items-center justify-center relative">
              <img
                src="/logo.png"
                alt="Plugged By A1ex"
                className="rounded-full object-cover border-4 border-red-600/50"
                style={{ width: '88%', height: '88%' }}
              />
            </div>

            {/* Floating badges */}
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 glass-red px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2">
              <CheckCircle size={12} className="text-red-400" />
              <span className="text-[10px] sm:text-xs font-bold text-white tracking-wide">VERIFIED</span>
            </div>
            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 glass px-2 sm:px-3 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2">
              <MapPin size={10} className="text-red-400" />
              <span className="text-[9px] sm:text-xs font-bold text-white/80">CT BASED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 opacity-40">
        <span className="text-[10px] sm:text-xs tracking-widest uppercase text-white/60">Scroll</span>
        <ChevronDown size={18} className="text-red-500 animate-bounce" />
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { icon: <Star size={16} className="text-yellow-400" />, value: '100%', label: 'AUTHENTIC' },
    { icon: <Truck size={16} className="text-red-400" />, value: '1-3 DAY', label: 'SHIPPING' },
    { icon: <MapPin size={16} className="text-red-400" />, value: 'CT', label: 'MEETUPS' },
    { icon: <Shield size={16} className="text-red-400" />, value: 'LUXURY', label: 'BRANDS' },
  ];

  return (
    <section className="py-4 sm:py-6 bg-red-600/5 border-y border-red-600/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 glass-red rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
              {s.icon}
            </div>
            <div>
              <div className="font-display text-base sm:text-xl tracking-wider text-white">{s.value}</div>
              <div className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Shop() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Accessories', 'Sneakers', 'Streetwear', 'Bags'];

  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  const badgeColors: Record<string, string> = {
    HOT: 'bg-orange-600',
    RARE: 'bg-purple-600',
    NEW: 'bg-emerald-600',
    GRAIL: 'bg-yellow-500 text-black',
    LIMITED: 'bg-red-600',
  };

  return (
    <section id="shop" className="py-16 sm:py-24 relative">
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 sm:mb-14 gap-4 sm:gap-6">
          <div>
            <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">Available Now</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-wide mt-2 sm:mt-3 mb-2 sm:mb-3">
              CURRENT <span className="text-red-500">DROPS</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base max-w-md">All items are authentic. DM to inquire about sizing, shipping, or meetups.</p>
          </div>

          {/* Filter pills — horizontally scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0 ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <a
              key={product.id}
              href={product.available ? IG_DM : undefined}
              target={product.available ? '_blank' : undefined}
              rel={product.available ? 'noopener noreferrer' : undefined}
              className={`product-card glass rounded-2xl overflow-hidden border border-white/5 group block ${product.available ? 'cursor-pointer' : 'cursor-default opacity-70'}`}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-black/40">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 ${badgeColors[product.badge]} px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white`}>
                    {product.badge}
                  </div>
                )}

                {/* Available indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 glass px-2.5 sm:px-3 py-1 rounded-full">
                  <span className={`w-1.5 h-1.5 rounded-full ${product.available ? 'bg-green-400' : 'bg-red-500'}`} />
                  <span className="text-[10px] font-bold text-white/80">{product.available ? 'AVAILABLE' : 'SOLD'}</span>
                </div>

                {/* Condition */}
                <div className="absolute bottom-3 left-3 glass px-2 py-1 rounded-full text-[10px] font-bold text-white/80 tracking-wider">
                  {product.condition}
                </div>

                {/* SOLD overlay */}
                {!product.available && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="font-display text-4xl text-white/30 tracking-widest rotate-[-15deg]">SOLD</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 sm:p-5">
                <div className="text-[10px] text-red-400 font-bold tracking-widest uppercase mb-1">{product.brand} · {product.category}</div>
                <h3 className="text-white font-bold text-sm sm:text-base leading-tight mb-1.5 sm:mb-2">{product.name}</h3>
                <div className="text-white/40 text-xs mb-3 sm:mb-4">Size: {product.size}</div>

                <div className="flex items-end justify-between">
                  <div className="font-display text-2xl sm:text-3xl text-white">${product.price}</div>
                  {product.available ? (
                    <span className="btn-red px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 sm:gap-2">
                      <Instagram size={14} />
                      DM TO COP
                    </span>
                  ) : (
                    <span className="text-xs sm:text-sm text-white/30 font-bold">SOLD OUT</span>
                  )}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-16">
          <p className="text-white/40 text-sm mb-4 sm:mb-5 tracking-wide">Don't see what you're looking for? Hit the DMs — I can source it.</p>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 btn-red px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-white cursor-pointer text-sm sm:text-base"
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
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#0d0d0d]">
      <div className="section-divider mb-0" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">Simple Process</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-wide mt-2 sm:mt-3 mb-3 sm:mb-4">
            HOW TO <span className="text-red-500">COP</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm sm:text-base">No complicated checkout. Just slide in the DMs and let's make it happen.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {HOW_TO_BUY.map((step, i) => (
            <div key={i} className="relative glass rounded-2xl p-5 sm:p-6 border border-white/5 group hover:border-red-600/30 transition-all duration-300">
              <div className="font-display text-5xl sm:text-6xl text-red-600/15 absolute top-4 right-4 leading-none">{step.step}</div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 glass-red rounded-xl flex items-center justify-center mb-4 sm:mb-5 text-red-400 relative z-10">
                {step.icon}
              </div>
              <h3 className="text-white font-bold text-sm sm:text-base mb-2 sm:mb-3 relative z-10">{step.title}</h3>
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed relative z-10">{step.desc}</p>
              {i < HOW_TO_BUY.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                  <ArrowRight size={20} className="text-red-600/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="mt-8 sm:mt-14 glass rounded-2xl p-5 sm:p-8 border border-white/5 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="text-red-400 text-xs font-bold tracking-[0.3em] uppercase mb-2">Payment Accepted</div>
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">Quick & Safe Payments</h3>
            <p className="text-white/50 text-xs sm:text-sm">I accept Zelle, CashApp, and Venmo. Payment upfront for shipped orders. Cash for local meetups.</p>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {['Zelle', 'CashApp', 'Venmo', 'Cash'].map((p) => (
              <div key={p} className="glass-red px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-center">
                <div className="text-[10px] sm:text-xs font-bold text-red-300 tracking-wide">{p}</div>
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
    <section className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Shipping */}
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/5 relative overflow-hidden group hover:border-red-600/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-[60px]" />
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 glass-red rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 text-red-400">
                <Truck size={24} />
              </div>
              <h3 className="font-display text-3xl sm:text-4xl tracking-wide text-white mb-2 sm:mb-3">FAST SHIPPING</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4 sm:mb-6">All items ship within 24-48 hours. Tracking provided. Packages insured & professionally packed.</p>
              <ul className="space-y-2.5 sm:space-y-3">
                {['USPS Priority / First Class', 'Full tracking provided', 'Secure packaging', 'Ships within 1-2 business days'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/70">
                    <CheckCircle size={14} className="text-red-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Meetups */}
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/5 relative overflow-hidden group hover:border-red-600/30 transition-all duration-300">
            <div className="absolute top-0 left-0 w-48 h-48 bg-red-800/10 rounded-full blur-[60px]" />
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 glass-red rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 text-red-400">
                <MapPin size={24} />
              </div>
              <h3 className="font-display text-3xl sm:text-4xl tracking-wide text-white mb-2 sm:mb-3">LOCAL MEETUPS</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4 sm:mb-6">I do local meetups in New Milford and New Britain, CT. Safe public spots only.</p>
              <ul className="space-y-2.5 sm:space-y-3">
                {['New Milford, CT', 'New Britain, CT', 'Public locations only', 'Cash is king for meetups'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/70">
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
    <section id="reviews" className="py-16 sm:py-24 bg-[#0d0d0d]">
      <div className="section-divider mb-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">Customer Love</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-wide mt-2 sm:mt-3 mb-3 sm:mb-4">
            WHAT THEY <span className="text-red-500">SAY</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            <span className="text-white/40 text-xs sm:text-sm ml-2">5.0 · All verified buyers</span>
          </div>
        </div>

        {/* Horizontally scrollable on mobile, grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide">
          {REVIEWS.map((review, i) => (
            <div key={i} className="glass rounded-2xl p-5 sm:p-6 border border-white/5 hover:border-red-600/20 transition-all duration-300 min-w-[280px] sm:min-w-[300px] lg:min-w-0 snap-start shrink-0 lg:shrink">
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={12} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">"{review.text}"</p>
              <div className="pt-3 sm:pt-4 border-t border-white/5">
                <div className="font-bold text-white text-xs sm:text-sm">{review.name}</div>
                <div className="text-[9px] sm:text-[10px] text-white/40 tracking-wide">{review.location}</div>
                <div className="text-[9px] sm:text-[10px] text-red-400 font-bold mt-1 tracking-widest uppercase">{review.item}</div>
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
    <section className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 border border-white/5 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-60 sm:w-80 h-60 sm:h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto glass-red rounded-full flex items-center justify-center mb-4 sm:mb-6 text-red-400">
              <Instagram size={30} />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-wide mb-3 sm:mb-4">
              FOLLOW THE <span className="text-red-500">PLUG</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto">
              New drops posted daily. Follow <span className="text-white font-bold">@pluggedbya1ex</span> and never miss heat.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-white flex items-center gap-2 justify-center cursor-pointer text-sm sm:text-base"
              >
                <Instagram size={20} />
                @pluggedbya1ex
                <ExternalLink size={16} />
              </a>
              <a
                href={IG_DM}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-white flex items-center gap-2 justify-center cursor-pointer text-sm sm:text-base"
              >
                <MessageCircle size={20} />
                SEND A DM
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-white/10">
              <div>
                <div className="font-display text-2xl sm:text-4xl text-red-500 mb-1">180+</div>
                <div className="text-[9px] sm:text-xs text-white/40 uppercase tracking-widest">Followers</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-4xl text-red-500 mb-1">DAILY</div>
                <div className="text-[9px] sm:text-xs text-white/40 uppercase tracking-widest">New Drops</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-4xl text-red-500 mb-1">100%</div>
                <div className="text-[9px] sm:text-xs text-white/40 uppercase tracking-widest">Satisfaction</div>
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
    <section id="contact" className="py-16 sm:py-24">
      <div className="section-divider mb-8 sm:mb-12" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">Get In Touch</span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-wide mt-2 sm:mt-3 mb-3 sm:mb-4">
          READY TO <span className="text-red-500">COP?</span>
        </h2>
        <p className="text-white/50 text-sm sm:text-lg mb-8 sm:mb-12 max-w-xl mx-auto">
          Slide in the DMs with what you want, your size, and your location. I'll handle the rest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-12">
          <a href={IG_DM} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-5 sm:p-6 border border-white/5 text-center hover:border-red-600/30 transition-all duration-300 cursor-pointer block">
            <Instagram size={24} className="text-red-400 mx-auto mb-2 sm:mb-3" />
            <div className="text-white font-bold text-sm sm:text-base mb-1">Instagram DM</div>
            <div className="text-white/40 text-xs sm:text-sm">@pluggedbya1ex</div>
          </a>
          <div className="glass rounded-2xl p-5 sm:p-6 border border-white/5 text-center">
            <MapPin size={24} className="text-red-400 mx-auto mb-2 sm:mb-3" />
            <div className="text-white font-bold text-sm sm:text-base mb-1">Location</div>
            <div className="text-white/40 text-xs sm:text-sm">New Milford / New Britain, CT</div>
          </div>
          <div className="glass rounded-2xl p-5 sm:p-6 border border-white/5 text-center">
            <Clock size={24} className="text-red-400 mx-auto mb-2 sm:mb-3" />
            <div className="text-white font-bold text-sm sm:text-base mb-1">Response Time</div>
            <div className="text-white/40 text-xs sm:text-sm">Usually within a few hours</div>
          </div>
        </div>

        <a
          href={IG_DM}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 sm:gap-3 btn-red px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-white cursor-pointer text-base sm:text-lg"
        >
          <Instagram size={22} />
          DM ME RIGHT NOW
          <ArrowRight size={18} />
        </a>

        <p className="text-white/20 text-[10px] sm:text-xs mt-4 sm:mt-6 tracking-widest uppercase">Come money ready · No refunds · All sales final</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 sm:py-12 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-3 cursor-pointer">
            <img src="/logo.png" alt="Plugged By A1ex" className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover border border-red-600/40" />
            <div>
              <div className="font-display text-base sm:text-lg tracking-wider">
                <span className="text-white">PLUGGED</span>
                <span className="text-red-500">BY A1EX</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-white/30 tracking-widest uppercase">CT's Premier Reseller</div>
            </div>
          </a>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-white/30 uppercase tracking-widest">
            <a href="#shop" className="hover:text-white transition-colors cursor-pointer">Shop</a>
            <a href="#how-it-works" className="hover:text-white transition-colors cursor-pointer">How It Works</a>
            <a href="#reviews" className="hover:text-white transition-colors cursor-pointer">Reviews</a>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1">
              <Instagram size={12} /> Instagram
            </a>
          </div>
        </div>

        <div className="section-divider my-6 sm:my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs text-white/20 tracking-widest text-center sm:text-left">
          <span>© 2026 PLUGGED BY A1EX. ALL RIGHTS RESERVED.</span>
          <span>NEW MILFORD / NEW BRITAIN, CT</span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ───────────────────────────────────────────────────────────────

export default function App() {
  return (
    <main className="font-body text-white bg-[#0a0a0a] grain selection:bg-red-600 selection:text-white overflow-x-hidden">
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

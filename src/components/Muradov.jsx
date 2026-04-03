import React, { useState } from 'react'
const collections = [
  { id: 1, name: 'Designer Delights Collection', image: 'https://frankfurt.apollo.olxcdn.com/v1/files/8wewkb0tepir-UZ/image' },
  { id: 2, name: 'Travel Essentials Collection', image: 'https://cdn-img.birbir.uz/i/400x400-fit/files/1f/29/74bc928c9bd18dd6cc5fe478845c.jpg' },
  { id: 3, name: 'Special Occasions Collection', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCMLrRIiPgx3ONrNHIOdJa8U7oQcFGbsxzFA&s' },
  { id: 4, name: 'Seasonal Sensations Collection', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVRPgBsrcrbe4ZwUOhW4oTHYKe05s9r0OQGA&s' },
  { id: 5, name: 'Vintage Treasures Collection', image: 'https://frankfurt.apollo.olxcdn.com/v1/files/q6a7nzh33rlj-UZ/image;s=830x1200' },
  { id: 6, name: 'Limited Edition Treasures', image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload/reduced/product_gallery/1f/eb/1feb493433b0dd0613831c93e93317ee.jpg' },
  { id: 7, name: 'Modern Classics Collection', image: 'https://images.uzum.uz/cp5lh0nfrr80f2gm2hd0/original.jpg' },
]

const articles = [
  {
    id: 1,
    title: 'The Soothing Symphony of Lavender Perfumes: Unlocking the Secrets of a Fragrant Elixir',
    desc: 'Lavender, with its enchanting aroma and rich history, has been cherished for centuries as a symbol of relaxation, healing, and timeless beauty.',
    image: 'https://images.uzum.uz/cvucahdpb7fbmqmnsl40/t_product_540_high.jpg',
  },
  {
    id: 2,
    title: 'The Art of Curating a Luxury Perfume Collection: A Symphony of Scents and Stories',
    desc: "A luxury perfume collection is a reflection of one's taste, personality, and experiences. Each bottle holds a unique olfactory journey crafted with the finest ingredients.",
    image: 'https://100k.website.yandexcloud.net/resized/1000x1000/products/images/0YWIT79QkVrMP2cNWkSkalvTvKJk2iAEWFJ0O52p.jpg.webp',
  },
  {
    id: 3,
    title: 'The Timeless Elegance of Rose Perfumes: Unveiling the Queen of Flowers in Fragrance',
    desc: 'Rose has held a special place in human culture for centuries. This iconic bloom has inspired perfumers to create some of the most timeless fragrances in the world.',
    image: 'https://images.uzum.uz/d20g0nj4eu2vdgd7dneg/t_product_540_high.jpg',
  },
]

// ─── COLLECTION CARD ────────────────────────────────────
const CollectionCard = ({ col, className }) => (
  <div className={`relative overflow-hidden rounded-lg cursor-pointer group ${className}`}>

    <img
      src={col.image}
      alt={col.name}
      className="w-full h-full object-cover brightness-75 transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 group-hover:opacity-0">
      <p className="text-white text-xs uppercase tracking-widest">{col.name}</p>
    </div>

    {/* Hover — markazda nom + tugma */}
    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-white text-lg italic text-center px-4 mb-3">{col.name}</p>
      <a
        href="#"
        className="text-xs uppercase tracking-widest border border-yellow-600 text-yellow-500 px-5 py-2 hover:bg-yellow-600 hover:text-black transition-colors duration-300"
      >
        Explore
      </a>
    </div>

  </div>
)

// ─── MAIN COMPONENT ─────────────────────────────────────
const Muradov = () => {
  const [email, setEmail] = useState('')
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? articles.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === articles.length - 1 ? 0 : c + 1))

  const visible = [
    articles[current % articles.length],
    articles[(current + 1) % articles.length],
    articles[(current + 2) % articles.length],
  ]

  return (
    <div className="bg-zinc-950 text-white min-h-screen">

      {/* ══════════════════════
          1 — OUR COLLECTIONS
      ══════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-center text-4xl font-light text-yellow-600 tracking-widest mb-12">
          Our Collections
        </h2>

        <div className="grid grid-cols-12 gap-4">
          {/* Qator 1 */}
          <CollectionCard col={collections[0]} className="col-span-4 aspect-[3/4]" />
          <CollectionCard col={collections[1]} className="col-span-8 aspect-video" />

          {/* Qator 2 */}
          <CollectionCard col={collections[2]} className="col-span-6 aspect-[4/3]" />
          <CollectionCard col={collections[3]} className="col-span-6 aspect-[4/3]" />

          {/* Qator 3 */}
          <CollectionCard col={collections[4]} className="col-span-4 aspect-[3/4]" />
          <CollectionCard col={collections[5]} className="col-span-4 aspect-[3/4]" />
          <CollectionCard col={collections[6]} className="col-span-4 aspect-[3/4]" />
        </div>

      </section>

      {/* ══════════════════════
          2 — HERO SALE BANNER
      ══════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-zinc-900 rounded-xl flex flex-col md:flex-row items-center gap-12 px-12 py-14">

          {/* Chap — matn */}
          <div className="flex-1">
            <h1 className="text-4xl font-light leading-tight text-white mb-5">
              Perfume Year-End Sale!<br />Up to 50% OFF
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed mb-8">
              Discover an exquisite collection of premium perfumes at
              unbelievable prices during our exclusive Perfume Sale!
            </p>
            <a
              href="#"
              className="inline-block border border-yellow-600 text-white text-sm px-7 py-3 rounded hover:bg-yellow-600 hover:text-black transition-colors duration-300 tracking-wide"
            >
              Know More
            </a>
          </div>

          {/* O'ng — rasm */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://data.daryo.uz/media/cache/2021/01/2-2-1280x853.jpg"
              alt="Perfume Sale"
              className="w-72 h-72 object-cover rounded-lg brightness-90"
            />
          </div>

        </div>
      </section>

      {/* ══════════════════════
          3 — LATEST ARTICLES
      ══════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-center text-4xl font-light text-yellow-600 tracking-widest mb-12">
          Latest Articles
        </h2>

        <div className="flex items-start gap-4">

          {/* Chap strelka */}
          <button
            onClick={prev}
            className="w-10 h-10 mt-24 flex-shrink-0 rounded-full border border-zinc-600 flex items-center justify-center text-xl hover:border-yellow-600 hover:text-yellow-500 transition-colors"
          >
            ‹
          </button>

          {/* Kartalar */}
          <div className="grid grid-cols-3 gap-6 flex-1">
            {visible.map((art, i) => (
              <div key={art.id + '-' + i} className="flex flex-col group">

                {/* Rasm */}
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Sarlavha */}
                <h3 className="text-white text-base font-semibold leading-snug mt-4 mb-2">
                  {art.title}
                </h3>

                {/* Tavsif */}
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {art.desc}
                </p>

                {/* Tugma */}
                <a
                  href="#"
                  className="mt-4 w-fit inline-block border border-zinc-600 text-white text-xs px-5 py-2 rounded hover:border-yellow-600 hover:text-yellow-500 transition-colors tracking-wide"
                >
                  Read More
                </a>

              </div>
            ))}
          </div>

          {/* O'ng strelka */}
          <button
            onClick={next}
            className="w-10 h-10 mt-24 flex-shrink-0 rounded-full border border-zinc-600 flex items-center justify-center text-xl hover:border-yellow-600 hover:text-yellow-500 transition-colors"
          >
            ›
          </button>

        </div>
      </section>

      {/* ══════════════════════
          4 — FOOTER
      ══════════════════════ */}
      <footer className="bg-zinc-900 border-t border-zinc-800 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-wrap gap-10">

          {/* Brand + Newsletter */}
          <div className="w-64 flex-shrink-0">

            <p className="text-yellow-600 text-2xl font-semibold mb-6">Local Face</p>

            <p className="text-white text-sm font-medium mb-1">Subscribe to Our Newsletter:</p>
            <p className="text-zinc-500 text-xs leading-relaxed mb-4">
              Receive Updates on New Arrivals and Special Promotions!
            </p>

            {/* Email input */}
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-zinc-800 border border-zinc-700 border-r-0 rounded-l px-3 py-2 text-xs text-white outline-none placeholder-zinc-500"
              />
              <button className="bg-yellow-600 text-black text-xs font-semibold px-4 py-2 rounded-r hover:bg-yellow-700 transition-colors">
                Submit
              </button>
            </div>

            {/* Social ikonlar */}
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-xs hover:opacity-80">𝕏</a>
              <a href="#" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs hover:opacity-80">f</a>
              <a href="#" className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs hover:opacity-80">in</a>
              <a href="#" className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-xs hover:opacity-80">◎</a>
            </div>

          </div>

          {/* Categories */}
          <div className="flex-1 min-w-28">
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Categories</p>
            {['Fashion', 'Jewelry', 'Sports', 'Electronics', 'Indoor'].map((l) => (
              <a key={l} href="#" className="block text-zinc-500 text-sm mb-2 hover:text-yellow-500 transition-colors">{l}</a>
            ))}
          </div>

          {/* Shopping */}
          <div className="flex-1 min-w-28">
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Shopping</p>
            {['Payments', 'Delivery options', 'Buyer protection'].map((l) => (
              <a key={l} href="#" className="block text-zinc-500 text-sm mb-2 hover:text-yellow-500 transition-colors">{l}</a>
            ))}
          </div>

          {/* Customer care */}
          <div className="flex-1 min-w-36">
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Customer care</p>
            {['Help center', 'Terms & Conditions', 'Privacy policy', 'Returns & refund', 'Survey & feedback'].map((l) => (
              <a key={l} href="#" className="block text-zinc-500 text-sm mb-2 hover:text-yellow-500 transition-colors">{l}</a>
            ))}
          </div>

          {/* Pages */}
          <div className="flex-1 min-w-28">
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Pages</p>
            {['About Us', 'Shop', 'Contact Us', 'Services', 'Blog'].map((l) => (
              <a key={l} href="#" className="block text-zinc-500 text-sm mb-2 hover:text-yellow-500 transition-colors">{l}</a>
            ))}
          </div>

        </div>
      </footer>

    </div>
  )
}

export default Muradov
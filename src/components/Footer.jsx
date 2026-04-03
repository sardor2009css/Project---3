const footerData = {
  categories: ['Fashion', 'Perfumes', 'Jewelry', 'Sports', 'Electronics', 'Indoor'],
  shopping: ['Payment', 'Delivery options', 'Buyer protection'],
  customerCare: ['Help center', 'Terms & Conditions', 'Privacy policy', 'Returns & refund', 'Survey & feedback'],
  pages: ['About Us', 'Shop', 'Contact Us', 'Services', 'Blog'],
}

const socialLinks = [
  { label: 'IG', href: '#' },
  { label: 'FB', href: '#' },
  { label: 'IN', href: '#' },
  { label: 'X', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-gold-500/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl font-bold gold-gradient mb-4">Local Face</h3>
            <p className="font-body text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Subscribe to Our Newsletter: Receive updates on New Arrivals and Special Promotions!
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-dark-700 border border-gold-500/20 text-gray-300 font-body text-sm px-4 py-2.5 focus:outline-none focus:border-gold-500 transition-colors placeholder-gray-600"
              />
              <button className="px-5 py-2.5 bg-gold-500 text-dark-900 font-sans text-[10px] tracking-[0.15em] uppercase font-semibold hover:bg-gold-400 transition-colors flex-shrink-0">
                Submit
              </button>
            </div>

            <div className="flex gap-3 mt-6">
              {socialLinks.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  className="w-9 h-9 rounded-full border border-gold-500/30 flex items-center justify-center text-gray-500 hover:text-gold-400 hover:border-gold-400 hover:bg-gold-500/10 transition-all"
                >
                  <span className="font-sans text-[10px] tracking-[0.15em] uppercase">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-500 mb-5">Categories</h4>
            <ul className="space-y-2.5">
              {footerData.categories.map(item => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-gray-500 hover:text-gold-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-500 mb-5">Shopping</h4>
            <ul className="space-y-2.5">
              {footerData.shopping.map(item => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-gray-500 hover:text-gold-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-500 mb-5">Customer care</h4>
            <ul className="space-y-2.5">
              {footerData.customerCare.map(item => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-gray-500 hover:text-gold-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-500 mb-5">Pages</h4>
            <ul className="space-y-2.5">
              {footerData.pages.map(item => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-gray-500 hover:text-gold-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-500/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[10px] tracking-widest text-gray-600 uppercase">
            Copyright 2025 Local Face Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <a key={item} href="#" className="font-sans text-[10px] tracking-wider uppercase text-gray-600 hover:text-gold-500 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

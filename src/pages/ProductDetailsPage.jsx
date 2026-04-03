import { Link, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { perfumes } from "../data/perfumes";

const PRODUCTS_API_URL = "https://69cba9cc0b417a19e07b043e.mockapi.io/Products";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useOutletContext();
  const [apiProducts, setApiProducts] = useState([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const response = await fetch(PRODUCTS_API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (isMounted) {
          setApiProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Product API error:", error);
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const baseProduct = useMemo(() => {
    if (!id) return perfumes[0];
    return perfumes.find((item) => item.id === id) || perfumes[0];
  }, [id]);

  const apiProduct = useMemo(() => {
    return (
      apiProducts.find((apiItem) => apiItem.slug === baseProduct.id) ||
      apiProducts.find((apiItem) => apiItem.id === id) ||
      null
    );
  }, [apiProducts, baseProduct.id, id]);

  const getApiImages = (matchedApiProduct) => {
    if (!matchedApiProduct) {
      return [];
    }

    const similarProducts = apiProducts.filter(
      (apiItem) =>
        apiItem.id !== matchedApiProduct.id &&
        (apiItem.collection === matchedApiProduct.collection ||
          apiItem.family === matchedApiProduct.family)
    );

    const fallbackProducts = apiProducts.filter(
      (apiItem) => apiItem.id !== matchedApiProduct.id
    );

    const uniqueImages = [
      matchedApiProduct.image,
      ...similarProducts.map((apiItem) => apiItem.image),
      ...fallbackProducts.map((apiItem) => apiItem.image),
    ].filter((image, index, array) => image && array.indexOf(image) === index);

    return uniqueImages;
  };

  const mergeProductWithApi = (item) => {
    const matchedApiProduct =
      apiProducts.find((apiItem) => apiItem.slug === item.id) ||
      apiProducts.find((apiItem) => apiItem.id === item.id);

    if (!matchedApiProduct) {
      return item;
    }

    const apiImages = getApiImages(matchedApiProduct);

    return {
      ...item,
      name: matchedApiProduct.name || item.name,
      price: matchedApiProduct.price ?? item.price,
      desc: matchedApiProduct.description || item.desc,
      rating: matchedApiProduct.rating ?? item.rating,
      reviews: matchedApiProduct.reviews ?? item.reviews,
      sizes: item.sizes.map((sizeItem, index) => ({
        ...sizeItem,
        image: apiImages[index] || apiImages[0] || sizeItem.image,
      })),
    };
  };

  const product = useMemo(() => {
    return mergeProductWithApi(baseProduct);
  }, [apiProducts, baseProduct]);

  const galleryItems = useMemo(() => {
    const fallbackGallery = baseProduct.sizes.map((item) => ({
      size: item.size,
      image: item.image,
    }));

    if (!apiProduct) {
      return fallbackGallery;
    }

    const apiImages = getApiImages(apiProduct);

    return baseProduct.sizes.map((item, index) => ({
      size: item.size,
      image: apiImages[index] || apiImages[0] || item.image,
    }));
  }, [apiProduct, apiProducts, baseProduct.sizes]);

  const [activeImage, setActiveImage] = useState(galleryItems[0]?.image || "");
  const [activeSize, setActiveSize] = useState(galleryItems[0]?.size || "");

  useEffect(() => {
    setActiveImage(galleryItems[0]?.image || "");
    setActiveSize(galleryItems[0]?.size || "");
    setQty(1);
  }, [galleryItems]);

  const minusQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const plusQty = () => {
    setQty((prev) => prev + 1);
  };

  const handleSizeChange = (item) => {
    setActiveImage(item.image);
    setActiveSize(item.size);
  };

  const handleAddToCart = () => {
    addToCart(qty);
    alert(`${product.name} savatchaga qo'shildi`);
  };

  const discoverProducts = useMemo(() => {
    return perfumes
      .filter((item) => item.id !== baseProduct.id)
      .map((item) => mergeProductWithApi(item));
  }, [apiProducts, baseProduct.id]);

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="mb-8 text-sm text-white/60">
          Home / Products / <span className="text-white">{product.name}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center">
            <div className="flex h-[520px] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#050505]">
              <img
                src={activeImage}
                alt={product.name}
                className="h-full max-h-[470px] object-contain"
              />
            </div>

            <div className="mt-6 flex gap-3">
              {galleryItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSizeChange(item)}
                  className={`rounded-xl border px-3 py-3 text-center ${
                    activeSize === item.size
                      ? "border-[#c97b39] bg-[#111]"
                      : "border-white/20 bg-black"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.size}
                    className="mx-auto mb-2 h-16 w-12 rounded object-cover"
                  />
                  <p className="text-xs">{item.size}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <h1 className="mb-4 text-4xl font-semibold">{product.name}</h1>

            <p className="mb-5 max-w-[520px] text-sm leading-7 text-white/70">
              {product.desc}
            </p>

            <div className="mb-5 flex items-center gap-3">
              <div className="text-[#c97b39]"></div>
              <p className="text-sm text-white/60">
                ({product.reviews}) Reviews
              </p>
            </div>

            <div className="mb-6 flex gap-3">
              {galleryItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSizeChange(item)}
                  className={`rounded-xl border px-3 py-3 ${
                    activeSize === item.size
                      ? "border-[#c97b39] bg-[#111]"
                      : "border-white/20"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.size}
                    className="mb-2 h-14 w-10 rounded object-cover"
                  />
                  <p className="text-xs">{item.size}</p>
                </button>
              ))}
            </div>

            <p className="mb-6 text-3xl font-semibold text-[#c97b39]">
              ${product.price}.00
            </p>

            <div className="mb-6 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/70">Qty</span>

                <div className="flex items-center rounded-xl border border-white/30">
                  <button
                    onClick={minusQty}
                    className="px-4 py-2 text-lg hover:bg-white/10"
                  >
                    -
                  </button>

                  <span className="px-4 py-2">{qty}</span>

                  <button
                    onClick={plusQty}
                    className="px-4 py-2 text-lg hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>

              <button className="text-sm text-white/80 hover:text-[#c97b39]">
                Whish list
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="mb-4 w-full max-w-[330px] rounded-xl bg-white py-3 font-medium text-black transition hover:opacity-90"
            >
              Add to Bag
            </button>

            <p className="text-xs text-white/50">
              Afterpay available. Shop now pay later in 4 payments.
            </p>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="mb-4 text-3xl font-semibold">Product Details</h2>
          <p className="max-w-[1000px] text-sm leading-7 text-white/70">
            {product.details}
          </p>
        </div>

        <div className="mt-20">
          <h2 className="mb-4 text-3xl font-semibold">The Golden Overture</h2>
          <p className="max-w-[1000px] text-sm leading-7 text-white/70">
            {product.overture}
          </p>
        </div>

        <div className="mt-20">
          <h2 className="mb-10 text-3xl font-semibold">Key Notes</h2>

          <div className="grid gap-10 md:grid-cols-3">
            {product.notes.map((note, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-medium">{note.title}</h3>
                <p className="mt-2 text-sm text-white/60">{note.subtitle}</p>

                <img
                  src={note.image}
                  alt={note.title}
                  className="mx-auto mt-6 h-44 w-44 rounded-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="mb-4 text-3xl font-semibold">The Heart of Elegance</h2>
          <p className="max-w-[1000px] text-sm leading-7 text-white/70">
            {product.elegance}
          </p>
        </div>

        <div className="mt-20">
          <h2 className="mb-4 text-3xl font-semibold">
            The Ultimate Expression of Luxury
          </h2>
          <p className="max-w-[1000px] text-sm leading-7 text-white/70">
            {product.luxuryGift}
          </p>
        </div>

        <div className="mt-24">
          <h2 className="mb-12 text-center text-5xl font-semibold text-[#c97b39]">
            Reviews
          </h2>

          <div className="mb-14 grid gap-10 lg:grid-cols-2">
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-4">
                  <span className="w-12 text-sm text-white/60">{star} star</span>
                  <div className="h-3 flex-1 rounded-full bg-white">
                    <div
                      className={`h-3 rounded-full ${
                        star === 5 ? "w-full bg-[#c97b39]" : "w-0 bg-[#c97b39]"
                      }`}
                    ></div>
                  </div>
                  <span className="text-sm text-white/60">
                    {star === 5 ? "100%" : "0%"}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <div className="mb-2 text-2xl text-[#c97b39]"></div>
              <h3 className="mb-2 text-3xl">5 out of 5</h3>
              <p className="mb-2 text-white/70">
                {product.recommend}% of reviewers recommend this product
              </p>
              <p className="text-white/70">{product.reviews} reviews</p>
            </div>
          </div>

          <div className="space-y-10">
            {product.comments.map((item) => (
              <div key={item.id} className="border-b border-white/10 pb-8">
                <div className="mb-3 text-[#c97b39]"></div>
                <p className="max-w-[950px] text-sm leading-7 text-white/70">
                  {item.text}
                </p>
                <div className="mt-4 flex gap-8 text-sm text-white/50">
                  <span>{item.name}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="rounded-xl border border-white/30 px-10 py-3 hover:bg-white/10">
              Load More
            </button>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="mb-12 text-center text-5xl font-semibold text-[#c97b39]">
            Discover More
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {discoverProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="rounded-2xl bg-[#0b0b0b] p-4 transition hover:-translate-y-1"
              >
                <div className="flex h-[280px] items-center justify-center overflow-hidden rounded-xl bg-[#111]">
                  <img
                    src={item.sizes[0].image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mt-4 text-lg">{item.name}</h3>
                <div className="mt-2 flex items-center justify-between text-sm text-white/70">
                  <span className="text-[#c97b39]">${item.price}.00</span>
                  <span>{item.sizes[0].size}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-24 border-t border-white/10 bg-[#070707]">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-3xl font-bold text-[#c97b39]">
              Local Face
            </h2>
            <h3 className="mb-4 text-2xl">Subscribe to Our Newsletter:</h3>
            <p className="mb-4 text-sm text-white/60">
              Receive updates on new arrivals and special promotions.
            </p>

            <div className="flex max-w-[360px] overflow-hidden rounded-lg border border-white/20">
              <input
                type="text"
                placeholder="Your email here"
                className="w-full bg-transparent px-4 py-3 outline-none"
              />
              <button className="bg-[#c97b39] px-5 text-white">Submit</button>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Fashion</li>
              <li>Jewelry</li>
              <li>Sports</li>
              <li>Electronics</li>
              <li>Indoor</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Shopping</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Payments</li>
              <li>Delivery options</li>
              <li>Buyer protection</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Customer care</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Help center</li>
              <li>Terms & Conditions</li>
              <li>Privacy policy</li>
              <li>Returns & refund</li>
              <li>Survey & feedback</li>
            </ul>
          </div>
        </div>

        <p className="border-t border-white/10 py-6 text-center text-xs text-white/40">
          © 2023 Local Face Inc. All rights reserved
        </p>
      </footer>
    </section>
  );
}

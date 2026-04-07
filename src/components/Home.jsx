import React from 'react';

const Home = () => {
    return (
        <div className="w-full bg-black text-white font-sans">
            <section className="flex px-[100px] pt-[150px] pb-[100px] items-center justify-between min-h-[800px] bg-gradient-to-b from-[#1a1a1a] to-black">
                <div className="flex flex-col w-[600px]">
                    <h1 className="text-[64px] leading-[75px] font-light mb-[20px]">
                        Elevate Your Spirit with <br />
                        <span className="italic">Victory Scented Fragrances!</span>
                    </h1>
                    <p className="text-[18px] text-gray-400 mb-[40px] leading-[28px]">
                        Shop now and embrace the sweet smell of victory <br />
                        with Local Face.
                    </p>
                    <button className="w-[160px] h-[50px] bg-[#B36239] text-white rounded-[8px] font-medium text-[16px] hover:bg-[#96522f] transition-all">
                        Shop Now
                    </button>
                </div>

                <div className="w-[430px] h-[770px] flex items-center justify-center">
                    <img src="./bottle.png" className="w-full h-full object-cover" />
                </div>
            </section>
            <section className="relative w-full h-[700px] flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/back.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 "></div>
                </div>

                <div className="relative z-20 flex flex-col items-center px-[200px]">
                    <h2 className="text-[#D48D5E] text-[48px] mb-[30px] font-medium">
                        Welcome to Local Face
                    </h2>
                    <p className="text-[18px] text-gray-200 leading-[32px] max-w-[900px] font-light">
                        Welcome to Local Face Perfumes, where the spirit of victory and triumph come alive
                        through scents that empower and inspire. Our curated collection, aptly named "Victory
                        Scented," is a celebration of success and elegance, designed to unleash your victorious
                        essence. Indulge in the sweet taste of triumph with captivating fragrances that tell the
                        tale of your achievements. At Local Face, we believe that every victory deserves a
                        signature scent, and we are dedicated to providing unforgettable fragrances that
                        elevate your spirit and empower your journey.
                    </p>
                </div>
            </section>


            <section className="flex items-center justify-between  bg-black">
                <div className="w-[770px] h-[670px] flex-shrink-0">
                    <img
                        src="/values.png"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>


                <div className="flex flex-col w-[600px] ml-[80px] text-center mr-[30px]">
                    <h2 className="text-[48px] font-medium mb-[40px]">Our Values</h2>

                    <p className="text-[18px] text-gray-300 leading-[30px] mb-[30px]">
                        At Local Face, our perfume retail store is built on a foundation
                        of passion and authenticity. We believe in celebrating the
                        individuality of every customer, providing a diverse collection of
                        scents that resonate with their unique personality and style. Our
                        dedicated team of fragrance enthusiasts is committed to creating a
                        welcoming and inclusive environment, where connections are
                        forged, and inspiration trives.
                    </p>

                    <p className="text-[18px] text-gray-300 leading-[30px]">
                        Embracing sustainability and continuous learning, Local Face
                        strives to be more than just a shopping destination; we are a
                        community that inspires and empowers individuals on their
                        fragrance journey
                    </p>
                </div>
            </section>


            <section className="flex flex-col items-center py-[100px] bg-black w-full">
                <h2 className="text-[#D48D5E] text-[48px] mb-[60px] font-medium">
                    Best selling products
                </h2>

                <div className="flex items-center justify-center gap-[30px] relative w-full px-[50px]">

                    <button className="text-gray-500 text-[30px] absolute left-[40px] hover:text-white transition-all">
                        ❮
                    </button>


                    <div className="flex flex-col items-center w-[280px] bg-[#0a0a0a] rounded-[15px] p-[20px] border border-gray-900">
                        <div className="w-[240px] h-[350px] mb-[20px]">
                            <img src="/bottle1.png" alt="Luxurious Elixir Rough" className="w-full h-full object-contain" />
                        </div>
                        <h3 className="text-[20px] font-light mb-[10px]">Luxurious Elixir Rough</h3>
                        <div className="flex gap-[10px] items-center">
                            <span className="text-[#D48D5E] text-[18px]">$ 220.00</span>
                            <span className="text-gray-500 text-[14px]">100ml</span>
                        </div>
                    </div>


                    <div className="flex flex-col items-center w-[280px] bg-[#0a0a0a] rounded-[15px] p-[20px] border border-gray-900">
                        <div className="w-[240px] h-[350px] mb-[20px]">
                            <img src="/bottle2.png" alt="The Golden Legacy" className="w-full h-full object-contain" />
                        </div>
                        <h3 className="text-[20px] font-light mb-[10px]">The Golden Legacy</h3>
                        <div className="flex gap-[10px] items-center">
                            <span className="text-[#D48D5E] text-[18px]">$ 160.00</span>
                            <span className="text-gray-500 text-[14px]">100ml</span>
                        </div>
                    </div>


                    <div className="flex flex-col items-center w-[280px] bg-[#0a0a0a] rounded-[15px] p-[20px] border border-gray-900">
                        <div className="w-[240px] h-[350px] mb-[20px]">
                            <img src="/bottle3.png" alt="Luxurious Elixir" className="w-full h-full object-contain" />
                        </div>
                        <h3 className="text-[20px] font-light mb-[10px]">Lxurious Elixir</h3>
                        <div className="flex gap-[10px] items-center">
                            <span className="text-[#D48D5E] text-[18px]">$ 250.00</span>
                            <span className="text-gray-500 text-[14px]">100ml</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-[280px] bg-[#0a0a0a] rounded-[15px] p-[20px] border border-gray-900">
                        <div className="w-[240px] h-[350px] mb-[20px]">
                            <img src="/bottle4.png" alt="Luxurious Essence" className="w-full h-full object-contain" />
                        </div>
                        <h3 className="text-[20px] font-light mb-[10px]">Luxurious Essence</h3>
                        <div className="flex gap-[10px] items-center">
                            <span className="text-[#D48D5E] text-[18px]">$ 260.00</span>
                            <span className="text-gray-500 text-[14px]">100ml</span>
                        </div>
                    </div>

                    <button className="text-gray-500 text-[30px] absolute right-[40px] hover:text-white transition-all">
                        ❯
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
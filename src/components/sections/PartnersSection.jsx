import { motion } from "framer-motion";

const partners = [
  {
    name: "MTN Foundation",
    logo: "/partners/mtn-foundation.png",
  },
  {
    name: "NITDA",
    logo: "/partners/nitda.png",
  },
  {
    name: "Access Bank",
    logo: "/partners/access-bank.png",
  },
  {
    name: "HP",
    logo: "/partners/hp.png",
  },
  {
    name: "Moniepoint",
    logo: "/partners/moniepoint.png",
  },
  {
    name: "Airtel Nigeria",
    logo: "/partners/airtel.png",
  },
  {
    name: "Tony Elumelu Foundation",
    logo: "/partners/tef.png",
  },
  {
    name: "UNDP",
    logo: "/partners/undp.png",
  },
];

export default function PartnersSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2b0a5a]/70">
            Our Future Partners
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#2b0a5a] sm:text-4xl">
            Together, We Can Build the Future
          </h2>

          <p className="mt-5 text-gray-600 leading-relaxed">
            NIVOX is actively seeking partnerships with organizations that
            believe in empowering students through technology, innovation and
            opportunity.
          </p>
        </div>


        {/* Partner Logos */}
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">

          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="
                group
                flex
                h-36
                items-center
                justify-center
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-6
                shadow-sm
                transition
                hover:border-[#f5c542]
                hover:shadow-xl
              "
            >

              <img
                src={partner.logo}
                alt={partner.name}
                className="
                  max-h-16
                  max-w-[150px]
                  object-contain
                  grayscale
                  transition
                  duration-300
                  group-hover:grayscale-0
                "
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/150x60?text=" +
                    partner.name;
                }}
              />

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
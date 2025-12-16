import { useNavigate } from "react-router";
import Search from "../components/Search/Search";
import styles from "./Home.module.css";

const galleryImages = [
  {
    src: "https://res.cloudinary.com/dbrf678f6/image/upload/v1765890350/WhatsApp_Image_2025-12-10_at_12.25.28_z3e2lu.jpg",
    alt: "Golden puppy looking up.",
    variant: "wide",
  },
  {
    src: "https://res.cloudinary.com/dbrf678f6/image/upload/v1765890278/WhatsApp_Image_2025-12-10_at_12.29.07_fknbs9.jpg",
    alt: "Woman smiling while holding her dog.",
    variant: "wide",
  },
  {
    src: "https://res.cloudinary.com/dbrf678f6/image/upload/v1764937558/Screenshot_2025-12-05_at_13.25.49_ea4bm7.png",
    alt: "Person cuddling a cat at home.",
    variant: "tall",
  },
  {
    src: "https://res.cloudinary.com/dbrf678f6/image/upload/v1765890220/WhatsApp_Image_2025-12-10_at_12.25.27_cd5fa8.jpg",
    alt: "Man relaxing with his dog on the couch.",
    variant: "tall",
  },
];

const steps = [
  {
    title: "Find a trusted sitter nearby",
    description: "Search by city and pet type to match with a verified sitter close to you.",
    image:
      "https://res.cloudinary.com/dbrf678f6/image/upload/v1764870493/ChatGPT_Image_4_de_dez._de_2025_18_48_05_nid10n.png",
    alt: "Illustration of a person walking a dog in the neighborhood.",
  },
  {
    title: "Drop your pet at their home",
    description: "Settle your pet in a calm home environment and share the routine they love.",
    image:
      "https://res.cloudinary.com/dbrf678f6/image/upload/v1764870654/ChatGPT_Image_4_de_dez._de_2025_18_50_21_hqvmbd.png",
    alt: "Illustration of a pet resting in a cozy home.",
  },
  {
    title: "Give Lunies and leave a review",
    description: "Reward with Lunies and add a review so the community knows who to trust.",
    image:
      "https://res.cloudinary.com/dbrf678f6/image/upload/v1764870798/ChatGPT_Image_4_de_dez._de_2025_18_52_46_p0tmna.png",
    alt: "Illustration of a person giving a thumbs up with a pet nearby.",
  },
];

const testimonials = [
  {
    quote: "Left Luna for a weekend and got daily updates. It felt like leaving her with family.",
    name: "Rachel & Luna",
    location: "Lisbon, PT",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote: "Swapped two stays, earned Lunies, and met another cat parent on my block.",
    name: "Jamie & Miso",
    location: "Copenhagen, DK",
    avatar:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote: "The reviews make it easy. We found a sitter who understood senior dog routines.",
    name: "Priya & Scout",
    location: "Berlin, DE",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.tag}>Trusted pet sitting</span>
          <h1>Swap pet sitting & live freely</h1>
          <p className={styles.lead}>
            Credit-based pet-sitting network for members who value calm, caring homes
            over crowded kennels.
          </p>

          

          <div className={styles.heroActions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => navigate("/pet-sitter")}
            >
              Find pet sitters
            </button>
            <button
              type="button"
              className={styles.ghostButton}
              onClick={() => navigate("/signup")}
            >
              Become a sitter
            </button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.gallery}>
            {galleryImages.map((image) => (
              <div
                className={`${styles.galleryItem} ${image.variant ? styles[image.variant] : ""}`}
                key={image.src}
              >
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>How it works</p>
          <h2>Swap care in three easy steps</h2>
          <p className={styles.sectionLead}>
            Quick, clear, and designed to keep every pet comfortable.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <article className={styles.stepCard} key={step.title}>
              <div className={styles.stepBadge}>{index + 1}</div>
              <div className={styles.stepImage}>
                <img src={step.image} alt={step.alt} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.manifesto}>
        <h3 className={styles.manifestoTitle}>
          We believe pet care works best when it&apos;s shared.
        </h3>
        <p className={styles.manifestoText}>
          By helping each other, we create a trusted circle where every pet gets the attention
          they deserve, and every member gains the freedom to live more, travel more, and worry less.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>What the community says</p>
          <h2>Trust that grows with every swap</h2>
          <p className={styles.sectionLead}>
            Short notes from members who keep the circle caring and reliable.
          </p>
        </div>

        <div className={styles.testimonials}>
          {testimonials.map((item) => (
            <article className={styles.testimonialCard} key={item.name}>
              <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
              <div className={styles.testimonialFooter}>
                <div>
                  <p className={styles.person}>{item.name}</p>
                  <p className={styles.location}>{item.location}</p>
                </div>
                <div className={styles.testimonialAvatar}>
                  <img src={item.avatar} alt={`${item.name} avatar`} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.bottomCta} ${styles.softCta}`}>
        <div className={styles.ctaMedia}>
          <img
            src="https://res.cloudinary.com/dbrf678f6/image/upload/v1765909938/WhatsApp_Image_2025-12-16_at_10.27.51_d89ute.jpg"
            alt="Happy dog sitting on a blanket."
          />
        </div>
        <div className={styles.bottomText}>
          <p className={styles.kicker}>Join the circle</p>
          <h3>Be part of our community now</h3>
          <p className={styles.sectionLead}>
            Swap care, earn Lunies, and keep pets cozy with people who love them.
          </p>
          <div className={styles.ctaActions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => navigate("/pet-sitter")}
            >
              Find pet sitters
            </button>
            <button
              type="button"
              className={styles.ghostButton}
              onClick={() => navigate("/signup")}
            >
              Become a sitter
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;

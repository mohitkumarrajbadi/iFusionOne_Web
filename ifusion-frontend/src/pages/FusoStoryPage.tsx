import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/FusoStoryPage.css';

const story = [
  {
    src: '/baby-fuso-holding-fork.jpg',
    text: 'Chapter 1: From his very first bite, baby Fuso knew the universe was full of flavor. With a fork in hand and stars in his eyes, he set out to taste every mystery the cosmos had to offer.',
    bgcolor: '#50d7f7',
  },
  {
    src: '/baby-fuso-sitting-space.jpg',
    text: 'Chapter 2: Nights were for dreaming. Fuso would sit for hours, cradled by moonlight, sketching rocket blueprints in the sand and wishing on every falling star.',
    bgcolor: '#58c7ff',
  },
  {
    src: '/fuso-blowing-gum-with-hoodie.jpg',
    text: 'Chapter 3: Growing up cool and curious, he chewed cosmic gum that blew bubbles of ideas—each POP launching a new invention in his mind’s workshop.',
    bgcolor: '#e8b9ff',
  },
  {
    src: '/fuso-confused-thinking.jpg',
    text: 'Chapter 4: Questions swirled like mini‑black holes. What if rockets could think? What if code could breathe? Fuso embraced confusion as the spark of discovery.',
    bgcolor: '#4dc9ff',
  },
  {
    src: '/fuso-holding-rocket-toys.jpg',
    text: 'Chapter 5: Those little toy rockets weren’t mere playthings—they were prototypes for interstellar travel. Fuso tested them in his backyard “launchpad,” aiming always higher.',
    bgcolor: '#82b1ff',
  },
  {
    src: '/fuso-lifting-rocket-barbell.jpg',
    text: 'Chapter 6: To lift giant dreams, Fuso trained like an astronaut athlete—hoisting rocket‑shaped barbells and pushing the limits of imagination and muscle.',
    bgcolor: '#ffccbe',
  },
  {
    src: '/fuso-playing-rocket-toy.jpg',
    text: 'Chapter 7: Every game was a design challenge. Building block towers became space stations; marble runs became asteroid belts—Fuso’s playtime doubled as R&D.',
    bgcolor: '#67e9ff',
  },
  {
    src: '/fuso-love-sign-with-hand.jpg',
    text: 'Chapter 8: Fuso discovered the most powerful element: love. Love for science, love for friends, love for the thrill of creation. He branded his dream “iFusionOne”—where ideas and passion unite.',
    bgcolor: '#ffcaec',
  },
  {
    src: '/fuso-super-hero-ninjaturtle.jpg',
    text: 'Chapter 9: Donning a makeshift cape, Fuso realized every coder is a superhero. He vowed to use his powers—code, creativity, courage—to solve problems and inspire others.',
    bgcolor: '#b4ffc7',
  },
  {
    src: '/fuso-holding-science-suitcase.jpg',
    text: 'Chapter 10: With a trusty suitcase full of gadgets, prototypes, and snacks, Fuso set off on a roadshow: hackathons, meetups, and co‑working spaces became his new playgrounds.',
    bgcolor: '#ffecce',
  },
  {
    src: '/fuso-riding-scooter-with-friend-o.jpg',
    text: 'Chapter 11: No hero goes it alone. Fuso rallied coders, designers, dreamers—together they scooted down innovation highways, fueled by late‑night pizza and boundless curiosity.',
    bgcolor: '#dc9afe',
  },
  {
    src: '/fuso-working-on-laptop.jpg',
    text: 'Chapter 12: In a caffeine‑fueled frenzy, the team typed the first lines of iFusionOne’s engine. Databases hummed, APIs connected like constellations—Fuso’s vision began to take orbit.',
    bgcolor: '#ffb592',
  },
  {
    src: '/fuso-both-hand-up-happy-wohoo.jpg',
    text: 'Chapter 13: Liftoff! – With a whoosh and a cheer, iFusionOne launched into the world. Users cheered, processes streamlined, and Fuso? He just grinned—already dreaming up the next big update. But as iFusion soared, there was something else in the air—something hidden, something yet to be revealed. Project O was still in motion, its secrets waiting to unfold. What was it? Only time would tell.',
    bgcolor: '#7fd3ff',
  }
];



export default function FusoStoryPage() {
  const [offsetY, setOffsetY] = useState(0);



  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setOffsetY(window.scrollY));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="parallax-container">
      <div className="back-to-home" style={{ position: 'fixed', top: 20, left: 20, zIndex: 1000 }}>
        <button
          onClick={() => window.location.href = '/'}
          className="back-to-home-button"
        >
          ← Back to Home
        </button>
      </div>

      {/* Parallax Backgrounds with smoother motion */}
      <motion.div
        className="stars-bg"
        animate={{ y: offsetY * 0.3 }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
      />
      <motion.div
        className="glow-bg"
        animate={{ y: offsetY * 0.5 }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
      />

      {story.map((item, i) => (
        <motion.section
          key={i}
          className="story-section"
          style={{
            backgroundColor: item.bgcolor,
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          }}
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <motion.img
            className="story-image"
            src={item.src}
            alt="fuso"
            initial={{ opacity: 0, y: 100, rotate: -10, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 15,
              delay: 0.3,
            }}
            viewport={{ once: true }}
            style={{ transform: `translateY(${offsetY * 0.05 * i}px)` }}
          />

          <motion.h2
            className="story-text"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {item.text}
          </motion.h2>
        </motion.section>
      ))}
    </div>
  );
}

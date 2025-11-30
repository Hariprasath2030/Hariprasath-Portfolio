import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { fadeIn } from "../utils/motion";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandTwitter,
  IconCode,
} from "@tabler/icons-react";

const Footer = () => {
  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications",
      icon: "🌐",
    },
    {
      title: "Mobile Development",
      description: "Cross-platform mobile apps",
      icon: "📱",
    },
    {
      title: "UI/UX Design",
      description: "Modern and responsive designs",
      icon: "🎨",
    },
  ];

  const dockLinks = [
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-[#0077b5] hover:text-[#00ff88] transition-all duration-500 hover:scale-110" />
      ),
      href: "https://www.linkedin.com/in/hariprasath-v-ab5006276",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-white hover:text-[#00ff88] transition-all duration-500 hover:scale-110 hover:rotate-12" />
      ),
      href: "https://github.com/Hariprasath2030",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-[#e4405f] hover:text-[#ff6b35] transition-all duration-500 hover:scale-110 hover:rotate-[-12deg]" />
      ),
      href: "https://www.instagram.com/hearty_soul_016?igsh=MTNoNWFjdXp0MzN6Ng==",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandTwitter className="h-full w-full text-[#1da1f2] hover:text-[#00ff88] transition-all duration-500 hover:scale-110 hover:rotate-6" />
      ),
      href: "https://x.com/Hariprasat67463?t=pBW9m_AzJkdc5RXmVmPbiw&s=09",
    },
    {
      title: "LeetCode",
      icon: (
        <IconCode className="h-full w-full text-[#ffa116] hover:text-[#ff6b35] transition-all duration-500 hover:scale-110 hover:rotate-[-6deg]" />
      ),
      href: "https://leetcode.com/u/hariprasath2030/",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative bg-gradient-to-br text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r"></div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About Section */}
          <motion.div
            variants={fadeIn("up", "spring", 0.1, 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.h3
              className="text-3xl font-bold mb-4"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="bg-gradient-to-r from-[#00ff88] to-[#ff6b35] bg-clip-text text-transparent">
                Hari Prasath
              </span>
            </motion.h3>
            <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
              Passionate Information Technology professional with a strong focus
              on full-stack development, specializing in the
              <span className="text-[#00ff88] font-semibold">
                {" "}
                MERN stack Development
              </span>
              , dedicated to building scalable, high-performance applications
              and delivering innovative tech solutions.
            </p>
            <div className="space-y-3 text-sm sm:text-base">
              <motion.div
                className="flex items-center gap-3 text-gray-300 hover:text-[#00ff88] transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <FaEnvelope className="text-[#00ff88]" />
                <a
                  href="mailto:officialhari2030@gmail.com"
                  className="hover:underline"
                >
                  officialhari2030@gmail.com
                </a>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 text-gray-300 hover:text-[#00ff88] transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <FaPhone className="text-[#00ff88]" />
                <a href="tel:+918925425514" className="hover:underline">
                  +91 8925425514
                </a>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5 }}
              >
                <FaMapMarkerAlt className="text-[#00ff88]" />
                <span>Tirupattur, Tamil Nadu, India</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeIn("up", "spring", 0.2, 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6 text-[#00ff88]">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm sm:text-base">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#ff6b35] transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-[#00ff88] rounded-full"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6 text-[#00ff88]">Services</h4>
            <div className="space-y-4">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 border border-gray-700 hover:border-[#00ff88]/30">
                    <span className="text-xl sm:text-2xl">{service.icon}</span>
                    <div>
                      <h5 className="font-semibold text-white group-hover:text-[#00ff88] transition-colors duration-300">
                        {service.title}
                      </h5>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="lg:col-span-4 flex flex-col items-start">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00ff88] to-[#ff6b35] bg-clip-text text-transparent mb-6">
              Connect on Social Media...🌐
            </h2>

            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <FloatingDock
                mobileClassName="translate-y-10 -translate-x-5"
                desktopClassName="bg-gray-900/30 backdrop-blur-md border border-[#00ff88]/20 hover:border-[#00ff88]/40 transition-all duration-300"
                items={dockLinks}
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Bottom Section */}
        <div className="w-full px-6 md:px-12 lg:px-20 py-6">
          <motion.div
            variants={fadeIn("up", "spring", 0.4, 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-4 text-center"
          >
            <motion.p
              className="text-sm text-gray-400 flex items-center justify-center gap-2"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              © 2025 Hari Prasath. All rights reserved.
            </motion.p>

            <motion.p
              className="text-sm text-gray-400 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Built with
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  color: ["#ff6b35", "#00ff88", "#ff6b35"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaHeart className="text-red-500" />
              </motion.span>
              using React & Framer Motion
            </motion.p>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#00ff88] to-[#ff6b35] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;

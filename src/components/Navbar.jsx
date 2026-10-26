import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../constants/index.js";
import { styles } from "../styles";
import { hari, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.1,
      color: "#ffffff",
      transition: { duration: 0.2 },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={hari}
              alt="hari"
              className="w-10 h-10 object-contain rounded-full"
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <p className="text-white text-[18px] font-bold cursor-pointer flex">
              <span className="text-white bg-clip-text text-transparent">
                Hariprasath
              </span>
              <span className="sm:block hidden text-white ml-2">
                | Full Stack Developer
              </span>
            </p>
          </motion.div>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-8">
          {navLinks.map((nav) => (
            <motion.li
              key={nav.id}
              variants={linkVariants}
              whileHover="hover"
              className={`${
                active === nav.title ? "text-white" : "text-gray-300"
              } hover: text-white text-[18px] font-medium cursor-pointer transition-colors duration-200 relative`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`} className="relative">
                {nav.title}
                {active === nav.title && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setToggle(!toggle)}
            className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-950 hover:bg-gray-800 transition-colors duration-200"
          >
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[20px] h-[20px] object-contain"
            />
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {toggle && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-20 right-0 mx-4 my-2 min-w-[200px] bg-black backdrop-blur-md rounded-2xl border border-gray-700 shadow-2xl"
              >
                <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4 p-6">
                  {navLinks.map((nav, index) => (
                    <motion.li
                      key={nav.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.1 },
                      }}
                      className={`font-poppins font-medium cursor-pointer text-[16px] ${
                        active === nav.title
                          ? "text-white"
                          : "text-gray-300"
                      } hover:text-white transition-colors duration-200 w-full`}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.title);
                      }}
                    >
                      <motion.a
                        href={`#${nav.id}`}
                        className="block py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        {nav.title}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant, fadeIn } from "../utils/motion";
import { styles } from "../styles";

const FloatingTechCard = ({ technology, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("up", "spring", index * 0.1, 0.6)}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              },
            }
          : {}
      }
    >
      <motion.div
        animate={{
          y: isInView ? [0, -10, 0] : 0,
          rotateY: isHovered ? [0, 360] : 0,
        }}
        transition={{
          y: {
            duration: 2 + (index % 3) * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          },
          rotateY: {
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
        className="w-20 h-20 sm:w-28 sm:h-28"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="w-full h-full bg-gradient-to-br from-gray-950 to-gray-900 rounded-2xl p-4 flex items-center justify-center cursor-pointer border border-gray-700 hover:border-[#ffffff] transition-all duration-300 relative overflow-hidden"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(0, 255, 136, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#ffffff]/20 to-[#ffffff]/20 rounded-2xl"
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.05 : 1,
              rotate: isHovered ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          <motion.img
            src={technology.icon}
            alt={technology.name}
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain relative z-10"
            animate={{
              scale: isHovered ? 1.2 : 1,
              filter: isHovered ? "brightness(1.2)" : "brightness(1)",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />

          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#ffffff] rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  animate={{
                    x: [0, 20 * Math.cos((i * 120 * Math.PI) / 180), 0],
                    y: [0, 20 * Math.sin((i * 120 * Math.PI) / 180), 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                />
              ))}
            </>
          )}

          <motion.div
            className="absolute inset-0 border-2 border-[#ffffff] rounded-2xl"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.5, 0, 0.5] : 0,
            }}
            transition={{
              duration: 1,
              repeat: isHovered ? Infinity : 0,
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium border border-gray-600 shadow-lg"
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] bg-clip-text text-transparent font-semibold">
          {technology.name}
        </span>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 border-l border-t border-gray-600"></div>
      </motion.div>

      {isInView && (
        <>
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#ffffff] rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: index * 0.1 + i * 0.5,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

const Tech = () => {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, {
    once: true,
    amount: 0.1,
  });

  return (
    <section id="skills" className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#ffffff]/5 via-transparent to-[#ffffff]/5"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="w-full relative z-10" ref={containerRef}>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center`}>
            Technologies I Master
          </p>
          <h2 className={`${styles.sectionHeadText} text-center mb-4`}>
            <span className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
        </motion.div>

        {/* Floating Skills Grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-12 relative"
          initial="hidden"
          animate={isContainerInView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {technologies.map((technology, index) => (
            <FloatingTechCard
              key={technology.name}
              technology={technology}
              index={index}
            />
          ))}

          {/* Background Floating Elements */}
          {isContainerInView && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-[#ffffff] to-[#ffffff] rounded-full opacity-20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -50, 0],
                    x: [0, Math.random() * 40 - 20, 0],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Enhanced Additional Info */}
        <motion.div
          className="mt-16 text-center relative"
          variants={fadeIn("up", "tween", 0.2, 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gradient-to-r from-gray-950 to-black backdrop-blur-sm rounded-3xl p-8 border border-gray-700 max-w-4xl mx-auto"
            whileHover={{
              borderColor: "#ffffff",
              boxShadow: "0 20px 40px rgba(0, 255, 136, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Constantly learning and adapting to new technologies to create
              <span className="text-[#ffffff] font-semibold">
                {" "}
                cutting-edge solutions
              </span>{" "}
              that push the boundaries of web development. Each skill represents
              countless hours of
              <span className="text-[#ffffff] font-semibold">
                {" "}
                dedication and innovation
              </span>
              .
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  title: "Frontend",
                  count: "8+",
                  color: "from-gray-300 to-white",
                },
                {
                  title: "Backend",
                  count: "5+",
                  color: "from-gray-500 to-gray-200",
                },
                {
                  title: "Tools",
                  count: "10+",
                  color: "from-gray-600 to-gray-300",
                },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  className="text-center p-4 bg-gray-950 rounded-2xl border border-gray-600"
                  whileHover={{
                    scale: 1.05,
                    borderColor: "#ffffff",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h4
                    className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-2`}
                  >
                    {category.count}
                  </h4>
                  <p className="text-gray-300 font-medium">{category.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "");

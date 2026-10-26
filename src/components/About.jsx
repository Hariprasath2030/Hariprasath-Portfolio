import { motion } from "framer-motion";
import { FaDownload, FaCode, FaRocket, FaPalette } from "react-icons/fa";
import { port } from "../assets/index";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.2, 0.6)}
    className="relative group"
  >
    <motion.div
      className="w-full bg-gradient-to-br from-gray-950 to-gray-900 p-[1px] rounded-[20px] shadow-2xl border border-gray-700 hover:border-white transition-all duration-500"
      whileHover={{
        scale: 1.05,
        rotateY: 10,
        boxShadow: "0 25px 50px rgba(255, 255, 255, 0.14)",
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="bg-gradient-to-br from-gray-950 to-black rounded-[20px] py-8 px-6 min-h-[280px] flex justify-evenly items-center flex-col relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-white/5"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="relative z-10"
          whileHover={{
            rotateY: 360,
            scale: 1.2,
          }}
          transition={{ duration: 0.6 }}
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
        </motion.div>

        <h3 className="text-white text-[20px] font-bold text-center relative z-10">
          {title}
        </h3>

        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const About = () => {
  const stats = [
    { icon: FaCode, value: "10+", label: "Projects Completed" },
    { icon: FaRocket, value: "1", label: "Years Experience" },
    { icon: FaPalette, value: "10+", label: "Technologies" },
  ];

  const handleDownloadResume = () => {
    window.open("/HARIPRASATH_R.pdf", "_blank");
  };

  return (
    <section className="relative">
      <div className="relative z-10">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center`}>
            Get to know me
          </p>
          <h2 className={`${styles.sectionHeadText} text-center mb-8`}>
            <span className="text-white">
              About Me
            </span>
          </h2>
        </motion.div>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-12">
          {/* Left Side - Image and Stats */}
          <motion.div
            variants={fadeIn("right", "spring", 0.2, 0.8)}
            className="flex-1 flex flex-col items-center"
          >
            {/* Profile Image with 3D Effect */}
            <motion.div
              className="relative mb-8"
              whileHover={{
                rotateY: 15,
                scale: 1.05,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="w-80 h-80 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(255, 255, 255, 0.2)",
                    "0 0 0 20px rgba(255, 255, 255, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <motion.img
                  src={port}
                  alt="Hariprasath"
                  className="w-full h-full object-cover"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Floating elements around image */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-gradient-to-r"
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${10 + i * 12}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </motion.div>

            {/* Stats */}
            <div className="flex gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeIn("up", "spring", 0.5 + index * 0.1, 0.6)}
                >
                  <motion.div
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 mx-auto"
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="text-white text-xl" />
                  </motion.div>
                  <h4 className="text-white text-2xl font-bold">
                    {stat.value}
                  </h4>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div
            variants={fadeIn("left", "spring", 0.3, 0.8)}
            className="flex-1"
          >
            <motion.p
              className="text-gray-300 text-[18px] leading-[32px] mb-8"
              variants={fadeIn("", "", 0.1, 1)}
            >
              I'm a passionate{" "}
              <span className="text-[#00ff88] font-semibold">
                Full Stack Developer
              </span>{" "}
              currently working as an intern at{" "}
              <span className="text-[#ff6b35] font-semibold">Sekel Tech</span>{" "}
              in Pune. I specialize in creating immersive web experiences using
              cutting-edge technologies like
              <span className="text-[#00ff88]">
                {" "}
                React.js, Three.js, and Framer Motion
              </span>
              .
            </motion.p>

            <motion.p
              className="text-gray-300 text-[18px] leading-[32px] mb-8"
              variants={fadeIn("", "", 0.2, 1)}
            >
              My expertise spans the{" "}
              <span className="text-[#00ff88] font-semibold">MERN Stack</span>{" "}
              and
              <span className="text-[#ff6b35] font-semibold"> Spring Boot</span>
              , with a focus on building responsive, scalable applications that
              deliver exceptional user experiences across all devices.
            </motion.p>

            <motion.p
              className="text-gray-300 text-[18px] leading-[32px] mb-8"
              variants={fadeIn("", "", 0.3, 1)}
            >
              I'm constantly pushing the boundaries of web development by
              integrating
              <span className="text-[#00ff88] font-semibold">
                {" "}
                3D animations, advanced UI/UX designs
              </span>
              , and performance optimizations to create digital solutions that
              are both visually stunning and highly functional.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeIn("", "", 0.4, 1)}>
              <motion.button
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 255, 136, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="text-lg" />
                View Resume
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Services Section */}
        <div className="mt-20">
          <motion.div variants={textVariant()} className="text-center mb-12">
            <h3 className="text-white text-3xl font-bold mb-4">What I Do</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              I bring ideas to life through code, creating digital experiences
              that inspire and engage users.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-8 justify-center">
            {services.map((service, index) => (
              <ServiceCard key={service.title} index={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(About, "about");

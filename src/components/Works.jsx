import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-950 to-gray-950 p-6 rounded-3xl w-full sm:w-[360px] border border-gray-700 hover:border-[#00ff88] transition-all duration-500 cursor-pointer overflow-hidden"
        whileHover={{
          y: -10,
          boxShadow: "0 25px 50px rgba(0, 255, 136, 0.2)",
        }}
        onClick={() => window.open(live_demo_link, "_blank")}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-[#ff6b35]/10 rounded-3xl"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Project Image Container */}
        <div className="relative w-full h-[230px] rounded-2xl overflow-hidden mb-6">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex gap-3"
              initial={{ y: 20 }}
              animate={{ y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(live_demo_link, "_blank");
                }}
                className="bg-[#00ff88] text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-white transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Live Demo
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(source_code_link, "_blank");
                }}
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={github} alt="github" className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Project Info */}
        <div className="relative z-10">
          <motion.h3
            className="text-white font-bold text-[24px] mb-3"
            animate={{
              color: isHovered ? "#00ff88" : "#ffffff",
            }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h3>

          <p className="text-gray-300 text-[14px] leading-relaxed mb-4">
            {description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, tagIndex) => (
              <motion.span
                key={`${name}-${tag.name}`}
                className={`text-[12px] px-3 py-1 rounded-full border ${tag.color} font-medium`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  borderColor: isHovered ? "#00ff88" : "currentColor",
                }}
                transition={{
                  duration: 0.3,
                  delay: tagIndex * 0.1,
                  borderColor: { duration: 0.3 },
                }}
                whileHover={{ scale: 1.05 }}
              >
                #{tag.name}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#00ff88] rounded-full"
                style={{
                  right: `${10 + i * 15}%`,
                  top: `${10 + i * 10}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -30],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <section id="projects" className="relative">
      <div className="relative z-10">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center`}>My Portfolio</p>
          <h2 className={`${styles.sectionHeadText} text-center mb-4`}>
            <span className="bg-gradient-to-r from-[#ff6b35] to-[#00ff88] bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="w-full flex justify-center"
        >
          <p className="mt-4 text-gray-300 text-[17px] max-w-3xl leading-[30px] text-center">
            Following projects showcase my skills and experience through
            real-world examples of my work. Each project is briefly described
            with links to code repositories and live demos. They reflect my
            ability to solve complex problems, work with different technologies,
            and manage projects effectively.
          </p>
        </motion.div>

        <motion.div
          className="w-full flex justify-center mt-6"
          variants={fadeIn("", "", 0.2, 1)}
        >
          <motion.p
            className="text-[#00ff88] text-[16px] font-semibold bg-gray-800/50 px-6 py-2 rounded-full border border-[#00ff88]/30"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(0, 255, 136, 0.4)",
                "0 0 0 10px rgba(0, 255, 136, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            ✨ Hover over cards for interactive experience • Click to view live
            demo
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="mt-20 flex flex-wrap gap-8 justify-center">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Works, "");

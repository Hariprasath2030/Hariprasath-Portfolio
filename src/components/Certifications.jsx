import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { styles } from "../styles";
import {
  FaCertificate,
  FaAward,
  FaExternalLinkAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const certifications = [
  {
    title: "Getting Started with Spring Boot 2.0",
    issuer: "Infosys Springboard",
    date: "October 2024 - December 2024",
    description:
      "Comprehensive certification covering enterprise-level Spring Boot application development, RESTful API design, Spring Security implementation, and microservices architecture.",
    skills: [
      "Spring Boot",
      "Spring Security",
      "RESTful APIs",
      "Microservices",
      "JPA/Hibernate",
    ],
    color: "from-green-400 to-blue-500",
    certificateFile: "Spring.pdf",
  },
  {
    title: "Advanced MERN Stack Development",
    issuer: "Infosys Springboard",
    date: "September 2024 - October 2024",
    description:
      "Full-stack web development certification focusing on MongoDB, Express.js, React.js, and Node.js ecosystem with modern development practices and deployment strategies.",
    skills: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JWT Authentication",
    ],
    color: "from-purple-400 to-pink-500",
    certificateFile: "Mern.pdf",
  },
  {
    title: "Full Stack Web Development",
    issuer: "Cognifyz Technologies",
    date: "April 2024 - June 2024",
    description:
      "Comprehensive web development certification covering both frontend and backend technologies with hands-on project experience and industry best practices.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "MySQL",
      "Responsive Design",
    ],
    color: "from-orange-400 to-red-500",
    certificateFile: "Cognify.pdf",
  },
  {
    title: "Introduction to DevOps",
    issuer: "Great Learning Academy",
    date: "November 2024",
    description:
      "Completed an introductory course on DevOps covering core concepts, tools, and practices essential for continuous integration, deployment, and automation in modern software development.",
    skills: ["DevOps", "CI/CD", "Automation", "Software Development Lifecycle"],
    color: "from-blue-500 to-green-500",
    certificateFile: "Devops.pdf",
  },
];

const CertificationCard = ({ certification, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDownloadCertificate = (e) => {
    e.stopPropagation();
    // Open PDF in new tab instead of downloading
    window.open(`/certificates/${certification.certificateFile}`, "_blank");
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-3xl border border-gray-700 hover:border-[#00ff88] transition-all duration-500 cursor-pointer overflow-hidden"
        whileHover={{
          y: -10,
          boxShadow: "0 25px 50px rgba(0, 255, 136, 0.2)",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${certification.color} opacity-10 rounded-3xl`}
          animate={{
            opacity: isHovered ? 0.2 : 0.1,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 mb-4">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="p-3 bg-gradient-to-r from-[#00ff88] to-[#ff6b35] rounded-2xl"
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6 }}
            >
              <FaCertificate className="text-white text-xl" />
            </motion.div>

            <motion.button
              className="p-4 bg-gray-700 rounded-full hover:bg-[#00ff88] transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadCertificate}
              title="View Certificate"
            >
              <FaExternalLinkAlt className="text-white text-sm" />
            </motion.button>
          </div>

          <motion.h3
            className="text-white font-bold text-xl mb-2"
            animate={{
              color: isHovered ? "#00ff88" : "#ffffff",
            }}
            transition={{ duration: 0.3 }}
          >
            {certification.title}
          </motion.h3>

          <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
            <FaAward className="text-[#ff6b35]" />
            <span>{certification.issuer}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <FaCalendarAlt className="text-[#00ff88]" />
            <span>{certification.date}</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-4 relative z-10">
          {certification.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4 relative z-10">
          {certification.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              className="text-xs px-3 py-1 bg-gray-700 text-[#00ff88] rounded-full border border-gray-600 hover:border-[#00ff88] transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.3,
                delay: skillIndex * 0.1,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

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

const Certifications = () => {
  return (
    <section id="certifications" className="relative">
      <div className="relative z-10">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center`}>
            Professional Achievements
          </p>
          <h2 className={`${styles.sectionHeadText} text-center mb-4`}>
            <span className="bg-gradient-to-r from-[#ff6b35] to-[#00ff88] bg-clip-text text-transparent">
              Certifications & Training
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="w-full flex justify-center"
        >
          <p className="mt-4 text-gray-300 text-[17px] max-w-3xl leading-[30px] text-center">
            Continuous learning and professional development through
            industry-recognized certifications and specialized training programs
            that enhance my technical expertise and keep me updated with the
            latest technologies and best practices.
          </p>
        </motion.div>

        {/* Download Instruction */}
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
            📜 Click the view button to open certificate • Hover for interactive
            experience
          </motion.p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((certification, index) => (
            <CertificationCard
              key={`certification-${index}`}
              certification={certification}
              index={index}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={fadeIn("up", "tween", 0.2, 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[
            { number: "4+", label: "Certifications" },
            { number: "1+", label: "Years Learning" },
            { number: "10+", label: "Technologies" },
            { number: "100%", label: "Completion Rate" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 bg-gray-800/50 rounded-2xl border border-gray-700"
              whileHover={{
                scale: 1.05,
                borderColor: "#00ff88",
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#00ff88] mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(Certifications, "certifications");

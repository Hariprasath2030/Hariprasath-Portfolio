import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "linear-gradient(135deg, #1a1b1b 0%, #2d2d2d 100%)",
        color: "#fff",
        border: "1px solid #374151",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
      }}
      contentArrowStyle={{ borderRight: "7px solid #1a1b1b" }}
      date={
        <span style={{ 
          color: "#ffffff", 
          fontWeight: "bold",
          fontSize: "16px"
        }}>
          {experience.date}
        </span>
      }
      iconStyle={{ background: "#fff",
        border: "3px solid #ffffff",
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.16)"
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold bg-gradient-to-r from-[#00ff88] to-[#ff6b35] bg-clip-text text-transparent'>
          {experience.title}
        </h3>
        <p
          className='text-white text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-gray-300 text-[14px] pl-1 tracking-wider leading-relaxed hover:text-white transition-colors duration-300'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          <span className="bg-gradient-to-r from-[#00ff88] to-[#ff6b35] bg-clip-text text-transparent">
            Work Experience
          </span>
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
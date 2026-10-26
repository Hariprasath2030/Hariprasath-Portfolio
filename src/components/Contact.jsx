import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaPaperPlane, FaUser, FaEnvelope, FaComment } from "react-icons/fa";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_fh4etvi",
        "template_fz9o758",
        {
          from_name: form.name,
          to_name: "Hariprasath",
          from_email: form.email,
          to_email: "officialhari2030@gmail.com",
          message: form.message,
        },
        "yt2umU5GZvY2SCYNB"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you! I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS error:", error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(0, 255, 136, 0.3)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className={`${styles.sectionSubText} text-center`}>Get in touch</p>
          <h3 className={`${styles.sectionHeadText} text-center mb-2`}>
            <span className="text-white">
              Contact Me
            </span>
          </h3>
        </motion.div>
      </div>

      <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden relative">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.85] bg-gradient-to-br from-gray-950 to-black p-8 rounded-3xl border border-gray-700 relative z-10"
        >
          <motion.div
            className="absolute inset-0 bg-white/5 rounded-3xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative z-10">
            <p className="text-gray-300 text-center mb-8">
              Let's discuss your next project or collaboration opportunity
            </p>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-8"
            >
              <motion.label
                className="flex flex-col"
                variants={fadeIn("right", "spring", 0.1, 0.6)}
              >
                <span className="text-white font-medium mb-4 flex items-center gap-2">
                  <FaUser className="text-[#00ff88]" />
                  Your Name
                </span>
                <motion.input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField("")}
                  placeholder="What's your good name?"
                  className="bg-gray-800 py-4 px-6 placeholder:text-gray-400 text-white rounded-2xl outline-none border-2 border-gray-700 font-medium transition-all duration-300 focus:border-[#00ff88]"
                  variants={inputVariants}
                  animate={focusedField === "name" ? "focus" : ""}
                  required
                />
              </motion.label>

              <motion.label
                className="flex flex-col"
                variants={fadeIn("right", "spring", 0.2, 0.6)}
              >
                <span className="text-white font-medium mb-4 flex items-center gap-2">
                  <FaEnvelope className="text-[#00ff88]" />
                  Your Email
                </span>
                <motion.input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  placeholder="What's your email address?"
                  className="bg-gray-800 py-4 px-6 placeholder:text-gray-400 text-white rounded-2xl outline-none border-2 border-gray-700 font-medium transition-all duration-300 focus:border-[#00ff88]"
                  variants={inputVariants}
                  animate={focusedField === "email" ? "focus" : ""}
                  required
                />
              </motion.label>

              <motion.label
                className="flex flex-col"
                variants={fadeIn("right", "spring", 0.3, 0.6)}
              >
                <span className="text-white font-medium mb-4 flex items-center gap-2">
                  <FaComment className="text-[#00ff88]" />
                  Your Message
                </span>
                <motion.textarea
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField("")}
                  placeholder="What would you like to say?"
                  className="bg-gray-800 py-4 px-6 placeholder:text-gray-400 text-white rounded-2xl outline-none border-2 border-gray-700 font-medium resize-none transition-all duration-300 focus:border-[#00ff88]"
                  variants={inputVariants}
                  animate={focusedField === "message" ? "focus" : ""}
                  required
                />
              </motion.label>

              <motion.button
                type="submit"
                disabled={loading}
                className="bg-white text-black py-4 px-8 rounded-2xl outline-none w-fit text-white font-bold shadow-md shadow-primary flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{
                  scale: loading ? 1 : 1.05,
                  boxShadow: loading
                    ? ""
                    : "0 20px 40px rgba(0, 255, 136, 0.3)",
                }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                variants={fadeIn("right", "spring", 0.4, 0.6)}
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] relative"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");

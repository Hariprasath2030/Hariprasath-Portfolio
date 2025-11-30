import { cn } from "../../lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

// MAIN WRAPPER
export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-row gap-2 justify-center"
            initial={{ opacity: 0, scale: 0.7, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 15 }}
            transition={{ duration: 0.06, ease: "easeOut" }}
    >
            {items.map((item, idx) => (
              <motion.div
          key={item.title}
                initial={{ opacity: 0, y: 15, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                exit={{
                  opacity: 0,
                  y: 15,
                  scale: 0.7,
                  rotate: 10,
                  transition: { delay: idx * 0.005, duration: 0.05 },
                }}
                transition={{ 
                  delay: (items.length - 1 - idx) * 0.008, 
                  duration: 0.08,
                  ease: "backOut"
                }}
              >
                <motion.a
          href={item.href}
                  target={
                    item.href.startsWith("http") || item.href.endsWith(".pdf")
                      ? "_blank"
                      : "_self"
                  }
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900/90 backdrop-blur-md border border-gray-600/50 hover:border-[#00ff88] hover:bg-gray-800/90 transition-all duration-50 shadow-lg hover:shadow-xl"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -8, 8, 0],
                    y: -4,
                    boxShadow: "0 15px 30px rgba(0, 255, 136, 0.5)",
                    transition: { duration: 0.06 }
                  }}
                  whileTap={{ 
                    scale: 0.85,
                    rotate: 20,
                    transition: { duration: 0.03 }
                  }}
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 1, -1, 0]
                  }}
                  transition={{
                    y: {
                      duration: 1 + idx * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.05
                    },
                    rotate: {
                      duration: 2 + idx * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.1
                    }
                  }}
                >
                  <motion.div 
                    className="h-5 w-5"
                    whileHover={{
                      scale: 1.3,
                      rotate: 720,
                      transition: { duration: 0.1 }
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 1.5 + idx * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.1
                    }}
                  >
                    {item.icon}
                  </motion.div>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900/90 backdrop-blur-md border border-gray-600/50 hover:border-[#00ff88] hover:bg-gray-800/90 transition-all duration-50 shadow-lg hover:shadow-xl"
        whileHover={{
          scale: 1.2,
          y: -4,
          rotate: [0, -5, 5, 0],
          boxShadow: "0 15px 30px rgba(0, 255, 136, 0.5)",
          transition: { duration: 0.06 }
        }}
        whileTap={{ 
          scale: 0.85,
          transition: { duration: 0.03 }
        }}
        animate={{ 
          rotate: open ? 45 : 0,
          y: [0, -2, 0],
          scale: [1, 1.02, 1]
        }}
        transition={{ 
          rotate: { duration: 0.06 },
          y: {
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <motion.div
          animate={{
            rotate: open ? 180 : 0,
            scale: open ? 1.15 : 1
          }}
          transition={{ duration: 0.06 }}
        >
          <IconLayoutNavbarCollapse className="h-5 w-5 text-[#00ff88]" />
        </motion.div>
      </motion.button>
    </div>
  );
};

// DESKTOP VERSION
const FloatingDockDesktop = ({ items, className }) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-20 items-end gap-6 rounded-3xl bg-gray-900/40 backdrop-blur-md px-6 pb-4 md:flex border border-gray-600/30 hover:border-[#00ff88]/60 transition-all duration-75 shadow-xl hover:shadow-2xl",
        className
      )}
      whileHover={{
        scale: 1.03,
        y: -3,
        boxShadow: "0 25px 40px rgba(0, 255, 136, 0.35)",
        transition: { duration: 0.06 }
      }}
      animate={{
        y: [0, -1.5, 0],
        scale: [1, 1.005, 1]
      }}
      transition={{
        y: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        },
        scale: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      {items.map((item, index) => (
        <IconContainer mouseX={mouseX} key={item.title} index={index} {...item} />
      ))}
    </motion.div>
  );
};

// ICON ELEMENT
function IconContainer({ mouseX, title, icon, href, index }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const width = useSpring(
    useTransform(distance, [-150, 0, 150], [50, 95, 50]),
    {
      mass: 0.02,
      stiffness: 400,
      damping: 25,
    }
  );
  const height = useSpring(
    useTransform(distance, [-150, 0, 150], [50, 95, 50]),
    {
      mass: 0.02,
      stiffness: 400,
      damping: 25,
    }
  );

  const widthIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [24, 52, 24]),
    {
      mass: 0.02,
      stiffness: 400,
      damping: 25,
    }
  );
  const heightIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [24, 52, 24]),
    {
      mass: 0.02,
      stiffness: 400,
      damping: 25,
    }
  );

  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target={
        href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : "_self"
      }
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      whileHover={{
        y: -8,
        transition: { duration: 0.05, ease: "easeOut" },
      }}
      whileTap={{
        y: 0,
        scale: 0.9,
        transition: { duration: 0.03 },
      }}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-800/60 backdrop-blur-sm border border-gray-600/40 hover:border-[#00ff88] hover:bg-gray-700/60 transition-all duration-50 shadow-lg hover:shadow-xl"
        whileHover={{
          scale: 1.15,
          boxShadow: "0 20px 40px rgba(0, 255, 136, 0.4)",
          transition: { duration: 0.05 },
        }}
        whileTap={{
          scale: 0.85,
          transition: { duration: 0.03 },
        }}
        animate={{
          y: [0, -2, 0],
          rotate: hovered ? [0, -3, 3, 0] : [0, 0.5, -0.5, 0],
          scale: [1, 1.01, 1],
        }}
        transition={{
          y: {
            duration: 1.5 + index * 0.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          },
          rotate: {
            duration: hovered ? 0.2 : 3 + index * 0.2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: index * 0.05,
          },
          scale: {
            duration: 2 + index * 0.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.05,
          },
        }}
      >
        {/* Ultra-fast Background glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00ff88]/25 to-[#ff6b35]/25"
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1.15 : 1,
            rotate: hovered ? 360 : 0,
          }}
          transition={{ duration: 0.05 }}
        />

        {/* Lightning-fast Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.7 }}
              animate={{ opacity: 1, y: -10, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.7 }}
              className="absolute -top-16 left-1/2 w-fit rounded-lg border border-[#00ff88]/50 bg-gray-900/98 backdrop-blur-md px-4 py-2 text-sm font-medium whitespace-pre text-white shadow-2xl z-50"
              transition={{ duration: 0.05 }}
            >
              <motion.span
                className="bg-gradient-to-r from-[#00ff88] to-[#ff6b35] bg-clip-text text-transparent font-semibold"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {title}
              </motion.span>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/98"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ultra-responsive Icon */}
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center relative z-10"
          animate={{
            rotate: hovered ? [0, -10, 10, 0] : [0, 1, -1, 0],
            scale: hovered ? 1.15 : [1, 1.02, 1],
          }}
          transition={{
            duration: hovered ? 0.1 : 2 + index * 0.1,
            ease: "easeOut",
            repeat: Infinity,
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.25,
              rotate: 540,
              transition: { duration: 0.15 },
            }}
            animate={{
              rotate: hovered ? [0, 8, -8, 0] : 0,
              scale: [1, 1.03, 1],
            }}
            transition={{
              rotate: {
                duration: hovered ? 0.25 : 0,
                ease: "easeInOut",
              },
              scale: {
                duration: 1.8 + index * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.05,
              },
            }}
          >
            {icon}
          </motion.div>
        </motion.div>

        {/* Lightning-fast Ripple effects */}
        {hovered && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#00ff88]"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-[#ff6b35]"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-[#00ff88]/50"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            />
          </>
        )}

        {/* Super-fast Floating particles */}
        {hovered && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-[#00ff88] rounded-full"
                style={{
                  left: `${25 + i * 15}%`,
                  top: `${15 + i * 12}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  y: [0, -25],
                  x: [0, (i - 1.5) * 8],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.05,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                }}
              />
            ))}
          </>
        )}

        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00ff88]/10 to-[#ff6b35]/10"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1.5 + index * 0.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
        />
      </motion.div>
    </motion.a>
  );
}

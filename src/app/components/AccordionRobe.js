import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const AccordionRobe = ({ sections }) => {
  const [open, setOpen] = useState(null);

  const toggleAccordion = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {sections.map((section, index) => (
        <div key={index} className="border-b border-gray-300">
          <button
            className="flex justify-between items-center w-full text-lg font-semibold text-[#8B5E3C] py-4 px-6 bg-white cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            {section.title}
            <motion.div
              animate={{ rotate: open === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown className="text-[#8B5E3C]" />
            </motion.div>
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: open === index ? "auto" : 0,
              opacity: open === index ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 text-[#8B5E3C] bg-white">
              <h3 className="text-md font-semibold mb-2">{section.subtitle}</h3>
              <p>{section.content}</p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default AccordionRobe;

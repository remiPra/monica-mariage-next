"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "Quand faut-il prendre rendez-vous ?",
      answer:
        "Pour une expérience sereine, nous vous conseillons de prendre rendez-vous 8 à 12 mois avant votre mariage. Pour les robes sur-mesure, nous avons besoin d'un délai de confection de 4 à 6 mois, suivi des essayages et des ajustements. Cela nous permet de vous livrer votre robe environ un mois avant le grand jour.",
    },
    {
      question: "Comment se déroule le premier rendez-vous ?",
      answer: `Votre rendez-vous se déroule dans notre showroom privé à Seysses, près de Toulouse, dans une atmosphère intime et chaleureuse. Lors de ce moment privilégié, nous échangerons sur :
        • Vos inspirations et le style recherché
        • Votre budget (nos robes sont disponibles entre 750€ et 1850€)
        • Vos contraintes de date
        • Vos préférences en termes de style
        
        Chaque essayage est une expérience unique où vous êtes notre seule priorité.`,
    },
    {
      question: "Que faut-il prévoir pour l'essayage ?",
      answer: `Pour un essayage optimal, nous vous recommandons :
        • Des sous-vêtements nude sans couture
        • Vos chaussures de mariage ou des chaussures avec la hauteur de talon souhaitée
        
        N'hésitez pas à prendre des photos pendant vos essayages, tout en gardant à l'esprit que les modèles d'exposition peuvent nécessiter des ajustements pour correspondre parfaitement à vos mesures.`,
    },
    {
      question: "Quelles sont les modalités de paiement ?",
      answer: `Pour faciliter votre achat, nous proposons un paiement en trois fois :
        • 50% à la commande
        • 25% au premier essayage
        • 25% à la récupération de la robe
        
        Nous adaptons nos créations jusqu'à la taille 44 pour que chaque mariée trouve la robe de ses rêves.`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-12 font-serif"
    >
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl text-[#B17A55] text-center mb-12"
      >
        Questions Fréquentes
      </motion.h2>

      <div className="space-y-6">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-2 border-[#B17A55] rounded-lg overflow-hidden"
          >
            <motion.button
              className={`w-full text-left px-8 py-6 text-xl
                ${
                  activeIndex === index
                    ? "bg-[#FFE4E4] text-[#B17A55]"
                    : "bg-[#FFF5F5] hover:bg-[#FFE4E4] text-[#B17A55]"
                }
                flex justify-between items-center`}
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              whileHover={{ backgroundColor: "rgb(255, 228, 228)" }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-medium">{item.question}</span>
              <motion.span
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-2xl"
              >
                {"+"}
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { duration: 0.4 },
                      opacity: { duration: 0.3, delay: 0.1 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.4 },
                      opacity: { duration: 0.3 },
                    },
                  }}
                  className="bg-white overflow-hidden"
                >
                  <div className="px-8 py-6">
                    <motion.p
                      className="text-gray-700 whitespace-pre-line text-lg leading-relaxed"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      exit={{ y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.answer}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQAccordion;

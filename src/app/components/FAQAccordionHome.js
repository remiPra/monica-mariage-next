import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQAccordionHome = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "Comment choisir la robe de mariée qui me convient ?",
      answer:
        "Le choix de votre robe dépend de votre morphologie, de votre style et du thème de votre mariage. Nous recommandons d'essayer plusieurs modèles pour voir celui qui vous met le plus en valeur. Nos conseillers sont là pour vous aider à trouver la robe parfaite.",
    },
    {
      question:
        "Combien de temps à l'avance dois-je acheter ma robe de mariée ?",
      answer:
        "Il est conseillé d'acheter votre robe entre 6 et 12 mois avant votre mariage pour prévoir les ajustements nécessaires et éviter tout stress de dernière minute.",
    },
    {
      question: "Proposez-vous des retouches sur les robes achetées ?",
      answer:
        "Oui, nous offrons un service de retouches pour ajuster votre robe à votre silhouette. Ce service est en supplément et le coût varie en fonction des modifications à effectuer.",
    },
    {
      question: "Quelles sont les tailles disponibles ?",
      answer:
        "Nos robes sont disponibles du 36 au 44. Nous proposons également un service de confection sur mesure pour s'adapter à toutes les morphologies.",
    },
    {
      question: "Puis-je commander une robe sur mesure ?",
      answer:
        "Oui, nous proposons des robes de mariée sur mesure. Vous pouvez choisir le tissu, la coupe et les détails de votre robe. Un rendez-vous avec notre couturier est nécessaire pour prendre vos mesures et discuter du design.",
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer:
        "Les délais de livraison varient entre 4 et 6 mois pour les commandes standard. Pour les modèles sur mesure, il faut compter jusqu'à 8 mois. Nous proposons également un service express en cas de besoin urgent.",
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer:
        "Nous acceptons les paiements par carte bancaire, virement bancaire et PayPal. Nous proposons également un paiement en plusieurs fois pour faciliter votre achat.",
    },
    {
      question: "Puis-je prendre rendez-vous pour un essayage ?",
      answer:
        "Oui, nous vous recommandons de prendre rendez-vous via notre site ou par téléphone pour bénéficier d'un accompagnement personnalisé lors de votre essayage.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-12 font-serif  bg-gradient-to-b from-white to-[#FDE9E6]"
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

export default FAQAccordionHome;

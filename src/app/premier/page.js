import { FaPhone, FaWhatsapp } from "react-icons/fa";
import Header from "../components/Header";
import { MdContactPage } from "react-icons/md";
import { BsCalendarHeart } from "react-icons/bs";
import { GiDress } from "react-icons/gi";
import { TbRulerMeasure } from "react-icons/tb";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { BsCameraFill } from "react-icons/bs";
import { FaRegComments, FaRegHeart } from "react-icons/fa";
import { GiMagicHat } from "react-icons/gi";
import { RiMagicLine } from "react-icons/ri";
import FAQAccordion from "../components/FAQAccordion";

export default function BoutiquePage() {
  return (
    <>
      <Header />
      <div className="mt-[100px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-['Cormorant_Garamond']">
        {/* Hero Section */}
        <header className="text-center py-16 bg-[#f9f3f0]">
          <h1 className="text-4xl md:text-5xl text-[#885c44] font-light mb-8">
            Boutique de robes de mariée à Toulouse
          </h1>
          <p className="text-xl text-[#885c44]/80 italic">
            Showroom privée de vente de robes de mariée / Since 2014
          </p>
        </header>
        {/* Introduction */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl text-[#885c44] mb-6 text-center">
              Nos robes de mariée à Toulouse : Une expérience unique pour votre
              mariage
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Située à 20 minutes de Toulouse, notre boutique de robes de mariée
              vous accueille dans un cadre cosy pour la réalisation de votre
              robe a votre taille et personnalisable.{" "}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Depuis 10 ans, notre boutique offre un véritable écrin féerique où
              chaque future mariée peut vivre son rêve dans une atmosphère
              enchanteresse. Notre showroom a été pensé comme un cocon intimiste
              où chaque détail est orchestré pour votre confort, créant ainsi un
              espace privilégié pour cette étape magique de votre vie
            </p>
          </div>
        </section>
        {/* Premier Contact */}
        <section className="py-12 bg-[#f9f3f0]">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl text-center text-[#885c44] mb-6">
              Prendre rendez-vous pour votre première visite
            </h3>
            <p className="text-gray-700 mb-4">
              Pour préparer au mieux votre premier rendez-vous, vous pouvez :
            </p>
            <ul className="list-none pl-6 space-y-4 text-gray-700 mb-8">
              <li className="flex items-center gap-3">
                <FaPhone className="text-[#885c44] text-xl" />
                Nous appeler directement
              </li>
              <li className="flex items-center gap-3">
                <MdContactPage className="text-[#885c44] text-xl" />
                Remplir notre formulaire de contact
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-[#885c44] text-xl" />
                Nous contacter via WhatsApp
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              Lors de ce premier contact, nous vous demanderons quelques
              informations essentielles :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li className="flex items-center gap-3">
                <BsCalendarHeart className="text-[#885c44] text-xl" />
                La date de votre mariage
              </li>
              <li className="flex items-center gap-3">
                <TbRulerMeasure className="text-[#885c44] text-xl" />
                Votre taille approximative
              </li>
              <li className="flex items-center gap-3">
                <GiDress className="text-[#885c44] text-xl" />
                Le style de robe que vous envisagez
              </li>
              <li className="flex items-center gap-3">
                <RiMoneyEuroCircleLine className="text-[#885c44] text-xl" />
                Votre budget
              </li>
            </ul>
          </div>
        </section>
        {/* <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl text-[#885c44] mb-6">
              La magie de votre rendez-vous découverte
            </h3>
            <p className="text-gray-700 mb-6">
              Laissez-vous guider dans cette expérience unique et personnalisée
              d'1h15, où chaque instant est pensé pour faire de votre recherche
              de robe un moment inoubliable :
            </p>
            <ol className="list-none pl-6 space-y-6 text-gray-700">
              <li className="flex gap-4">
                <BsCameraFill className="text-[#885c44] text-xl flex-shrink-0 mt-1" />
                <div>
                  <span className="text-[#885c44] font-medium">
                    Préparez votre rêve
                  </span>
                  <p>
                    La veille de notre rencontre, prenez le temps de capturer
                    les robes qui font vibrer votre cœur. Chaque image sera une
                    source précieuse d'inspiration pour notre échange.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <FaRegComments className="text-[#885c44] text-xl flex-shrink-0 mt-1" />
                <div>
                  <span className="text-[#885c44] font-medium">
                    Le temps des confidences
                  </span>
                  <p>
                    Dès votre arrivée dans notre écrin, nous vous accueillons
                    pour un moment privilégié où vos rêves et inspirations
                    prennent vie à travers nos échanges.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <GiMagicHat className="text-[#885c44] text-xl flex-shrink-0 mt-1" />
                <div>
                  <span className="text-[#885c44] font-medium">
                    L'expertise enchantée
                  </span>
                  <p>
                    Notre experte vous guide avec bienveillance, révélant les
                    secrets qui sublimeront votre silhouette et magnifieront
                    votre personnalité.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <FaRegHeart className="text-[#885c44] text-xl flex-shrink-0 mt-1" />
                <div>
                  <span className="text-[#885c44] font-medium">
                    La sélection sur mesure
                  </span>
                  <p>
                    Ensemble, nous explorons notre collection pour trouver les
                    robes qui correspondent parfaitement à vos envies et à votre
                    budget, comme des étoiles qui s'alignent.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <RiMagicLine className="text-[#885c44] text-xl flex-shrink-0 mt-1" />
                <div>
                  <span className="text-[#885c44] font-medium">
                    Le moment magique
                  </span>
                  <p>
                    Vivez l'émotion des essayages dans une atmosphère intime et
                    chaleureuse, où chaque détail est souligné par nos conseils
                    personnalisés pour révéler la mariée qui sommeille en vous.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section> */}
        {/* Déroulement */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl text-center text-[#885c44] mb-6">
              Un rendez-vous privilégié pour votre robe de mariée
            </h3>
            <div className="mb-8 p-6 bg-[#f9f3f0] rounded-lg border border-[#885c44]/20">
              <p className="text-[#885c44] italic text-lg leading-relaxed">
                "Chez Monica Mariage, chaque mariée est traitée comme une reine.
                Monica est à votre écoute et vous offre des conseils avisés, en
                prenant en compte votre morphologie pour trouver la robe qui
                épouse parfaitement votre silhouette."
              </p>
            </div>
          </div>
        </section>
        {/* Personnalisation */}

        {/* Préparation */}
        <section className="py-12 bg-[#f9f3f0]">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl text-[#885c44] mb-6">
              Ce qu'il faut prévoir pour votre essayage
            </h3>
            <p className="text-gray-700 mb-4 text-2xl">
              Pour votre essayage, prévoyez :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Un sous-vêtement nude sans couture</li>
              <li>
                Vos chaussures de mariage (ou des chaussures avec la hauteur de
                talon souhaitée)
              </li>
            </ul>
          </div>
        </section>
        {/* Calendrier */}
        {/* <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl text-[#885c44] mb-6">Planning et délais</h3>
            <p className="text-gray-700 mb-4 text-2xl">
              La préparation de votre robe de mariée commence idéalement 10 à 12
              mois avant votre mariage. Notre processus de création nécessite 6
              à 8 mois, comprenant :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-2xl text-gray-700 mb-6">
              <li>La confection artisanale</li>
              <li>Les essayages</li>
              <li>Les ajustements finaux</li>
            </ul>
            <p className="text-gray-700 text-2xl">
              Votre robe sera prête environ 1 mois avant votre cérémonie.
            </p>
          </div>
        </section> */}
        {/* Organisation */}
        {/* <section className="py-12 bg-[#f9f3f0]">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl text-[#885c44] mb-6">
              Les étapes de création de votre robe
            </h3>
            <p className="text-2xl text-gray-700 mb-4">
              Le parcours de création comprend généralement 4 rendez-vous :
            </p>
            <ol className="text-2xl list-decimal pl-6 space-y-2 text-gray-700">
              <li>La découverte et le choix du modèle</li>
              <li>La prise de mesures</li>
              <li>Premier essayage pour les retouches</li>
              <li>Second essayage d'ajustement</li>
            </ol>
          </div>
        </section> */}
        {/* Paiement */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl text-[#885c44] mb-6">
              Modalités de paiement
            </h3>
            <p className="text-gray-700 mb-4 text-2xl">
              Pour la réalisation de votre robe :
            </p>
            <ul className="list-disc pl-6 text-2xl space-y-2 text-gray-700">
              <li>50% à la commande</li>
              <li>25% au premier essayage</li>
              <li>25% a la récupération de la robe</li>
            </ul>
          </div>
        </section>
        {/* Contact */}
        {/* <section className="py-12 bg-[#f9f3f0]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl text-[#885c44] mb-6">
              Contact et localisation
            </h2>
            <p className="text-2xl text-gray-700">
              Retrouvez notre boutique de robes de mariée à seulement 6 minutes
              de Toulouse.
            </p>
          </div>
        </section> */}
        {/* Note */}
        <div className="py-8 bg-white">
          <p className="max-w-3xl text-2xl mx-auto text-center italic text-gray-600">
            Note: N'hésitez pas à prendre des photos lors de vos essayages. Les
            modèles d'exposition peuvent nécessiter des ajustements pour
            correspondre parfaitement à vos mesures.
          </p>
        </div>
        <FAQAccordion />
      </div>
    </>
  );
}

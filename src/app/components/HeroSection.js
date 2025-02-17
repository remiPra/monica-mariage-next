import Image from "next/image";

const HeroSection = ({
  title,
  subtitle,
  iconSrc,
  buttonText,
  buttonOnClick,
}) => {
  return (
    <div className="text-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FDE9E6] to-white">
      <div className="max-w-4xl mx-auto">
        {/* Titre */}
        <h1 className="text-3xl font-cursive sm:text-4xl lg:text-5xl text-[#af7749] font-playfair mb-6 leading-tight">
          {title}
        </h1>

        {/* Icône */}
        <Image
          src={iconSrc}
          alt="Robes de mariée icon"
          width={96}
          height={96}
          className="mx-auto mb-2"
        />

        {/* Sous-titre */}
        <p className="text-base sm:text-lg text-gray-600 font-poppins max-w-4xl mx-auto leading-relaxed mb-8">
          {subtitle}
        </p>

        {/* Bouton */}
        <button
          onClick={buttonOnClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#af7749] text-white rounded-full hover:bg-[#8b5e3a] transition-colors duration-300"
        >
          {buttonText}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;

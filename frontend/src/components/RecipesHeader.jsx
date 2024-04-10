/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import FilterCards from "./FilterCards";

const FilterCardsData = [
  {
    images: "images/ff.png",
    name: "Filipino Foods | All",
    category: "All",
  },
  {
    images: "images/tapsilog.png",
    name: "Tapsilog | Breakfast",
    category: "Breakfast",
  },
  {
    images: "images/sinigang.png",
    name: "Sinigang | Lunch",
    category: "Lunch",
  },
  {
    images: "images/bilo-bilo.png",
    name: "Bilo-bilo | Merienda",
    category: "Meryenda",
  },
  {
    images: "images/pork-bistek.png",
    name: "Pork Bistek | Dinner",
    category: "Dinner",
  },
];

export default function RecipesHeader({ setSelectedCard, setSearchInput }) {
  const [selectedCard, setSelectedCardLocal] = useState(
    FilterCardsData[0].category
  );
  const [search, setSearch] = useState("");

  const isTablet = useMediaQuery({ query: "(max-width: 638px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });

  const handleCardClick = (category) => {
    console.log("handleCardClick called with category:", category);
    setSelectedCardLocal(category);
    setSelectedCard(category);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSearchInput(event.target.value);
  };

  return (
    <>
      <div
        className={`${isMobile ? "mr-[2rem]" : isTablet ? "mr-[4rem]" : ""}`}
      >
        {/* Hero */}
        <h1 className="font-serif text-black text-3xl leading-none mb-4 xl:text-6xl lg:text-6xl md:text-5xl sm:text-4xl">
          Welcome to
          <br />
          Tito Zah&apos;s Kitchen
        </h1>
        {/* Search */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search recipes..."
            className="border-2 border-gray bg-white h-10 px-5 pr-16 rounded-[3rem] text-sm focus:outline-none w-full"
            value={search}
            onChange={handleSearchChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-2.5 right-4 h-5 w-5 text-gray-500"
            viewBox="0 0 50 50"
          >
            <path d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
          </svg>
        </div>
      </div>
      {/* Filter Cards */}
      <div className="hidden md:block">
        <div className="flex gap-5 my-10">
          {FilterCardsData.map((card, index) => (
            <FilterCards
              key={index}
              image={card.images}
              name={card.name}
              category={card.category}
              selected={card.category === selectedCard}
              onClick={() => handleCardClick(card.category)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

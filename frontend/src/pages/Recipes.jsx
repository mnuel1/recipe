/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Header from "../components/RecipesHeader";
import FilterCards from "../components/FilterCards";
import Filters from "../components/Filters";
import Cards from "../components/Cards";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";
import _ from "lodash";
import { RecipeServices } from "../services/recipes";
import CustomSpinner from "../components/customspinner/Spinner";

const FilterCardsData = [
  {
    images: "images/tapsilog.png",
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

const FiltersData = [  
  {
    filter: "Calories",
  },
  {
    filter: "Difficulty",
  },
  
];


const difficultyToInt = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return 1;
    case "Medium":
      return 2;
    case "Hard":
      return 3;
    default:
      return 0;
  }
};

export default function Recipes({ isLogin = true }) {
  const [selectedCard, setSelectedCard] = useState(FilterCardsData[0].category);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSort, setSelectedSort] = useState("ascend");
  const [searchInput, setSearchInput] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect( () => {
    if (recipes && (Array.isArray(recipes) ? recipes.length > 0 : Object.keys(recipes).length > 0)) {
      setLoading(false);
    }
  }, [recipes])
  const fetchRecipes = async () => {
    const data = await RecipeServices.viewAllRecipe();
    console.log(data.recipe);

    setRecipes(data.recipe);
  };

  const debounce = _.debounce(fetchRecipes, 5000);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    debounce();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: windowWidth / 185,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: windowWidth / 185,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: windowWidth / 185,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: windowWidth / 185,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const handleCardClick = (category) => {
    console.log("handleCardClick called with category:", category);
    setSelectedCard(category);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((f) => f !== filter);
      } else {
        return [filter];
      }
    });
  };

  const handleSortClick = () => {
    if (selectedFilters) {
      setSelectedSort((prevSort) =>
        prevSort === "ascend" ? "descend" : "ascend"
      );
    }
  };

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1536px)" });

  return (
    <>
    {loading && <CustomSpinner msg={'Be ready to dig in! 🍽️ '}/>}
    {!loading && 
    <div className="container sm:m-auto">
      {isDesktopOrLaptop ? (
        <div className="flex justify-between items-center">
          <Header
            setSelectedCard={setSelectedCard}
            setSearchInput={setSearchInput}
          />
        </div>
      ) : (
        <Header
          setSelectedCard={setSelectedCard}
          setSearchInput={setSearchInput}
        />
      )}
      <div className="md:hidden my-10">
        <Slider {...settings}>
          {FilterCardsData.map((card, index) => (
            <div key={index}>
              <FilterCards
                image={card.images}
                name={card.name}
                category={card.category}
                selected={card.category === selectedCard}
                onClick={() => handleCardClick(card.category)}
              />
            </div>
          ))}
        </Slider>
      </div>    
      {/* Header Filter */}
      <div className="flex items-center w-1/2 justify-between">
        <div className="flex">
          <h2 className="font-serif text-black text-lg leading-none xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl mr-10">
            All Items
          </h2>
          {FiltersData.map((filter, index) => (
            <div className="mr-4 self-end" key={index}>
              <Filters
                filter={filter.filter}
                selected={selectedFilters.includes(filter.filter)}
                onClick={() => handleFilterClick(filter.filter)}
              />
            </div>
          ))}
        </div>
        <img
          className="self-end hover:cursor-pointer 2xl:translate-x-[-18rem] xl:translate-x-[-13rem] lg:translate-x-[-7rem] md:translate-x-[-2rem]"
          width="24"
          height="24"
          src={
            selectedSort === "ascend"
              ? "https://img.icons8.com/fluency-systems-regular/48/607917/generic-sorting.png"
              : "https://img.icons8.com/fluency-systems-regular/48/607917/sort-amount-up-reversed.png"
          }
          alt="generic-sorting"
          onClick={handleSortClick}
        />
      </div>      
      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-20 gap-[3rem] my-24 justify-start">        
        {!loading && isLogin && <Cards isCreate={true} />}
        
        {recipes
          .filter(
            (card) =>
              (selectedCard === "All" || card.mealType === selectedCard) &&
              (card.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                card.mealType.toLowerCase().includes(searchInput.toLowerCase()))
          )
          .sort((a, b) => {
            if (selectedFilters.includes("Calories")) {
              return selectedSort === "descend"
                ? a.calories - b.calories
                : b.calories - a.calories;
            } else if (selectedFilters.includes("Difficulty")) {
              return selectedSort === "descend"
                ? difficultyToInt(a.difficulty) - difficultyToInt(b.difficulty)
                : difficultyToInt(b.difficulty) - difficultyToInt(a.difficulty);
            }
            return 0;
          })
          .map((card, index) => (
            
            <Cards
              key={index}
              image={card.image}
              name={card.name}
              calories={card.calories}
              serving={card.serving}
              meal={card.mealType}
              prepTime={card.prepTime}
              cookTime={card.cookTime}
              ingredients={card.ingredients}
              directions={card.directions}
            />
          ))}
      </div>
    </div>
    }
    </>
  );
}

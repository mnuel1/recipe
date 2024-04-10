import { useEffect, useState } from "react";
import Hero from "../components/Header";
import Cards from "../components/Cards";
import _ from "lodash";
import { RecipeServices } from "../services/recipes";
import CustomSpinner from "../components/customspinner/Spinner";

export default function Homepage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchRecipes = async () => {
    const data = await RecipeServices.getTopPicksRecipe();
    console.log(data.recipe)
    setRecipes(data.recipe);
  };

  useEffect( () => {
    if (recipes && (Array.isArray(recipes) ? recipes.length > 0 : Object.keys(recipes).length > 0)) {
      setLoading(false);
    }
  }, [recipes])

  const debounce = _.debounce(fetchRecipes, 5000);

  useEffect(() => {
    const checkOverflow = () => {
      document.body.style.overflowY =
        window.innerWidth > 1530 ? "hidden" : "auto";
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    debounce();
    return () => {
      document.body.style.overflowY = "auto";
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const currentTime = new Date().getHours();
  
  return (
    <>      
     {loading && <CustomSpinner msg={'Be ready to dig in! 🍽️ '}/>}
     {!loading && <> 
      <Hero
        header="Halo-Halong Bliss in Every Dish"
        description="Discover culinary joy at Tito Zah's Kitchen. Add, search, and enjoy recipes for breakfast, lunch, meryenda, and dinner with ease."
      />      
      <div className="container flex flex-wrap justify-center gap-20 my-10 lg:justify-between md:justify-around sm:justify-around m-auto">
        
        {recipes.map((card, index) => (          
          <Cards
            key={index}
            image={card.image}
            name={card.name}
            calories={card.calories}
            servings={card.serving}
            meal={card.meal}
            prepTime={card.prepTime}
            cookTime={card.cookTime}
            ingredients={card.ingredients}
            directions={card.directions}
            isHomePage={true}
          />
        ))}
                           
        {/* <div className=" font-sans text-xs lg:text-sm md:text-sm text-black lg:w-1/3 md:w-1/2 w-[70%] text-center mx-auto">
          {currentTime >= 6 && currentTime <= 8 ? (
            <>
              <h2>Breakfast Bonanza</h2>
              <p>Rise and shine! Amoy pandesal in the morning. Let's eat!</p>              
            </>
          ) : currentTime >= 12 && currentTime < 13 ? (
            <>
              <h2>Lunch Fiesta</h2>
              <p>Savor the flavors of lutong-bahay, asim kilig for lunch!</p>              
            </>
          ) : currentTime >= 15 && currentTime < 16 ? (
            <>
              <h2>Meryenda Madness</h2>
              <p>Meryenda time! Pritong lumpia and kakanin, just right!</p>              
            </>
          ) : currentTime >= 18 && currentTime < 20 ? (
            <>
              <h2>Dinner Delights</h2>
              <p>Dinner time! Paborito sa hapag-kainan, lutong-bahay sa gabi!</p>              
            </>
          ) : <>
                <h2>Sleeping Time</h2>
                <p>Go diet din sometimes ante or you will be obese!</p>                
              </>
          }
        </div> */}
          
        
        
        <img
          className="absolute bottom-[-4.5rem] right-[-10rem] xl:h-[22rem] lg:h-[22rem] md:h-[20rem] sm:h-[17rem] h-[15rem]   "
          src="images/chopping-board.png"
          alt="Chopping Board"
        />
        <img
          className="absolute xl:translate-y-[-20rem] lg:translate-y-[-20rem] translate-y-[-10rem] xl:right[-3rem]   lg:right-[-3rem] right-[-2rem] xl:h-[10rem] lg:h-[10rem] md:h-[7rem] sm:h-[5rem] h-[5rem] rotate-180"
          src="images/bay-leaf.png"
          alt="Bay Leaf"
        />
        <img
          className="absolute xl:translate-y-[-7rem] lg:xl:translate-y-[-7rem] translate-y-0 right-[-3rem] h-[10rem]   rotate-[100deg]"
          src="images/carrots.webp"
          alt="Julienned Carrots"
        />
        <img
          className="absolute lg:bottom-[-10rem] xl:bottom-0 bottom-0 left-[-3rem] xl:h-[10rem] lg:h-[10rem]   h-20"
          src="images/onions.png"
          alt="3pcs Onions"
        />
        <img
          className="absolute translate-y-0 left-[-3rem] xl:h-[17rem] lg:h-[17rem] h-40    rotate-[190deg]"
          src="images/kangkong.png"
          alt="Kang-kong Leaves"
        />
        <img
          className="absolute xl:top-[10rem] lg:top-[10rem] top-20 left-[-5rem] xl:h-[15rem] lg:h-[15rem] h-[10rem]    rotate-[180deg]"
          src="images/chilli.webp"
          alt="2pcs Chilli"
        />
      </div>
      </>
    }
    </>
  );
}

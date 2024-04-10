/* eslint-disable react/prop-types */
import { useState } from "react";
import RecipeContent from "../pages/RecipeContent";
import CreateRecipe from "../pages/CreateRecipe";

export default function Cards({ isHomePage, isCreate, ...props }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const totalTime = props.prepTime + props.cookTime;
  
  return (
    <>
      <section>
        <div
          className={`card-container relative bg-white200 rounded-3xl ${
            isCreate ? "" : "hover:bg-green"
          } hover:cursor-pointer transition duration-500 ease-in-out xl:w-80 xl:h-96 lg:w-72 lg:h-80 md:w-64 md:h-72 sm:w-60 sm:h-64 w-56 h-60 z-10`}
          style={{
            boxShadow: "10px 10px 57px 2px rgba(0,0,0,0.23)",
            WebkitBoxShadow: "10px 10px 57px 2px rgba(0,0,0,0.23)",
            MozBoxShadow: "10px 10px 57px 2px rgba(0,0,0,0.23)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            isCreate ? setIsCreateModalOpen(true) : setShowContent(true);
          }}
        >
          {isCreate ? (
            <div className="flex flex-col items-center h-full">
              <div className="flex justify-center items-center hover:cursor-pointer h-5/6 w-full bg-gray200 bg-opacity-50 rounded-t-3xl">
                <img
                  className="lg:h-32 lg:w-32 md:h-28 md:w-28 sm:h-24 sm:w-24 h-20 w-20"
                  width="130"
                  height="130"
                  src={"images/add.png"}
                  alt="plus"
                />
              </div>
              <h1 className="text-green md:text-xl sm:text-lg text-md h-1/6 flex items-center">
                Add Recipe
              </h1>
            </div>
          ) : (
            <>
              <img
                className={`flex justify-center m-auto relative top-[-60px] ${
                  props.image.includes("pork-bistek.png") ? "" : "rounded-full"
                } xl:h-40 xl:w-40 lg:w-40 lg:h-40 md:w-36 md:h-36 sm:w-32 sm:h-32 w-28 h-28`}
                style={
                  props.image.includes("pork-bistek.png")
                    ? {}
                    : {
                        boxShadow: "-1px 14px 30px 9px rgba(0,0,0,0.23)",
                        WebkitBoxShadow: "-1px 14px 30px 9px rgba(0,0,0,0.23)",
                        MozBoxShadow: "-1px 14px 30px 9px rgba(0,0,0,0.23)",
                      }
                }
                src={`http://localhost:4000/${props.image}`}
                alt={props.name}
              />
              <div
                className={`px-12 ${
                  props.name.includes("\n")
                    ? "xl:translate-y-[-35px] lg:translate-y-[-45px] md:translate-y-[-55px] sm:translate-y-[-65px] translate-y-[-75px]"
                    : "xl:translate-y-[-20px] lg:translate-y-[-30px] md:translate-y-[-40px] sm:translate-y-[-50px] translate-y-[-60px]"
                }`}
              >
                <p className="font-semibold text-center text-md w-10/12 m-auto xl:2xl lg:text-2xl md:text-xl sm:text-lg">
                  {props.name}
                </p>
                <div className="line flex justify-center m-auto mt-4 mb-2 w-[125px] h-[1px] bg-green xl:w-[225px] lg:w-[195px] md:w-[165px] sm:w-[145px]"></div>
                <div className="flex justify-between items-center ">
                  <p className="text-xs text-black">
                    {props.calories}
                    {" calories"}
                  </p>
                  <p className="text-green">•</p>
                  <p className="text-xs text-black">
                    {props.serving}
                    {" persons"}
                  </p>
                </div>
                <div className="line flex justify-center m-auto mt-4 mb-2 w-[125px] h-[1px] bg-green xl:w-[225px] lg:w-[195px] md:w-[165px] sm:w-[145px]"></div>
                <div className="flex justify-between xl:my-5 lg:my-4 md:my-3 sm:2 my-1">
                  <p className="text-sm xl:text-xl lg:text-xl md:text-lg sm:text-md">
                    {props.meal}
                  </p>
                  <a
                    href="#"
                    className="img-bg bg-green items-center p-1 rounded-lg "
                  >
                    <img
                      src={
                        isHovered ? "images/view-alt.png" : "images/view.png"
                      }
                      alt="view"
                      className="xl:w-[18px] lg:w-[18px] md:w-[16px] sm:w-[14px] w-[12px]"
                    />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      {showContent && (
        <RecipeContent
          showModal={showContent}
          setShowModal={setShowContent}
          isHomePage={isHomePage}
          image={props.image}          
          totalTime={totalTime}
          ingredients={props.ingredients}
          directions={props.directions} 
          {...props}
        />
      )}
      {isCreateModalOpen && (
        <CreateRecipe
          showModal={isCreateModalOpen}
          setShowModal={setIsCreateModalOpen}
        />
      )}
    </>
  );
}

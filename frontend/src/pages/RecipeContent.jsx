/* eslint-disable react/prop-types */
import { useEffect, useRef, useCallback, useState } from "react";
import RecipeHeadNotes from "../components/RecipeHeadNotes";

export default function   RecipeContent({
  showModal,
  setShowModal,
  isHomePage,
  ...props
}) {
  const modalRef = useRef();
  const [modalSize, setModalSize] = useState(isHomePage ? 100 : 50);
  const [isFullSize, setIsFullSize] = useState(isHomePage);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const totalScrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(
      (scrollY / totalScrollHeight) * 50 + 50,
      100
    );
    setModalSize(scrollPercent);
    setIsFullSize(scrollPercent >= 99.5 && scrollPercent <= 100);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [closeModal]);
  console.log(modalSize);
  console.log(isFullSize);
  
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div
            className="modal bg-black bg-opacity-50 w-full h-full absolute flex items-center justify-center"
            onClick={closeModal}
          >
            {/* Modal Content */}
            <div
              ref={modalRef}
              className="modal-content bg-white200 rounded-3xl transition-all duration-500 relative overflow-x-hidden"
              style={{
                width: `${modalSize}%`,
                height: `${modalSize}%`,
                overflowY: isFullSize ? "auto" : "hidden",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Right Content */}
              <img
                className={`${
                  isFullSize ? "fixed right-[-5rem]" : "absolute"
                } xl:right-[10rem] lg:right-[7rem] md:right-[2rem] sm:right-[1rem] right-1 transition-all duration-500 w-1/3 lg:top-[15%] md:top-[25%] top-1/3 z-10`}
                src={`http://localhost:4000/${props.image}` || "images/sinigang.png"}
                alt={props.name}
              />
              <img
                className={`${
                  isFullSize
                    ? "fixed lg:right-[-23rem] md:right-[-23rem] sm:right-[-23rem] right-[-25rem]"
                    : "absolute"
                } xl:right-0 lg:right-[-5rem] md:right-[-10rem] sm:right-[-11rem] right-[-10rem] transition-all duration-500 h-full`}
                src="images/side-element.png"
                alt="Side Element"
              />
              {/* Recipe */}
              <div className="lg:mx-28 lg:my-20 mx-12 my-10">
                <div
                  className={`inline-flex py-1 px-2 rounded-lg bg-opacity-50 ${
                    props.difficulty === "Easy"
                      ? "bg-green200"
                      : props.difficulty === "Medium"
                      ? "bg-yellow"
                      : props.difficulty === "Hard"
                      ? "bg-red"
                      : "bg-green200"
                  }`}
                >
                  <p
                    className="italic"
                    style={{
                      fontSize: `${modalSize * 0.2}px`,
                    }}
                  >
                    {props.difficulty || "Easy"}
                  </p>
                </div>
                <h2
                  className="w-1/3 font-serif font-bold"
                  style={{
                    fontSize: `${modalSize * 0.7}px`,
                    lineHeight: `${modalSize * 0.7}px`,
                  }}
                >
                  {props.name || "Sample Title"}
                </h2>
                <h3
                  className="font-light"
                  style={{ fontSize: `${modalSize * 0.4}px` }}
                >
                  {props.meal || "Meal Type"}
                </h3>
                <div className="flex flex-wrap w-2/3 gap-2">
                  <RecipeHeadNotes
                    amount={props.calories || "100"}
                    name={"Calories"}
                  />
                  <RecipeHeadNotes
                    amount={props.serving || "2"}
                    name={"Servings"}
                  />
                  <RecipeHeadNotes
                    amount={
                      props.totalTime >= 60 ? (
                        <>
                          {Math.floor(props.totalTime / 60)} 
                          <span
                            style={{ fontSize: "0.5em", fontWeight: "lighter" }}
                          >
                            {" "}
                            hrs
                          </span>
                        </>
                      ) : (
                        <>
                          {props.totalTime}
                          <span
                            style={{ fontSize: "0.5em", fontWeight: "lighter" }}
                          >
                            {" "}
                            mins
                          </span>
                        </>
                      )
                    }
                    name={"Time"}
                  />
                </div>
                {modalSize <= 85 && (
                  <p
                    className="relative text-gray mt-4 hover:cursor-pointer"
                    style={{
                      fontSize: `${modalSize * 0.2}px`,
                    }}
                    onClick={() => setModalSize(100)}
                  >
                    View More &#8594;
                  </p>
                )}
                {/* Ingredients */}
                {modalSize >= 85 && (
                  <>
                    <h1 className="text-xl font-medium mt-10">Ingredients:</h1>
                    <ul>
                      {props.ingredients &&
                        props.ingredients.map((ingredient, index) => (
                          <div className="flex gap-3 ml-4" key={index}>
                            <p className="text-yellow font-bold">&#8226;</p>
                            <li className="text-[14px]">{ingredient}</li>
                          </div>
                        ))}
                    </ul>
                  </>
                )}
                {/* Directions */}
                {modalSize >= 85 && (
                  <>
                    <h1 className="text-xl font-medium mt-10">Directions:</h1>
                    <ul className="max-w-md">
                      {props.directions &&
                        props.directions.map((direction, index) => (
                          <div className="flex gap-3 ml-4" key={index}>
                            {" "}
                            <li className="text-[14px]">
                              {`${direction}`}
                            </li>
                          </div>
                        ))}
                    </ul>
                  </>
                )}
              </div>
              <img
                className="absolute top-5 left-5 hover:cursor-pointer"
                width="24"
                height="24"
                src="https://img.icons8.com/material-rounded/24/back--v1.png"
                alt="back--v1"
                onClick={closeModal}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

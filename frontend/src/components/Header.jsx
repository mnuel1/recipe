import React from "react";

export default function Header(props) {
  const headerLines = props.header.split(" ");

  return (
    <>
      <header>
        <div className="container flex-col justify-center items-center py-12 m-auto">
          <h1 className="font-serif text-black text-3xl leading-none text-center mb-4 xl:text-[5rem] lg:text-6xl md:text-5xl sm:text-4xl">
            {headerLines.map((line, index) => (
              <React.Fragment key={index}>
                {index === 2 && <br />}
                {line + " "}
              </React.Fragment>
            ))}
          </h1>
          <p className="font-sans text-xs lg:text-sm md:text-sm text-black lg:w-1/3 md:w-1/2 w-[70%] text-center mx-auto">
            {props.description}
          </p>
        </div>
      </header>
    </>
  );
}

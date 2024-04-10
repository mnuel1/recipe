/* eslint-disable react/prop-types */
export default function FilterCards(props) {
  return (
    <div
      className={`flex flex-col h-40 w-36 items-center justify-around py-4 px-6 rounded-t-[3rem] rounded-b-[3rem] transition-all duration-300 ease-in-out hover:cursor-pointer ${
        props.selected ? "bg-green" : "bg-gray200"
      }`}
      onClick={props.onClick}
    >
      <img
        className={`h-20 w-20 ${
          props.image.includes("pork-bistek.png") ? "" : "rounded-full"
        }`}
        src={props.image}
        alt={props.name}
      />
      <p
        className={`text-sm ${
          props.selected ? "font-medium text-white200" : "font-light text-gray"
        }`}
      >
        {props.category}
      </p>
    </div>
  );
}

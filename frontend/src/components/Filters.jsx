/* eslint-disable react/prop-types */
export default function Filters(props) {
  return (
    <div
      className={`bg-gray200 rounded-3xl py-1 px-3 inline-block transition-all duration-200 ease-in-out hover:cursor-pointer ${
        props.selected ? "bg-green" : ""
      }`}
      onClick={props.onClick}
    >
      <p
        className={`font-light lg:text-sm text-[11px] ${
          props.selected ? "text-white200 font-medium" : "text-gray"
        }`}
      >
        {props.filter}
      </p>
    </div>
  );
}

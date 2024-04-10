/* eslint-disable react/prop-types */
export default function RecipeHeadNotes(props) {
  return (
    <div
      className={`px-2 py-4 inline-flex flex-col w-14 items-center justify-center ${
        props.inCreate ? "bg-gray text-white200" : "bg-gray200"
      } rounded-full`}
      style={props.style}
    >
      <p className="text-sm font-semibold flex flex-wrap justify-center leading-3">
        {props.amount}
      </p>
      <p className="text-[10px] font-light">{props.name}</p>
    </div>
  );
}

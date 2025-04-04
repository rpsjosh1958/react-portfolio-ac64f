import React from "react";

const WorkCard = ({ img, name, description, tags, onClick }) => {
  return (
    <div
      className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link cursor-pointer"
      onClick={onClick}
    >
      <div className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-[180px] tablet:h-[120px] laptop:h-[200px]">
        <img
          alt={name}
          className="h-full w-full object-cover hover:scale-110 transition-all ease-out duration-300"
          src={img}
        />
      </div>
      <h1 className="mt-3 laptop:mt-5 text-xl laptop:text-2xl font-medium">
        {name || "Project Name"}
      </h1>
      <h2 className="text-base laptop:text-lg opacity-50">
        {description || "Description"}
      </h2>
      {tags && (
        <div className="mt-2 laptop:mt-3 flex flex-wrap gap-1 laptop:gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs bg-gray-700 px-2 py-1 rounded opacity-80"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkCard;
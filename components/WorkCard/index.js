import React from "react";

const WorkCard = ({ img, name, description, tags, onClick }) => {
  return (
    <div
      className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link cursor-pointer"
      onClick={onClick}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-auto"
        style={{ height: "350px" }}
      >
        <img
          alt={name}
          className="h-full w-full object-cover hover:scale-110 transition-all ease-out duration-300"
          src={img}
        />
      </div>
      <h1 className="mt-5 text-3xl font-medium">
        {name || "Project Name"}
      </h1>
      <h2 className="text-xl opacity-50">
        {description || "Description"}
      </h2>
      {tags && (
        <div className="mt-3 flex flex-wrap gap-2">
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
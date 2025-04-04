import React from "react";

const PodcastCard = ({ title, description, date, duration, coverImage }) => {
  return (
    <div className="overflow-hidden rounded-lg p-2 laptop:p-4 link">
      <div className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-[250px] laptop:h-[380px]">
        <img
          alt={title}
          className="h-full w-full object-cover hover:scale-110 transition-all ease-out duration-300"
          src={coverImage || "/images/podcast art.jpg"}
        />
      </div>
      <h1 className="mt-5 text-3xl font-medium">
        {title || "Podcast Episode"}
      </h1>
      <h2 className="text-xl opacity-50">
        {description || "Episode description"}
      </h2>
      <div className="mt-3 flex justify-between text-sm opacity-60">
      </div>
    </div>
  );
};

export default PodcastCard;
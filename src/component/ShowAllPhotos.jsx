import React from "react";
import house1 from "../assets/house1.jpg";

const ShowAllPhotos = ({ images, setShowAllPhotos }) => {
  const newImages = JSON.parse(images);

  return (
    <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center p-4 z-100 ">
      <div className="bg-white p-6 rounded-2xl w-full h-full  md:w-3/4 overflow-auto ">
        <div className="flex justify-end mb-2">
          <div
            onClick={() => setShowAllPhotos(false)}
            className=" text-3xl text-red-500 cursor-pointer hover:scale-150"
          >
            &times;
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {newImages.map((img, index) => (
            <img src={`http://localhost:3000/${img}`} alt="" srcset="" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowAllPhotos;

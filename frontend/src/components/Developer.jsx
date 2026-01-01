import React from "react";
import { Github, Linkedin, X } from "lucide-react";
import aaryan from"../assets/aaryan.png"
import vishal from"../assets/vishal.jpg"
import naina from"../assets/naina.png"
import riteek from"../assets/riteek.png"
import rohit from"../assets/rohit.png"
const DeveloperModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const developers = [
    {
      name: "Aaryan Raj",
      image: aaryan,
      github: "https://github.com/aaryanraj3",
      linkedin: "https://www.linkedin.com/in/aaryan-raj-482484258",
    },
    {
      name: "Naina Shukla",
      image: naina,
      github: "https://github.com/Naina7120284",
      linkedin: "https://in.linkedin.com/in/naina-shukla-15406a260",
    },
    {
      name: "Riteek Raj Tiwari",
      image: riteek,
      github: "https://github.com/tiwari369",
      linkedin: "https://www.linkedin.com/in/riteek-tiwari-0323a5361?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Rohit Kumar",
      image: rohit,
      github: "https://github.com/rohitkumar15aug",
      linkedin: "https://www.linkedin.com/in/rohit-kumar-5a1b1b294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Vishal Kumar",
      image: vishal,
      github: "https://github.com/vishalkumar4sep",
      linkedin: "https://www.linkedin.com/in/vishal-kumar-293a58256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl max-w-3xl w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-red-500 transition"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Meet Team Raven
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {developers.map((dev, index) => (
            <div key={index} className="text-center">
              <img
                src={dev.image}
                alt={dev.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 "
              />
              <h3 className="text-lg font-semibold text-black">{dev.name}</h3>
              <div className="flex justify-center gap-4 mt-2">
                <a href={dev.github} target="_blank" rel="noreferrer">
                  <Github className="text-black hover:text-gray-700 transition" />
                </a>
                <a href={dev.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="text-blue-600 hover:text-blue-800 transition" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperModal;

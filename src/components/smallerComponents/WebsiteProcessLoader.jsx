// components/ImageLoader.js
import Image from "next/image";
import { useState, useEffect } from "react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1596284274000-7d3eca888e3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmF0bWFufGVufDB8fDB8fHww",
    artist: "Michael Marais",
    link: "https://unsplash.com/photos/black-and-white-star-wars-lego-mini-figure-FYzHFQOag8A",
  },
  {
    url: "https://images.unsplash.com/photo-1609372254316-029635bbabe4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEJhdG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    artist: "Jon Tyson",
    link: "https://unsplash.com/photos/police-man-walking-on-street-during-daytime-kUJfXmzd5_0",
  },
  {
    url: "https://images.unsplash.com/photo-1612916628677-475f676a6adf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QmF0bWFufGVufDB8fDB8fHww",
    artist: "Sajjad Ahmadi",
    link: "https://unsplash.com/photos/silhouette-of-person-standing-on-the-road-during-night-time-edzVv0hEd7E",
  },
  {
    url: "https://images.unsplash.com/photo-1653395108060-e0236d7a9e58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fEJhdG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    artist: "Sangeeth N",
    link: "https://unsplash.com/photos/a-man-in-a-batman-costume-holding-a-bat-Gt9zf1-icuQ",
  },
  {
    url: "https://images.unsplash.com/photo-1682163339125-321e5a7eac1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fEJhdG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    artist: "Daniel Maquiling",
    link: "https://unsplash.com/photos/a-lego-batman-standing-on-a-yellow-background-U6LCozNcIKE",
  },
];

const ImageLoader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4">
        <p className="relative text-center text-white">All these are my references.</p>
        <div className="relative w-[300px] h-[300px] flex justify-center itmes-center">
          <Image
            src={images[currentIndex].url}
            alt={`Loading ${currentIndex}`}
            width={800}
            height={800}
            className="relative object-cover transition duration-1000 ease-in-out rounded-xl"
          />
        </div>
        <p className="relative text-center text-white">Btw Your website is being generated.</p>
        <a
        target="_blank"
          href={images[currentIndex].link}
          className="underline absolute bottom-0 left-0 right-0 text-white p-2"
        >
          {images[currentIndex].artist}
        </a>
      </div>
    </div>
  );
};

export default ImageLoader;

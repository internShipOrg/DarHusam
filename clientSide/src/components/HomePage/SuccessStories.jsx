import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SuccessStoriesSlider() {
  const [stories, setStories] = useState([]);
  const [idx, setIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/home/success-stories")
      .then(res => setStories(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const chk = () => setIsMobile(window.innerWidth < 768);
    chk();
    window.addEventListener("resize", chk);
    return () => window.removeEventListener("resize", chk);
  }, []);

  if (!stories.length) {
    return <div className="py-16 text-center">جارٍ التحميل...</div>;
  }

  const perView = isMobile ? 1 : Math.min(stories.length, 3);
  const width = `${100 / perView}%`;

  const prev = () => setIdx(i => Math.max(i - 1, 0));
  const next = () => setIdx(i => Math.min(i + 1, stories.length - perView));

  return (
    <div className="relative py-16 bg-white">
      <h2 className="text-3xl font-bold text-[#780C28] text-center mb-8">قصص النجاح</h2>
      <div className="max-w-6xl mx-auto px-4">
        {/* Slider */}
        <div className="relative">
          <button
            onClick={prev}
            disabled={idx === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
          >
            <ChevronLeft className="text-[#780C28]"/>
          </button>
          <button
            onClick={next}
            disabled={idx >= stories.length - perView}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
          >
            <ChevronRight className="text-[#780C28]"/>
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${(100 / perView) * idx}%)` }}
            >
              {stories.map(story => (
                <div
                  key={story._id}
                  className="p-3"
                  style={{ width }}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={story.imageUrl.startsWith("http")
                        ? story.imageUrl
                        : `http://localhost:5000${story.imageUrl}`}
                      alt={story.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5 flex flex-col h-full">
                      <h3 className="text-xl font-semibold text-[#6E8E59] mb-2">{story.name}</h3>
                      <p className="text-gray-600 flex-grow line-clamp-3">{story.shortStory}</p>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

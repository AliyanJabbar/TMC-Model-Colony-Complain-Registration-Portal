"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { client } from "@/sanity/lib/client"; // Adjust the import path as needed

interface NewsItem {
  content: string;
  date: string;
}

const TopNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await client.fetch(
          `*[_type == "news"] | order(date desc)`
        );
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return news.length > 0 ? (
    <div className="w-full bg-black/90 text-white/90 py-2 z-50">
      <Marquee direction="right" speed={40} pauseOnHover={true}>
        {news.map((item, index: number) => (
          <span key={index} className="mr-[200px]">
            {item.content}
          </span>
        ))}
      </Marquee>
    </div>
  ) : (
    <div></div>
  );
};

export default TopNews;

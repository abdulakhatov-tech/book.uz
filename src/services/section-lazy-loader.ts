import { useRef, useEffect, useState } from "react";

import useAxiosInstance from "@/api";
import useQueryHandler from "@/hooks/useQueryHandler";

const useSectionLazyLoader = () => {
  const axios = useAxiosInstance();

  const genresRef = useRef(null);
  const newAgeLibraryBooksRef = useRef(null);
  const recentlyPublishedBooksRef = useRef(null);
  const newArrivalBooksRef = useRef(null);
  const newsRef = useRef(null);

  const [isGenresVisible, setGenresVisible] = useState<boolean>(false);
  const [isNewAgeLibraryBooksVisible, setNewAgeLibraryBooksVisible] =
    useState<boolean>(false);
  const [isRecentlyPublishedBooksVisible, setRecentlyPublishedBooksVisible] =
    useState<boolean>(false);
  const [isNewArrivalBooksVisible, setNewArrivalBooksVisible] =
    useState<boolean>(false);
  const [isNewsVisible, setNewsVisible] = useState<boolean>(false);


  // Intersection Observer
  const observeSection =
    (setVisibility: any) => (entries: any, observer: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setVisibility(true);
          observer.unobserve(entry.target); // Stop observing after it becomes visible
        }
      });
    };

  useEffect(() => {
    const options = { threshold: 0.5 }; // Adjust the threshold for better visibility control

    const genresObserver = new IntersectionObserver(
      observeSection(setGenresVisible),
      options
    );
    const newAgeLibraryBooksObserver = new IntersectionObserver(
      observeSection(setNewAgeLibraryBooksVisible),
      options
    );
    const recentlyPublishedBooksObserver = new IntersectionObserver(
      observeSection(setRecentlyPublishedBooksVisible),
      options
    );
    const newArrivalBooksObserver = new IntersectionObserver(
      observeSection(setNewArrivalBooksVisible),
      options
    );
    const newsObserver = new IntersectionObserver(
      observeSection(setNewsVisible),
      options
    );

    // Start observing sections
    if (genresRef.current) genresObserver.observe(genresRef.current);
    if (newAgeLibraryBooksRef.current)
      newAgeLibraryBooksObserver.observe(newAgeLibraryBooksRef.current);
    if (recentlyPublishedBooksRef.current)
      recentlyPublishedBooksObserver.observe(recentlyPublishedBooksRef.current);
    if (newArrivalBooksRef.current)
      newArrivalBooksObserver.observe(newArrivalBooksRef.current);
    if (newsRef.current) newsObserver.observe(newsRef.current);

    return () => {
      genresObserver.disconnect();
      newAgeLibraryBooksObserver.disconnect();
      recentlyPublishedBooksObserver.disconnect();
      newArrivalBooksObserver.disconnect();
      newsObserver.disconnect();
    };
  }, []);

  // Queries using TanStack Query (useQuery)
  const genres = useQueryHandler({
    queryKey: ["genres"],
    queryFn: async () => {
      const response = await axios.get("/genres");
      return response.data?.data || [];
    },
    enabled: isGenresVisible,
  });

  const newAgeLibraryBooks = useQueryHandler({
    queryKey: ["newAgeLibrary"],
    queryFn: async () => {
      const response = await axios.get("/category/new-age-library");
      return response.data?.data || [];
    },
    enabled: isNewAgeLibraryBooksVisible,
  });

  const recentlyPublishedBooks = useQueryHandler({
    queryKey: ["recentlyPublishedBooks"],
    queryFn: async () => {
      const response = await axios.get("/category/recently-published");
      return response.data?.data || [];
    },
    enabled: isRecentlyPublishedBooksVisible,
  });

  const newArrivalBooks = useQueryHandler({
    queryKey: ["newlyArrivedBooks"],
    queryFn: async () => {
      const response = await axios.get("/category/newly-arrived");
      return response.data?.data || [];
    },
    enabled: isNewArrivalBooksVisible,
  });

  const allNews = useQueryHandler({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await axios.get("/news");
      return response.data?.data || [];
    },
    enabled: isNewsVisible,
  });



  return {
    genresRef,
    newAgeLibraryBooksRef,
    recentlyPublishedBooksRef,
    newArrivalBooksRef,
    newsRef,
    genres,
    newAgeLibraryBooks,
    recentlyPublishedBooks,
    newArrivalBooks,
    allNews,
  };
};

export default useSectionLazyLoader;

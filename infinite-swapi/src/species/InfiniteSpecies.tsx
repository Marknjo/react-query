import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useId } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const pgDataKey = useId();
  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["SWAPI-Species"],
    queryFn: () => fetchUrl(initialUrl),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  if (isLoading) {
    return <p className='loading'>Loading...</p>;
  }

  if (isError) {
    return (
      <>
        <h4>Error Loading SWAPI Species</h4>
        <p>{error?.toString().replace("Error:", "")}</p>
      </>
    );
  }

  return (
    <>
      {isFetching && <p className='loading'>Loading more...</p>}
      {!hasNextPage && <h4>Nothing more to load😔</h4>}
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={fetchNextPage as (page: number) => void}>
        {data.pages.map((pageData, i) => (
          <React.Fragment key={`${i + pgDataKey}`}>
            {pageData.results.map(
              (
                species: {
                  name: string;
                  language: string;
                  average_lifespan: number;
                  url: string;
                },
                i: number
              ) => (
                <Species
                  key={`${i}-${species.url}-${species.name}`}
                  name={species.name}
                  language={species.language}
                  averageLifespan={species.average_lifespan}
                />
              )
            )}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </>
  );
}

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";

let initUlr = "https://swapi.dev/api/people";

const fetchUrl = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    isFetching,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["swapi-persons"],
    queryFn: () => fetchUrl(initUlr),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  if (isLoading) {
    return <p className='loading'>Loading...</p>;
  }

  if (isError) {
    return (
      <>
        <h4>Error Fetching</h4>
        <p>{error?.toString().replace("Error:", "")}</p>
      </>
    );
  }

  return (
    <>
      {isFetching && <p className='loading'>Loading more...</p>}
      {!hasNextPage && <h4>Nothing more to load😔</h4>}
      <InfiniteScroll
        loadMore={fetchNextPage as (page: number) => void}
        hasMore={hasNextPage}>
        {data.pages.map((pageData, i) =>
          pageData.results.map(
            (person: {
              name: string;
              eye_color: string;
              hair_color: string;
            }) => (
              <Person
                key={person.name}
                name={person.name}
                eyeColor={person.eye_color}
                hairColor={person.hair_color}
              />
            )
          )
        )}
      </InfiniteScroll>
    </>
  );
}

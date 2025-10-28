"use client";

import { Center, Loader, SimpleGrid } from "@mantine/core";
import JobCard from "./jobCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

interface JobsGridProps {
  jobs: any[];
  fetchMoreJobs?: (page: number) => Promise<void>;
  totalPages?: number;
}

const JobsGrid = ({
  jobs,
  fetchMoreJobs,
  totalPages,
}: JobsGridProps) => {
  const [page, setPage] = useState(1);

  const fetchMore = async () => {
    if (!fetchMoreJobs || page >= (totalPages ?? 0)) return;
    const nextPage = page + 1;
    await fetchMoreJobs(nextPage);
    setPage(nextPage);  
  };

  return (
    <InfiniteScroll
      dataLength={jobs.length}
      next={fetchMore}
      hasMore={page < (totalPages ?? 0)}
      loader={
        <Center my="md">
          <Loader color="blue" />
        </Center>
      }
      endMessage={
        <Center my="md">
          <p>No more jobs 🎉</p>
        </Center>
      }
    >
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {jobs.map((job, idx) => (
          <JobCard key={idx} {...job} />
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default JobsGrid;

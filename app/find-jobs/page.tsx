"use client";

import Filter from "@/components/filter";
import JobsGrid from "@/components/jobGrid";
import { Center, Loader } from "@mantine/core";
import { useEffect, useState } from "react";

const Page = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    jobTitle: "",
    location: "",
    jobType: "",
    salaryRange: [20000, 300000],
  });

  const fetchJobs = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        title: filters.jobTitle || "",
        location: filters.location || "",
        jobType: filters.jobType || "",
        minSalary: String(filters.salaryRange[0] * 12),
        maxSalary: String(filters.salaryRange[1] * 12),
        page: String(page),
        limit: "16",
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs?${params.toString()}`
      );
      const data = await response.json();
      if (page === 1) {
        setJobs(data.data || []);
      } else {
        setJobs((prev) => [...prev, ...(data.data || [])]);
      }
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(1);
  }, [filters]);


  return (
    <div className="h-full py-4">
      <Filter setFilters={setFilters} />
      <div className="mt-8 px-16">
        {loading && jobs.length === 0 ? (
          <Center my="md">
            <Loader color="blue" />
          </Center>
        ) : (
          <JobsGrid
            jobs={jobs}
            fetchMoreJobs={fetchJobs}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default Page;

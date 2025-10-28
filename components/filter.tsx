"use client";

import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  Select,
  RangeSlider,
  Group,
  Box,
  Text,
} from "@mantine/core";
import { Search, MapPin, User } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";
import debounce from "lodash/debounce";
import { Divider } from "@mantine/core";

const defaultValues = {
  jobTitle: "",
  location: "",
  jobType: "",
  salaryRange: [20000, 300000] as [number, number],
};

type FormValues = typeof defaultValues;

const JOB_TYPE_DATA = [
  { value: "FULL_TIME", label: "Full-time" },
  { value: "PART_TIME", label: "Part-time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
];

interface FilterProps {
  setFilters?: (data: FormValues) => void;
}

const Filter = ({ setFilters }: FilterProps) => {
  const { control, watch } = useForm<FormValues>({ defaultValues });
  const salaryRangeValue = watch("salaryRange");
  const jobTitle = watch("jobTitle");
  const location = watch("location");
  const jobType = watch("jobType");

  // Detect small screens
  const smallScreen = useMediaQuery("(max-width: 768px)");

  // Debounced function for filtering
  const debouncedFilter = useMemo(
    () =>
      debounce((data: FormValues) => {
        setFilters?.(data);
      }, 500),
    [setFilters]
  );

  // Trigger filter when fields change
  useEffect(() => {
    const currentData: FormValues = {
      jobTitle,
      location,
      jobType,
      salaryRange: salaryRangeValue,
    };
    debouncedFilter(currentData);
    return () => debouncedFilter.cancel();
  }, [jobTitle, location, jobType, salaryRangeValue, debouncedFilter]);

  return (
    <Box
      style={{
        margin: "0 auto",
        marginTop: "1rem",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        paddingBottom: "1rem",
      }}
      className="shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <Group
        grow
        gap="md"
        wrap="wrap"
        style={{ flexDirection: smallScreen ? "column" : "row" }}
      >
        {/* Job Title */}
        <Box style={{ flex: 1, minWidth: "250px" }}>
          <Controller
            name="jobTitle"
            control={control}
            render={({ field }) => (
              <TextInput
                styles={{ input: { border: "none", boxShadow: "none" } }}
                {...field}
                placeholder="Search By Job Title, Role"
                leftSection={<Search size={16} />}
              />
            )}
          />
        </Box>

        {!smallScreen && <Divider orientation="vertical" color="#EAEAEA"/>}

        {/* Location */}
        <Box style={{ flex: 1, minWidth: "250px" }}>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                styles={{ input: { border: "none", boxShadow: "none" } }}
                placeholder="Preferred Location"
                leftSection={<MapPin size={16} />}
              />
            )}
          />
        </Box>

        {!smallScreen && <Divider orientation="vertical" color="#EAEAEA"/>}

        {/* Job Type */}
        <Box style={{ flex: 1, minWidth: "250px" }}>
          <Controller
            name="jobType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                data={JOB_TYPE_DATA}
                clearable
                placeholder="Job Type"
                styles={{
                  input: { border: "none", boxShadow: "none" },
                  wrapper: { border: "none", boxShadow: "none" },
                }}
                onChange={(val) => field.onChange(val ?? "")}
                leftSection={<User size={16} />}
              />
            )}
          />
        </Box>

        {!smallScreen && <Divider orientation="vertical" color="#EAEAEA"/>}

        {/* Salary Range */}
        <Box style={{ flex: 1, minWidth: "250px" }}>
          <Text
            size="sm"
            fw={500}
            mb="xs"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Salary Per Month</span>
            <Text span size="sm" c="black" fw={700}>
              ₹{salaryRangeValue[0].toLocaleString()} - ₹
              {salaryRangeValue[1].toLocaleString()}
            </Text>
          </Text>

          <Controller
            name="salaryRange"
            control={control}
            render={({ field }) => (
              <RangeSlider
                {...field}
                min={20000}
                max={300000}
                step={10000}
                label={(val) => `$${val.toLocaleString()}`}
                color="black"
                styles={{
                  track: { height: 4, borderRadius: 2 },
                  bar: { height: 4, borderRadius: 2 },
                  thumb: { width: 16, height: 16 },
                }}
              />
            )}
          />
        </Box>
      </Group>
    </Box>
  );
};

export default Filter;

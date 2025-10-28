import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  Select,
  Textarea,
  NumberInput,
  Grid,
  Group,
  Button,
  Box,
  Title,
  Modal,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconChevronDown, IconCalendar } from "@tabler/icons-react";

// Define the form structure (can be extended with Zod for validation)
const defaultValues = {
  jobTitle: "",
  companyName: "",
  location: "",
  jobType: "FullTime",
  minSalary: 0,
  maxSalary: 1200000,
  applicationDeadline: null,
  jobDescription: "",
};

const JOB_TYPE_DATA = [
  { value: "FULL_TIME", label: "Full-Time" },
  { value: "PART_TIME", label: "Part-Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
];

const CreateJobForm = ({ opened, onClose }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    console.log("Job Creation Data Submitted:", data);
    try {
      const payload = {
        title: data.jobTitle,
        company: data.companyName,
        location: data.location,
        jobType: data.jobType,
        minSalary: data.minSalary,
        maxSalary: data.maxSalary,
        description: data.jobDescription,
        deadline: data.applicationDeadline,
      };
      const response = fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    } catch (error) {
      console.error("Error creating job:", error);
    }
    reset();
    onClose();
  };

  const handleSaveDraft = () => {
    // Optionally use getValues() if you need to access form data without validation
    // const data = getValues();
    console.log("Saving Draft...");
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl" // Large modal size for the form layout
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
      title={
        <div style={{ width: "100%", textAlign: "center" }}>
          <Title order={3}>Create Job Opening</Title>
        </div>
      }
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Use Mantine Grid for a responsive two-column layout */}
        <Grid gutter="xl">
          {/* Job Title */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Controller
              name="jobTitle"
              control={control}
              rules={{ required: "Job Title is required" }}
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label="Job Title"
                  placeholder="Full Stack Developer"
                  error={fieldState.error?.message}
                  required
                />
              )}
            />
          </Grid.Col>

          {/* Company Name */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Controller
              name="companyName"
              control={control}
              rules={{ required: "Company Name is required" }}
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label="Company Name"
                  placeholder="Amazon, Microsoft, Swiggy"
                  error={fieldState.error?.message}
                  required
                />
              )}
            />
          </Grid.Col>

          {/* Location */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label="Location"
                  placeholder="Select Preferred Location"
                  error={fieldState.error?.message}
                  required
                />
              )}
            />
          </Grid.Col>

          {/* Job Type */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Controller
              name="jobType"
              control={control}
              rules={{ required: "Job Type is required" }}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  label="Job Type"
                  placeholder="FullTime"
                  data={JOB_TYPE_DATA}
                  error={fieldState.error?.message}
                  required
                  rightSection={<IconChevronDown size={14} />}
                  rightSectionPointerEvents="none"
                />
              )}
            />
          </Grid.Col>

          {/* Salary Range */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Title order={5} fw={500} mb={5}>
              Salary Range
            </Title>
            <Group grow gap="md">
              <Controller
                name="minSalary"
                control={control}
                rules={{ required: "Min Salary is required" }}
                render={({ field, fieldState }) => (
                  <NumberInput
                    {...field}
                    placeholder="₹0"
                    thousandSeparator=","
                    leftSection="₹"
                    error={fieldState.error?.message}
                    required
                  />
                )}
              />
              <Controller
                name="maxSalary"
                control={control}
                rules={{ required: "Max Salary is required" }}
                render={({ field, fieldState }) => (
                  <NumberInput
                    {...field}
                    placeholder="₹12,00,000"
                    thousandSeparator=","
                    leftSection="₹"
                    error={fieldState.error?.message}
                    required
                  />
                )}
              />
            </Group>
          </Grid.Col>

          {/* Application Deadline */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Controller
              name="applicationDeadline"
              control={control}
              rules={{ required: "Deadline is required" }}
              render={({ field, fieldState }) => (
                <DateInput
                  {...field}
                  label="Application Deadline"
                  placeholder="Select deadline"
                  leftSection={<IconCalendar size={18} stroke={1.5} />}
                  error={fieldState.error?.message}
                  required
                  onChange={field.onChange}
                  popoverProps={{
                    withinPortal: true,
                    zIndex: 9999,
                  }}
                />
              )}
            />
          </Grid.Col>

          {/* Job Description */}
          <Grid.Col span={12}>
            <Controller
              name="jobDescription"
              control={control}
              rules={{ required: "Job Description is required" }}
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  label="Job Description"
                  placeholder="Please share a description to let the candidate know more about the job role"
                  minRows={4}
                  autosize
                  error={fieldState.error?.message}
                  required
                />
              )}
            />
          </Grid.Col>
        </Grid>

        {/* Buttons */}
        <Group justify="space-between" mt="xl" style={{ width: "100%" }}>
          <Button
            variant="default"
            size="lg"
            radius=""
            onClick={handleSaveDraft}
          >
            Save Draft »
          </Button>
          <Button type="submit" size="lg" color="#00AAFF">
            Publish »
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default CreateJobForm;

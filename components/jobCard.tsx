"use client";

import { Card, Text, Badge, Group, Button, Stack } from "@mantine/core";
import Image from "next/image";
import { Building2, Layers, UserPlus } from "lucide-react";

interface JobCardProps {
  logo: string;
  company: string;
  title: string;
  exp: string;
  onsite: boolean;
  lpa: string;
  timeAgo: string;
  description: string[];
}

const JobCard = ({
  logo,
  company,
  title,
  exp,
  onsite,
  lpa,
  timeAgo,
  description,
}: JobCardProps) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group
        styles={{
          root: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12,
          },
        }}
      >
        <div className="rounded-md overflow-hidden w-16 h-16 flex items-center justify-center bg-white shadow-sm">
          <Image
            src={logo}
            alt={company}
            width={40}
            height={40}
            unoptimized
            className="rounded-full"
          />
        </div>
        <Badge
          color="#B0D9FF"
          variant="filled"
          styles={{
            label: { color: "black" },
          }}
          radius="md"
        >
          {timeAgo}
        </Badge>
      </Group>

      {/* Job Title */}
      <Text
        size="lg"
        styles={{
          root: { fontWeight: 600, marginBottom: 6 },
        }}
      >
        {title}
      </Text>

      {/* Job Info */}
      <Group
        styles={{
          root: {
            display: "flex",
            gap: 8,
            marginBottom: 12,
          },
        }}
      >
        <Group
          styles={{
            root: {
              display: "flex",
              gap: 4,
              alignItems: "center",
            },
          }}
        >
          <UserPlus width={16} height={16} />
          <Text size="sm" style={{ color: "#555555" }}>
            {exp} Exp
          </Text>
        </Group>

        <Text size="sm" style={{ color: "#555555" }}>
          |
        </Text>
        <Group
          styles={{
            root: {
              display: "flex",
              gap: 4,
              alignItems: "center",
            },
          }}
        >
          <Building2 width={16} height={16} />
          <Text size="sm" style={{ color: "#555555" }}>
            {onsite ? "Onsite" : "Remote"}
          </Text>
        </Group>
        <Text size="sm" style={{ color: "#555555" }}>
          |
        </Text>
        <Group
          styles={{
            root: {
              display: "flex",
              gap: 4,
              alignItems: "center",
            },
          }}
        >
          <Layers width={16} height={16} />
          <Text size="sm" style={{ color: "#5A5A5A" }}>
            {lpa}
          </Text>
        </Group>
      </Group>

      {/* Description */}
      <Stack
        styles={{
          root: { gap: 2, marginBottom: 12 },
        }}
      >
        {description.map((desc, idx) => (
          <Text size="sm" style={{ color: "#555555" }} key={idx}>
            • {desc}
          </Text>
        ))}
      </Stack>

      {/* Apply Button */}
      <Button fullWidth color="#00AAFF">
        Apply Now
      </Button>
    </Card>
  );
};

export default JobCard;

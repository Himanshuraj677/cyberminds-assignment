// app/not-found.tsx
"use client";

import { Button, Center, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <Center style={{ height: "100vh" }}>
      <Stack align="center" gap="sm">
        <Title order={2}>404 — Page Not Found</Title>
        <Text c="dimmed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Text>
        <Button component={Link} href="/find-jobs" color="blue" radius="md">
          Find Jobs
        </Button>
      </Stack>
    </Center>
  );
}

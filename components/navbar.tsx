"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@mantine/core";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import CreateJobForm from "./jobForm";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/find-jobs", label: "Find Jobs" },
    { href: "/find-talents", label: "Find Talents" },
    { href: "/about-us", label: "About Us" },
    { href: "testimonials", label: "Testimonials" },
  ];


  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  return (
    <header className="w-full py-4 sticky top-0 z-50">
      {/* navbar for mobile devices */}
      <div className="md:hidden flex items-center justify-between px-4">
        <Image src="/assets/logo.svg" alt="logo" width={32} height={32} />
        <button onClick={() => setMobileOpen(!mobileOpen)} className="cursor-pointer">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-4 mt-2 bg-white shadow-md rounded-xl pb-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="block font-semibold py-2">
                {link.label}
              </Link>
            </li>
          ))}
          <Button
            variant="gradient"
            gradient={{ from: "#A128FF", to: "#6100AD", deg: 134 }}
            radius="xl"
            fullWidth
            onClick={openModal}
          >
            Create Jobs
          </Button>
        </ul>
      )}

      {/* navbar for desktop */}
      <div className="hidden md:flex h-16 max-w-3xl mx-auto items-center justify-between  bg-white shadow-md rounded-4xl px-8 py-4 ">
        <Image src="assets/logo.svg" alt="logo" width={40} height={40} />
        <ul className="flex gap-8 p-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="font-semibold">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button
          variant="gradient"
          gradient={{ from: "#A128FF", to: "#6100AD", deg: 134 }}
          radius="xl"
          onClick={openModal}
        >
          Create Jobs
        </Button>
      </div>

      <CreateJobForm
        opened={modalOpened}
        onClose={closeModal}
      />
    </header>
  );
};

export default Navbar;

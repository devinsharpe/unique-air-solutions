import { Menu, Transition } from "@headlessui/react";
import { UilBars, UilSchedule } from "@iconscout/react-unicons";

import { Fragment } from "react";
import { ModalContext } from "../providers/modalStatus";
import NextLink from "next/link";
import React from "react";

const NavMenu = () => (
  <Menu as="div" className="relative inline-block md:hidden">
    <div>
      <Menu.Button className="inline-flex justify-center w-full p-2 transition-colors duration-150 rounded bg-slate-200 hover:bg-slate-300">
        <UilBars />
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 mt-2 overflow-hidden origin-top-right bg-white border rounded shadow-lg border-slate-200 w-36 ring-1 ring-black ring-opacity-5 focus:outline-none ">
        <Menu.Item>
          <button className="flex items-center w-full p-2 text-sm hover:bg-sky-600 hover:text-white">
            About
          </button>
        </Menu.Item>
        <Menu.Item>
          <button className="flex items-center w-full p-2 text-sm hover:bg-sky-600 hover:text-white">
            Services
          </button>
        </Menu.Item>
        <Menu.Item>
          <button className="flex items-center w-full p-2 text-sm hover:bg-sky-600 hover:text-white">
            Contact
          </button>
        </Menu.Item>
      </Menu.Items>
    </Transition>
  </Menu>
);

const Navbar = () => {
  const { toggle } = React.useContext(ModalContext);

  return (
    <nav className="container fixed top-0 left-0 right-0 z-50 flex justify-between w-full p-4 mx-auto bg-slate-50/75 backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <NextLink
          href="/"
          className="text-xl font-semibold md:text-2xl text-slate-800"
        >
          UNIQUE AIR
        </NextLink>

        <div className="items-center hidden space-x-2 md:flex">
          <a
            href="#"
            className="px-3 py-1 rounded text-slate-600 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-slate-100"
          >
            About
          </a>
          <a
            href="#"
            className="px-3 py-1 rounded text-slate-600 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-slate-100"
          >
            Services
          </a>
          <button
            className="px-3 py-1 rounded text-slate-600 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-slate-100"
            onClick={() => toggle("contact")}
          >
            Contact
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="flex items-center px-4 py-2 space-x-3 text-sm text-white rounded md:text-md bg-sky-600"
          onClick={() => toggle("schedule")}
        >
          <UilSchedule />
          <span>Schedule a Visit</span>
        </button>
        <NavMenu />
      </div>
    </nav>
  );
};

export default Navbar;

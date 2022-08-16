import React, { Component } from "react";

import ContactModal from "../components/modals/contact";
import Head from "next/head";
import ModalStatusProvider from "../providers/modalStatus";
import Navbar from "../components/Navbar";
import ScheduleModal from "../components/modals/schedule";

const index: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Unique Air Solutions</title>
        <link
          rel="shortcut icon"
          href="https://devsharpe.io/api/favicon?emoji=❄️"
          type="image/x-icon"
        />
      </Head>
      <ModalStatusProvider>
        <Navbar />
        {children}
        <ScheduleModal modalKey="schedule" />
        <ContactModal modalKey="contact" />
      </ModalStatusProvider>
    </>
  );
};

export default index;

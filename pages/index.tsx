import { UilMapMarker } from "@iconscout/react-unicons";
import type { GetServerSideProps, NextPage } from "next";

import Image from "next/image";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <main className="container mx-auto">
        <div className="flex flex-col items-center justify-center p-4 mt-24 space-y-4">
          <h2 className="max-w-2xl text-2xl font-bold text-center md:text-4xl text-slate-800">
            Trust Your HVAC System to Keep You Cool in the Summer, and Warm in
            the Winter
          </h2>
          <h3 className="max-w-3xl text-sm text-center md:text-lg text-slate-500">
            With over 20 years of experience, and passion for serving our
            community, we are dedicated to providing the best service possible
          </h3>
          <div className="flex items-center justify-center px-4 py-2 space-x-3 text-white rounded bg-slate-700">
            <UilMapMarker />
            <span>West Metro Atlanta, GA</span>
          </div>
        </div>
        <div className="relative w-full">
          <div className="absolute inset-0 pattern-bg" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-slate-50" />
          <div className="relative z-10 w-full h-full px-4 pt-16 pb-24">
            <div className="max-w-lg p-4 mx-auto text-center bg-white rounded shadow-lg">
              <p className="text-lg font-medium text-slate-800">
                We service, sell, and install all major HVAC brands, and offer
                our best pricing and warranties on Rheem and HEIL systems
              </p>
            </div>
            <div className="grid w-full max-w-lg grid-cols-2 gap-4 mx-auto mt-6">
              <div className="flex items-center justify-center bg-white rounded shadow-lg">
                <Image
                  src="/images/heil-ac.png"
                  alt="HEIL AC System"
                  height={200}
                  width={200}
                  className="w-32 h-32 mx-auto"
                />
              </div>
              <div className="flex items-center justify-center bg-white rounded shadow-lg">
                <Image
                  src="/images/rheem-ac.png"
                  alt="HEIL AC System"
                  height={150}
                  width={150}
                  className="w-24 h-24 mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-3xl mx-auto">
          <h4 className="text-4xl font-semibold text-center text-slate-800">
            To Us, Service is Everything
          </h4>
        </div>
      </main>
    </>
  );
};

export default Home;

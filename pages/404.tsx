import NextLink from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div className="absolute inset-0 pattern-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-slate-50" />
      <div className="relative z-20 p-8 space-y-2 bg-white shadow-lg rounded-xl w-72">
        <h2 className="text-2xl font-bold text-slate-500">Oops!</h2>
        <h3>
          The page you were looking for doesn&apos;t existed, or it has been
          moved.
        </h3>
        <NextLink href="/" passHref>
          <a className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
            Return to Home
          </a>
        </NextLink>
      </div>
      <h4 className="fixed text-5xl font-bold opacity-75 text-slate-400 left-8 bottom-8">
        404
      </h4>
    </main>
  );
};

export default ErrorPage;

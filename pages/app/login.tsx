import React, { ReactElement } from "react";

import AppLayout from "../../layouts/app";

const Login = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      Hello world
    </div>
  );
};

Login.getLayout = function (page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Login;

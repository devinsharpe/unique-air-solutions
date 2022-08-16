import React from "react";

const app: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <div>
      <p>Hello world (Layout)</p>
      {children}
    </div>
  );
};

export default app;

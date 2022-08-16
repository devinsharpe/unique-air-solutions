import React from "react";

const ModalContext = React.createContext<{
  status: { [key: string]: boolean };
  toggle: (key: string) => void;
  set: (key: string, val: boolean) => void;
}>({} as any);

const ModalStatusProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [status, setStatus] = React.useState<{ [key: string]: boolean }>({
    contact: false,
    schedule: false
  });

  const resetStatus = React.useCallback(() => {
    const cpy = { ...status };
    Object.keys(cpy).forEach((k) => (cpy[k] = false));
    return cpy;
  }, [status]);

  const toggle = React.useCallback(
    (key: string) => {
      setStatus({ ...resetStatus(), [key]: !status[key] });
    },
    [status, resetStatus]
  );

  const set = React.useCallback(
    (key: string, val: boolean) => {
      setStatus({ ...resetStatus(), [key]: val });
    },
    [resetStatus]
  );

  return (
    <ModalContext.Provider value={{ status, toggle, set }}>
      <>{children}</>
    </ModalContext.Provider>
  );
};

export default ModalStatusProvider;

export { ModalContext };

import { PropsWithChildren, useEffect, useState } from "react";

function PublicProvider({ children }: PropsWithChildren) {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      window.location.href = "/";
    } else {
      setShow(true);
    }
  }, [token]);

  if (show) {
    return children;
  }

  return <></>;
}

export default PublicProvider;

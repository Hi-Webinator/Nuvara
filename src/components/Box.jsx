import { useState } from "react";

import { activate } from "../utils/interactive";

const Box = ({ icon, title }) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`box pt-3 pb-3 ${active ? "active" : ""}`}
      aria-pressed={active}
      aria-label={title}
      {...activate(() => setActive((prev) => !prev))}
    >
      <span className="icon fs-1 fw-lighter mb-2">{icon}</span>
      <span className="title fw-bold text-capitalize">{title}</span>
    </div>
  );
};

export default Box;

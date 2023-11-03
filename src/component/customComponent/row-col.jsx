import React from "react";

const Col = ({ md, children }) => {
  const colClass = `col ${md ? `md:col-${md}` : ""}`;

  return <div className={colClass}>{children}</div>;
};

const Row = ({ children }) => {
  return <div className="grid flex ">{children}</div>;
};

export { Row, Col };

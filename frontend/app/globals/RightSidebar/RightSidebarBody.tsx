import React from "react";

interface Props {
  children: React.ReactNode;
}
const RightSidebarBody = ({ children }: Props) => {
  return (
    <div className="bg-white p-6  shadow-md invms_panel_heading relative">
      <div>{children}</div>
    </div>
  );
};

export default RightSidebarBody;

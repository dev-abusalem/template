import DashboardMain from "./components/Dashboard/DashboardMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - INVMS",
  description: "Investment Management Software",
};


export default function Home() {
  return (
    <>
      <DashboardMain />
    </>
  );
}

import LeftSider from "@/components/LeftSider";
import RightSider from "@/components/RightSider";

export default function Home() {
  return (
    <div className="flex">
      <LeftSider />
      <RightSider />
    </div>
  );
}

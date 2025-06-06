import DashboardTable from "@/component/Dashboard/DashboardTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const DashboardPage = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex justify-between items-center py-2">
          <p className="text-2xl font-semibold">Dashboard</p>
          <div>
            <Button variant={"outline"} size={"sm"} className="px-4">
              <PlusIcon /> Create Whiteboard
            </Button>
          </div>
        </div>
        <DashboardTable />
      </div>
    </section>
  );
};

export default DashboardPage;

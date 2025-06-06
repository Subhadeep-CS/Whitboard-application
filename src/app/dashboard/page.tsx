import CreateDesignModal from "@/component/Dashboard/CreateDesignModal";
import DashboardTable from "@/component/Dashboard/DashboardTable";

const DashboardPage = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex justify-between items-center py-2">
          <p className="text-2xl font-semibold">Dashboard</p>
          <div>
            <CreateDesignModal />
          </div>
        </div>
        <DashboardTable />
      </div>
    </section>
  );
};

export default DashboardPage;

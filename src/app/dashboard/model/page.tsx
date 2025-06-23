import { DashboardHeader } from "@/src/components/dashboard-header";
import { ModelList } from "@/src/components/model-list";
import { AddModel } from "@/src/components/add-model";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader heading="Models" text="Manage your service models">
        <AddModel />
      </DashboardHeader>
      <div className="flex-1 p-4 md:p-8 pt-6">
        <ModelList />
      </div>
    </div>
  );
}

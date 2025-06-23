import { DashboardHeader } from "@/src/components/dashboard-header";
import { CategoriesList } from "@/src/components/categories-list";
import { AddMake } from "@/src/components/add-make";
import { MakeList } from "@/src/components/make-list";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        heading="Makes"
        text="Manage your service makes"
      >
        <AddMake />
      </DashboardHeader>
      <div className="flex-1 p-4 md:p-8 pt-6">
        <MakeList />
      </div>
    </div>
  );
}

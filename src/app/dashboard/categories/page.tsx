import { DashboardHeader } from "@/src/components/dashboard-header";
import { CategoriesList } from "@/src/components/categories-list";
import { AddCategoryButton } from "@/src/components/add-category-button";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        heading="Categories"
        text="Manage your service categories"
      >
        <AddCategoryButton />
      </DashboardHeader>
      <div className="flex-1 p-4 md:p-8 pt-6">
        <CategoriesList />
      </div>
    </div>
  );
}

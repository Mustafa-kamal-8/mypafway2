import { DashboardHeader } from "@/src/components/dashboard-header";
import { SubcategoriesList } from "@/src/components/subcategories-list";
import { AddSubcategoryButton } from "@/src/components/add-subcategory-button";

export default function SubcategoriesPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        heading="Subcategories"
        text="Manage your service subcategories"
      >
        <AddSubcategoryButton />
      </DashboardHeader>
      <div className="flex-1 p-4 md:p-8 pt-6">
        <SubcategoriesList />
      </div>
    </div>
  );
}

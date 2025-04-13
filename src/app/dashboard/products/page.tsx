import { DashboardHeader } from "@/src/components/dashboard-header";
import { ProductsList } from "@/src/components/products-list";
import { AddProductButton } from "@/src/components/add-product-button";

export default function ProductsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader heading="Products" text="Manage your products">
        <AddProductButton />
      </DashboardHeader>
      <div className="flex-1 p-4 md:p-8 pt-6">
        <ProductsList />
      </div>
    </div>
  );
}

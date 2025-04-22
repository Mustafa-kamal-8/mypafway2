"use client";

import { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import { Dialog } from "@headlessui/react";
import { DashboardHeader } from "@/src/components/dashboard-header";
import { ProductsList } from "@/src/components/products-list";
import { AddProductButton } from "@/src/components/add-product-button";
import { uploadProducts } from "../../../api/products";
import { getCategories } from "@/src/api/categories";

export interface CsvProduct {
  PROGRAM_NAME: string;
  PROGRAM_URL: string;
  CATALOG_NAME: string;
  PRICE: string;
  IMAGE_LINK: string;
  TITLE: string;
  DESCRIPTION: string;
  LINK: string;
  IMPRESSION_URL: string;
  MOBILE_LINK: string;
  ADDITIONAL_IMAGE_LINK: string;
  AVAILABILITY: string;
  AVAILABILITY_DATE: string;
  SALE_PRICE: string;
  PRODUCT_TYPE: string;
  EXPIRATION_DATE: string;
  BRAND: string;
  CONDITION: string;
  SHIPPING_LABEL: string;
  SHIPPING_WEIGHT: string;
}

interface categories {
  id: number;
  name: string;
  image: string;
}

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [csvProducts, setCsvProducts] = useState<CsvProduct[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
    const [categories, setCategories] = useState<categories[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setError("No file selected.");
      return;
    }

    if (!file.name.endsWith(".csv")) {
      setError("Please upload a valid .csv file.");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: { data: CsvProduct[] }) => {
        const data = results.data.filter((row) => {
          return (
            row.PROGRAM_NAME &&
            row.PROGRAM_URL &&
            row.CATALOG_NAME &&
            row.PRICE &&
            row.ADDITIONAL_IMAGE_LINK &&
            row.AVAILABILITY &&
            // row.AVAILABILITY_DATE
            row.BRAND &&
            row.CONDITION &&
            row.IMAGE_LINK
          );
        });

        if (data.length === 0) {
          setError("No valid data found in the CSV.");
        } else {
          setCsvProducts(data);
          setError(null);
        }
      },
      error: (err: { message: any }) => {
        console.error("CSV parse error:", err);
        setError(`Failed to parse CSV: ${err.message}`);
      },
    });
  };


  const handleUpload = async () => {
    if (csvProducts.length === 0) {
      setError("No data to upload.");
      return;
    }

    try {
      // Validate and map data
      const validatedProducts = csvProducts.map((item, index) => {
        if (!item.PROGRAM_NAME || !item.PROGRAM_URL || !item.CATALOG_NAME) {
          throw new Error(
            `Missing required fields in product data at row ${index + 1}`
          );
        }

        return {
          program_name: item.PROGRAM_NAME,
          program_url: item.PROGRAM_URL,
          catalog_name: item.CATALOG_NAME,
          price: item.PRICE?.replace(/[^0-9.]/g, "") || null,
          // impression_url: item.IMPRESSION_URL,
          // image_link: item.IMAGE_LINK,
          // description: item.DESCRIPTION,
          // link: item.LINK,
          // title: item.TITLE,
          // mobile_link: item.MOBILE_LINK,
          // additional_image_link: item.ADDITIONAL_IMAGE_LINK,
          availability: item.AVAILABILITY,
          // availability_date: item.AVAILABILITY_DATE,
          // expiration_date: item.EXPIRATION_DATE,
          // sale_price: item.SALE_PRICE,
          // product_type: item.PRODUCT_TYPE,
          brand: item.BRAND,
          condition: item.CONDITION,
          // shipping_label: item.SHIPPING_LABEL,
          // shipping_weight: item.SHIPPING_WEIGHT,
        };
      });

      console.log("✅ Validated products to upload:", validatedProducts);

      setLoading(true);
      setMessage("");

      const productsToSend = Array.isArray(validatedProducts)
        ? validatedProducts
        : [validatedProducts];

      console.log("📦 Uploading this to backend:", productsToSend);

      await uploadProducts(productsToSend);

      setMessage("✅ Products uploaded successfully!");
      setCsvProducts([]);
      fileInputRef.current!.value = "";
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setMessage("❌ Upload failed. Please check the file and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader heading="Products" text="Manage your products">
        <div className="flex gap-2">
          <AddProductButton />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Upload CSV
          </button>
        </div>
      </DashboardHeader>

      <div className="flex-1 p-4 md:p-8 pt-6">
        <ProductsList />

        {csvProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Imported Products</h2>
            <ul className="space-y-2">
              {csvProducts.slice(0, 10).map((product, idx) => (
                <li key={idx} className="p-2 border rounded bg-gray-50">
                  <strong>{product.PROGRAM_NAME}</strong> —{" "}
                  {product.PROGRAM_URL} / {product.CATALOG_NAME} /{" "}
                  {product.PRICE}
                </li>
              ))}
            </ul>
            <pre className="mt-4 p-2 bg-gray-100 rounded text-sm max-h-64 overflow-auto">
              {JSON.stringify(csvProducts.slice(0, 2), null, 2)}
            </pre>
          </div>
        )}

        {message && (
          <p
            className={`mt-4 font-medium ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* CSV Upload Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCsvProducts([]); // Reset CSV data when closing modal
          setError(null);
          setMessage("");
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      >
        <Dialog.Panel className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Upload CSV
          </Dialog.Title>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full mb-4 text-sm text-gray-700"
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {csvProducts.length > 0 && (
            <pre className="text-xs max-h-40 overflow-auto bg-gray-50 p-2 border mt-2 rounded">
              {JSON.stringify(csvProducts.slice(0, 2), null, 2)}
            </pre>
          )}
          {message && (
            <p
              className={`mt-2 text-sm font-medium ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={loading || csvProducts.length === 0}
              className={`px-4 py-2 text-sm text-white rounded ${
                loading || csvProducts.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}

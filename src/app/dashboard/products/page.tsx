"use client";

import type React from "react";

import { useState, useRef } from "react";
import Papa from "papaparse";
import { Dialog } from "@headlessui/react";
import { DashboardHeader } from "@/src/components/dashboard-header";
import { ProductsList } from "@/src/components/products-list";
import { ProductFormButton } from "@/src/components/add-product-button";
import { uploadProducts } from "@/src/api/products";
import { debounce } from "@/src/lib/utils";

export interface CsvProduct {
  [key: string]: string;
}

interface categories {
  id: number;
  name: string;
  image: string;
}

// Database field names
const DB_FIELDS = [
  "name",
  "description",
  "color",
  "category",
  "sub_category",
  "details",
  "make",
  "model",
  "year",
  "price",
  "quantity",
  "image_url",
  "website_url",
];

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [csvProducts, setCsvProducts] = useState<CsvProduct[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>(
    {}
  );
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mappingStep, setMappingStep] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<categories[]>([]);

  // Reset all states when modal is closed
  const resetStates = () => {
    setCsvProducts([]);
    setCsvHeaders([]);
    setColumnMapping({});
    setError(null);
    setMessage("");
    setMappingStep(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
      complete: (results: {
        data: CsvProduct[];
        meta: { fields: string[] };
      }) => {
        setCsvProducts(results.data);
        setCsvHeaders(results.meta.fields);

        // Create initial mapping suggestions based on similar field names
        const initialMapping: Record<string, string> = {};
        results.meta.fields.forEach((header) => {
          const lowerHeader = header.toLowerCase();
          // Try to find matching database field
          const matchedField = DB_FIELDS.find(
            (field) =>
              lowerHeader === field.toLowerCase() ||
              lowerHeader.includes(field.toLowerCase())
          );
          if (matchedField) {
            initialMapping[header] = matchedField;
          }
        });

        setColumnMapping(initialMapping);
        setMappingStep(true);
        setError(null);
        console.log(
          `Loaded ${
            results.data.length
          } rows from CSV with headers: ${results.meta.fields.join(", ")}`
        );
      },
      error: (err: { message: any }) => {
        console.error("CSV parse error:", err);
        setError(`Failed to parse CSV: ${err.message}`);
      },
    });
  };

  const handleMappingChange = (csvHeader: string, dbField: string) => {
    setColumnMapping((prev) => ({
      ...prev,
      [csvHeader]: dbField,
    }));
  };

  const handleUpload = async () => {
    if (csvProducts.length === 0) {
      setError("No data to upload.");
      return;
    }

    try {
      setLoading(true);
      setMessage("Starting batch upload...");

      // Format all products using the column mapping
      const formattedProducts = csvProducts.map((item) => {
        const formattedProduct: Record<string, string> = {};

        // Apply the mapping
        Object.entries(columnMapping).forEach(([csvHeader, dbField]) => {
          if (dbField && item[csvHeader] !== undefined) {
            formattedProduct[dbField] = item[csvHeader] || "";
          }
        });

        return formattedProduct;
      });

      const batchSize = 1000;
      const totalBatches = Math.ceil(formattedProducts.length / batchSize);

      console.log(
        `Starting upload of ${formattedProducts.length} products in ${totalBatches} batches`
      );

      for (let i = 0; i < formattedProducts.length; i += batchSize) {
        const batch = formattedProducts.slice(i, i + batchSize);
        const currentBatch = Math.floor(i / batchSize) + 1;

        setMessage(
          `Uploading batch ${currentBatch}/${totalBatches} (${batch.length} products)...`
        );
        console.log(
          `Uploading batch ${currentBatch}/${totalBatches} with ${batch.length} products`
        );

        await uploadProducts(batch);

        setMessage(
          `Completed batch ${currentBatch}/${totalBatches}. Continuing...`
        );
      }

      setMessage(
        `✅ All ${formattedProducts.length} products uploaded successfully in ${totalBatches} batches!`
      );
      resetStates();
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setMessage(
        `❌ Upload failed. Error: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader heading="Products" text="Manage your products">
        <div className="flex gap-2">
          {/* <ProductFormButton /> */}
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
          resetStates();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      >
        <Dialog.Panel className="bg-white p-6 rounded-md shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-lg font-semibold mb-4">
            {mappingStep ? "Map CSV Columns to Database Fields" : "Upload CSV"}
          </Dialog.Title>

          {!mappingStep ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="block w-full mb-4 text-sm text-gray-700"
              />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Match your CSV columns with the database fields. This ensures
                your data is correctly imported.
              </p>

              <div className="border rounded-md overflow-hidden mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-500">
                        CSV Column
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-500">
                        Database Field
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {csvHeaders.map((header) => (
                      <tr key={header} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{header}</td>
                        <td className="px-4 py-2">
                          <select
                            value={columnMapping[header] || ""}
                            onChange={(e) =>
                              handleMappingChange(header, e.target.value)
                            }
                            className="w-full border rounded px-2 py-1 text-sm"
                          >
                            <option value="">-- Not mapped --</option>
                            {DB_FIELDS.map((field) => (
                              <option key={field} value={field}>
                                {field}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {csvProducts.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">
                    Preview ({csvProducts.length} total rows)
                  </h3>
                  <div className="border rounded-md overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50">
                        <tr>
                          {csvHeaders.map((header) => (
                            <th
                              key={header}
                              className="px-2 py-1 text-left font-medium text-gray-500"
                            >
                              {header}
                              {columnMapping[header] && (
                                <span className="block text-xs text-green-600">
                                  → {columnMapping[header]}
                                </span>
                              )}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {csvProducts.slice(0, 3).map((row, idx) => (
                          <tr key={idx}>
                            {csvHeaders.map((header) => (
                              <td
                                key={`${idx}-${header}`}
                                className="px-2 py-1 truncate max-w-[150px]"
                              >
                                {row[header] || "-"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
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
              onClick={() => {
                setIsModalOpen(false);
                resetStates();
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>

            {mappingStep && (
              <button
                onClick={() => setMappingStep(false)}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
              >
                Back
              </button>
            )}

            {mappingStep ? (
              <button
                onClick={handleUpload}
                disabled={loading || Object.keys(columnMapping).length === 0}
                className={`px-4 py-2 text-sm text-white rounded ${
                  loading || Object.keys(columnMapping).length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading
                  ? "Processing Batches..."
                  : `Upload All (${csvProducts.length} products)`}
              </button>
            ) : (
              <button
                onClick={handleFileChange}
                disabled={!fileInputRef.current?.files?.length}
                className={`px-4 py-2 text-sm text-white rounded ${
                  !fileInputRef.current?.files?.length
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Continue
              </button>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}

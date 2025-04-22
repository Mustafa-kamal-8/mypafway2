"use client";

import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { Dialog } from "@headlessui/react";

export interface CsvProduct {
  PROGRAM_NAME: string;
  PROGRAM_URL: string;
  CATALOG_NAME: string;
}

export interface CsvUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: CsvProduct[]) => void;
}

export const CsvUploadModal: React.FC<CsvUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setError("No file selected.");
      return;
    }

    if (!file.name.endsWith(".csv")) {
      setError("Please upload a .csv file.");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data as any[];

        const cleanedData: CsvProduct[] = parsed
          .map((item) => ({
            PROGRAM_NAME: item.PROGRAM_NAME?.trim(),
            PROGRAM_URL: item.PROGRAM_URL?.trim(),
            CATALOG_NAME: item.CATALOG_NAME?.trim(),
          }))
          .filter(
            (item) =>
              item.PROGRAM_NAME &&
              item.PROGRAM_URL &&
              item.CATALOG_NAME &&
              Object.keys(item).length === 3
          );

        if (!Array.isArray(cleanedData) || cleanedData.length === 0) {
          setError("No valid rows found in CSV.");
          return;
        }

        // Only send required keys
        const finalData = cleanedData.map((item) => ({
          PROGRAM_NAME: item.PROGRAM_NAME,
          PROGRAM_URL: item.PROGRAM_URL,
          CATALOG_NAME: item.CATALOG_NAME,
        }));

        console.log("Uploading cleaned data:", finalData);
        onUpload(finalData); // Send clean array to parent
        onClose();
      },
      error: (error) => {
        setError(`Error parsing CSV: ${error.message}`);
      },
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <Dialog.Title className="text-lg font-medium mb-4">
            Upload CSV File
          </Dialog.Title>
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            onChange={handleFileChange}
            className="mb-4"
          />
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

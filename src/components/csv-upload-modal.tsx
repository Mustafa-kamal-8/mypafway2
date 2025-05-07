"use client";

import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { Dialog } from "@headlessui/react";

export interface CsvProduct {
  PROGRAM_NAME: string;
  PROGRAM_URL: string;
  TITLE: string;
  DESCRIPTION: string;
  LINK: string;
  IMAGE_LINK: string;
  MOBILE_LINK: string;
  AVAILABILITY: string;
  AVAILABILITY_DATE: string;
  EXPIRATION_DATE: string;
  PRICE: string;
  PRODUCT_TYPE: string;
  BRAND: string;
  CONDITION: string;
  COLOR: string;
  SHIPPING_LABEL: string;
  SHIPPING_WEIGHT: string;
  SHIPPING_LENGTH: string;
  SHIPPING_WIDTH: string;
  SHIPPING_HEIGHT: string;
  PRODUCT_LENGTH: string;
  PRODUCT_WIDTH: string;
  PRODUCT_HEIGHT: string;
  PRODUCT_WEIGHT: string;
  PRODUCT_DETAIL: string;
  YEAR: string;
  CATEGORY: string;
  SUB_CATEGORY: string;
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
      complete: (results: { data: any[] }) => {
        const parsed = results.data as any[];

        const cleanedData: CsvProduct[] = parsed
          .map((item) => ({
            PROGRAM_NAME: item.PROGRAM_NAME?.trim() || "",
            PROGRAM_URL: item.PROGRAM_URL?.trim() || "",
            TITLE: item.TITLE?.trim() || "",
            DESCRIPTION: item.DESCRIPTION?.trim() || "",
            LINK: item.LINK?.trim() || "",
            IMAGE_LINK: item.IMAGE_LINK?.trim() || "",
            MOBILE_LINK: item.MOBILE_LINK?.trim() || "",
            AVAILABILITY: item.AVAILABILITY?.trim() || "",
            AVAILABILITY_DATE: item.AVAILABILITY_DATE?.trim() || "",
            EXPIRATION_DATE: item.EXPIRATION_DATE?.trim() || "",
            PRICE: item.PRICE?.trim() || "",
            PRODUCT_TYPE: item.PRODUCT_TYPE?.trim() || "",
            BRAND: item.BRAND?.trim() || "",
            CONDITION: item.CONDITION?.trim() || "",
            COLOR: item.COLOR?.trim() || "",
            SHIPPING_LABEL: item.SHIPPING_LABEL?.trim() || "",
            SHIPPING_WEIGHT: item.SHIPPING_WEIGHT?.trim() || "",
            SHIPPING_LENGTH: item.SHIPPING_LENGTH?.trim() || "",
            SHIPPING_WIDTH: item.SHIPPING_WIDTH?.trim() || "",
            SHIPPING_HEIGHT: item.SHIPPING_HEIGHT?.trim() || "",
            PRODUCT_LENGTH: item.PRODUCT_LENGTH?.trim() || "",
            PRODUCT_WIDTH: item.PRODUCT_WIDTH?.trim() || "",
            PRODUCT_HEIGHT: item.PRODUCT_HEIGHT?.trim() || "",
            PRODUCT_WEIGHT: item.PRODUCT_WEIGHT?.trim() || "",
            PRODUCT_DETAIL: item.PRODUCT_DETAIL?.trim() || "",
            YEAR: item.YEAR?.trim() || "",
            CATEGORY: item.CATEGORY?.trim() || "",
            SUB_CATEGORY: item.SUB_CATEGORY?.trim() || "",
          }))
          .filter(
            (item) =>
              item.PROGRAM_NAME &&
              item.PROGRAM_URL &&
              item.TITLE &&
              item.DESCRIPTION &&
              item.LINK &&
              item.IMAGE_LINK &&
              item.MOBILE_LINK &&
              item.AVAILABILITY &&
              item.AVAILABILITY_DATE &&
              item.EXPIRATION_DATE &&
              item.PRICE &&
              item.PRODUCT_TYPE &&
              item.BRAND &&
              item.CONDITION &&
              item.COLOR &&
              item.SHIPPING_LABEL &&
              item.SHIPPING_WEIGHT &&
              item.SHIPPING_LENGTH &&
              item.SHIPPING_WIDTH &&
              item.SHIPPING_HEIGHT &&
              item.PRODUCT_LENGTH &&
              item.PRODUCT_WIDTH &&
              item.PRODUCT_HEIGHT &&
              item.PRODUCT_WEIGHT &&
              item.PRODUCT_DETAIL &&
              item.YEAR &&
              item.CATEGORY &&
              item.SUB_CATEGORY &&
              Object.keys(item).length === 28
          );

        if (!Array.isArray(cleanedData) || cleanedData.length === 0) {
          setError("No valid rows found in CSV.");
          return;
        }

        // Only send required keys
        const finalData = cleanedData.map((item) => ({
          program_name: item.PROGRAM_NAME,
          program_url: item.PROGRAM_URL,
          title: item.TITLE,
          description: item.DESCRIPTION,
          link: item.LINK,
          image_link: item.IMAGE_LINK,
          mobile_link: item.MOBILE_LINK,
          availability: item.AVAILABILITY,
          availability_date: item.AVAILABILITY_DATE,
          expiration_date: item.EXPIRATION_DATE,
          price: item.PRICE,
          product_type: item.PRODUCT_TYPE,
          brand: item.BRAND,
          condition: item.CONDITION,
          color: item.COLOR,
          shipping_label: item.SHIPPING_LABEL,
          shipping_weight: item.SHIPPING_WEIGHT,
          shipping_length: item.SHIPPING_LENGTH,
          shipping_width: item.SHIPPING_WIDTH,
          shipping_height: item.SHIPPING_HEIGHT,
          product_length: item.PRODUCT_LENGTH,
          product_width: item.PRODUCT_WIDTH,
          product_height: item.PRODUCT_HEIGHT,
          product_weight: item.PRODUCT_WEIGHT,
          product_detail: item.PRODUCT_DETAIL,
          year: item.YEAR,
          category: item.CATEGORY,
          sub_category: item.SUB_CATEGORY,
        }));

        console.log("Uploading cleaned data:", finalData);
        onUpload(finalData); // Send clean array to parent
        onClose();
      },
      error: (error: { message: any }) => {
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

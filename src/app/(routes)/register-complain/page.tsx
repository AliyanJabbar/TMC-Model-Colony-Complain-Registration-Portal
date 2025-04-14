"use client";

import Button from "@/components/myUi/button";
import ComplainBlock from "@/components/myUi/complainTypeBlock";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaDog,
  FaTrash,
  FaLightbulb,
  FaTree,
  FaWater,
  FaRoad,
  FaBroom,
  FaTint,
  FaBug,
  FaHome,
  FaTools,
  FaFaucet,
} from "react-icons/fa";
import { useTranslation } from "../../../context/translationContext";

export default function RegComplain() {
  const [selectedComplainType, setSelectedComplainType] = useState("");
  const router = useRouter();
  const { translate: t } = useTranslation();

  //handling proceed
  const handleProceed = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedComplainType) {
      toast.error(t("complaintCategories.selectDepartmentError"));
      return;
    }
    // Proceed with navigation
    router.push(`/details?complainType=${selectedComplainType}`);
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          <span className="text-greenish">
            {t("complaintCategories.departmentHeading")}
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t("complaintCategories.departmentDescription")}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <ComplainBlock
          icon={FaDog}
          heading={t("complaintCategories.againstDogs")}
          value="against-dogs"
          selectedValue={selectedComplainType}
          onSelect={setSelectedComplainType}
        />

        <ComplainBlock
          icon={FaTrash}
          heading={t("complaintCategories.garbageCollection")}
          value="garbage"
          selectedValue={selectedComplainType}
          onSelect={setSelectedComplainType}
        />

        <ComplainBlock
          icon={FaLightbulb}
          heading={t("complaintCategories.streetLights")}
          value="street-lights"
          selectedValue={selectedComplainType}
          onSelect={setSelectedComplainType}
        />

        <ComplainBlock
          icon={FaHome}
          heading={t("complaintCategories.antiEncroachment")}
          value="anti-encroachment"
          selectedValue={selectedComplainType}
          onSelect={setSelectedComplainType}
        />

        <ComplainBlock
          icon={FaBug}
          heading={t("complaintCategories.dangueSpray")}
          value="dangue-spray"
          selectedValue={selectedComplainType}
          onSelect={setSelectedComplainType}
        />

        <ComplainBlock
          icon={FaTree}
          heading={t("complaintCategories.parks")}
          value="parks"
          selectedValue={selectedComplainType}
          onSelect={setSelectedComplainType}
        />

        <ComplainBlock
          icon={FaWater}
          heading={t("complaintCategories.rainWater")}
          value="rain-water"
          selectedValue={selectedComplainType}
          onSelect={setSelectedComplainType}
        />

        <ComplainBlock
          icon={FaTint}
          heading={t("complaintCategories.sewerage")}
          value="sewerage"
          selectedValue={selectedComplainType}
          onSelect={setSelectedComplainType}
        />

        <ComplainBlock
          icon={FaRoad}
          heading={t("complaintCategories.roadCutting")}
          value="road-cutting"
          selectedValue={selectedComplainType}
          onSelect={setSelectedComplainType}
        />

        <ComplainBlock
          icon={FaTools}
          heading={t("complaintCategories.roadRepair")}
          value="repair-road"
          selectedValue={selectedComplainType}
          onSelect={setSelectedComplainType}
        />

        <ComplainBlock
          icon={FaBroom}
          heading={t("complaintCategories.sweeping")}
          value="sweeping"
          selectedValue={selectedComplainType}
          onSelect={setSelectedComplainType}
        />

        <ComplainBlock
          icon={FaFaucet}
          heading={t("complaintCategories.water")}
          value="water"
          selectedValue={selectedComplainType}
          onSelect={setSelectedComplainType}
        />
      </div>

      <div
        className="flex justify-center h-[60px] border-none outline-none mx-auto"
        onClick={handleProceed}
      >
        <Button text={t("complaintCategories.proceedButton")} />
      </div>
    </div>
  );
}

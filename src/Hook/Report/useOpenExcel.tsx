import { useState } from "react";
import { report } from "../../Util/axios";

const useOpenExcel = () => {
  const openExcel = async (startDate, endDate, url, reportName) => {
    try {
      const formattedStartDate = startDate
        ? `${startDate.getDate().toString().padStart(2, "0")}-${(
            startDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${startDate.getFullYear()}`
        : null;
      const formattedEndDate = endDate
        ? `${endDate.getDate().toString().padStart(2, "0")}-${(
            endDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${endDate.getFullYear()}`
        : null;

      console.log(
        "formattedStartDate",
        formattedStartDate,
        "formattedEndDate",
        formattedEndDate
      );

      if (!formattedStartDate || !formattedEndDate) {
        console.error("Las fechas no son válidas");
        return;
      }

      const response = await report.post(
        url,
        {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const fileUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", `${reportName}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al cargar los datos del informe", error);
    }
  };

  return { openExcel };
};

export default useOpenExcel;

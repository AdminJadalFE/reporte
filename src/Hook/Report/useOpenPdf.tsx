import { useState } from 'react';
import axios from 'axios';
import { report } from "../../Util/axios";
const useOpenPdf = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openPdf = async (startDate, endDate, url, fileName) => {
    try {
      setLoading(true);
      const formattedStartDate = startDate
        ? `${startDate.getDate().toString().padStart(2, '0')}-${(
            startDate.getMonth() + 1
          )
              .toString()
              .padStart(2, '0')}-${startDate.getFullYear()}`
        : null;
      const formattedEndDate = endDate
        ? `${endDate.getDate().toString().padStart(2, '0')}-${(
            endDate.getMonth() + 1
          )
              .toString()
              .padStart(2, '0')}-${endDate.getFullYear()}`
        : null;

      console.log('startDate', startDate, 'endDate', endDate);
      console.log(
        'formattedStartDate',
        formattedStartDate,
        'formattedEndDate',
        formattedEndDate
      );

      if (!formattedStartDate || !formattedEndDate) {
        console.error('Las fechas no son válidas');
        setError('Las fechas no son válidas');
        return;
      }

      const response = await report.post(
        url,
        {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
        {
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(blob);

      const fileTitle = `${fileName}-${new Date()
        .toLocaleDateString('en-CA')
        .split('/')
        .join('-')}-${new Date()
        .toLocaleTimeString('en-GB', { hour12: false })
        .replace(/:/g, '-')}.pdf`;

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', fileTitle);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLoading(false);
    } catch (error) {
      console.error('Error al cargar el PDF', error);
      setError('Error al cargar el PDF');
      setLoading(false);
    }
  };

  return { openPdf, loading, error };
};

export default useOpenPdf;

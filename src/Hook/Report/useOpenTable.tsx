import { useState } from 'react';

const useOpenTable = (startDate, endDate, company, report, url) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openTable = async () => {
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
        setError(() => 'Las fechas no son válidas'); 
        return;
      }

      const response = await report.post(url, {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        company: company
      });

      console.log(response.data);
      setReportData(response.data);
    } catch (error) {
      console.error('Error al cargar los datos del informe', error);
      setError(() => 'Error al cargar los datos del informe');
    } finally {
      setLoading(false);
    }
  };

  return { openTable, reportData, loading, error };
};

export default useOpenTable;

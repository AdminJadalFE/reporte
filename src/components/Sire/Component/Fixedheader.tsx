import React from "react";
import DataTable from "react-data-table-component";
import { Input, Label } from "reactstrap";

export const Fixedheader = ({ ticketData }: { ticketData: any[] }) => {
  const columns: any = [
    {
      name: "CAR_SUNAT",
      selector: (row: any) => row.Car_sunat,
      sortable: true,
      style: {
        fontSize: "10px",
        minWidth: "200px",
      },
    },
    {
      name: "Fecha_de_emision",
      selector: (row: any) => row.Fecha_de_emision,
      sortable: true,
    },
    {
      name: "Tipo_CP_Doc",
      selector: (row: any) => row.Tipo_CP_Doc,
      sortable: true,
    },
    {
      name: "Serie_del_CDP",
      selector: (row: any) => row.Serie_del_CDP,
      sortable: true,
    },
    {
      name: "Nro_CP_o_Doc_Nro_Inicial_Rango",
      selector: (row: any) => row.Nro_CP_o_Doc_Nro_Inicial_Rango,
      sortable: true,
    },
    {
      name: "Total_CP",
      selector: (row: any) => row.Total_CP,
      sortable: true,
    },
    {
      name: "FUENTE",
      selector: (row: any) => row.FUENTE,
      sortable: true,
    },
    {
      name: "INDICADOR",
      selector: (row: any) => row.INDICADOR,
      sortable: true,
    },
  ];

  // Definimos estilos condicionales basados en el valor de INDICADOR
  const conditionalRowStyles = [
    {
      when: (row) => row.INDICADOR === "0",
      style: {
        backgroundColor: "#ff6961", // rojo
      },
    },
    {
      when: (row) => row.INDICADOR === "1",
      style: {
        backgroundColor: "#5dc460", // verde
      },
    },
    {
      when: (row) => row.INDICADOR === "2",
      style: {
        backgroundColor: "#c8ca66", // amarillo
      },
    },
    {
      when: (row) => row.INDICADOR === "3",
      style: {
        backgroundColor: "#6a9eda", // azul
      },
    },
  ];

  return (
    <span className="datatable fixedHeader">
      <Label className="float-end">
        <Input
          type="text"
          placeholder="Search..."
          className="mb-4 form-control-sm form-control"
          // onChange={(ele) => {
          //   myfunction(ele.target.value);
          // }}
        />
      </Label>
      <DataTable
        columns={columns}
        data={ticketData}
        fixedHeader
        pagination
        paginationRowsPerPageOptions={[100, 500, 1000, 20000]}
        fixedHeaderScrollHeight="1200px"
        className="fixed-header"
        conditionalRowStyles={conditionalRowStyles} // Aplicamos estilos condicionales
      />
    </span>
  );
};

export default Fixedheader;

import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Label, Input, Button, Alert } from "reactstrap";
import { PageHeaderstyle } from "../../../Shared/Prism/Prism";
import Select from 'react-select';
import DataTable from "react-data-table-component";
import { MultiSelect } from "react-multi-select-component";
import ModalPaymentPusharses from "../components/modal/modalPaymentPusharses";
import ModalProductPusharses from "../components/modal/modalProductPusharses";
import { filterOptionsTablePusharse, mounths, years } from "../datas/PaymentPusharses";
import { Pusharse } from "../payment.interface";
import { usePaymentContext } from "../context/PaymentContext";
import { getLastDayOfMonth } from "../utils";
import AlertMessage from "../components/alerts/alert";
const PagePaymentControl = () => {
    const { pusharses, currentPusharse, setCurrentPusharse, updatePaymentsCurrentPusharse, getData, setPeriod, period, setPusharses, allPusharses } = usePaymentContext()
    const [tableColumns, setTableColumns] = useState<any[]>([])
    const [isProductModalVisible, setIsProductModalVisible] = useState<boolean>(false);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [filterOption, setFilterOption] = useState<any>({
        value: "number",
        label: "Número documento"
    });
    const [inputFilter, setInputFilter] = useState(
        {
            numberDocument: "",
            supplier: "",
            dateOfIssue: ""
        },

    )
    const optionsColumns = [
        { value: "igv", label: "IVG" },
        { value: "expiredDate", label: "Fecha Vencimiento" },
        { value: "perception", label: "Percepción" },
        { value: "subtotal", label: "Sub total" },
        { value: "userName", label: "Usuario" },

    ];
    
    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState<boolean>(false);
    const InitialtableColumns: any = [
        {
            name: "#",
            selector: (row: Pusharse, index) => [index + 1],
            sortable: true,
            width: '4rem',
        },
        {
            name: "F.Emsión",
            selector: (row: Pusharse) => [row.dateOfIssue],
            sortable: true,
            //width: '6.5rem',
            wrap: true
        },
        {
            name: "Proveedor",
            sortable: true,
            grow: 2,
            selector: (row: Pusharse) => [row.supplier],
            // maxWidth:"19rem",
            // wrap: true,
            cell: (row: Pusharse) => (
                <div style={{
                    overflowWrap: 'break-word',
                    padding: '.2rem'
                }}>
                    {row.supplier + ' | ' + row.rucSupplier}
                </div>
            )
        },
        {
            name: "Estado Pago",
            sortable: true,
            width: '7.3rem',
            wrap: true,
            selector: (row: Pusharse) => [row.state],
            cell: (row: Pusharse) => <div style={{ overflowWrap: 'break-word' }}>{
                row.state == 1 ? <p style={{
                    color: '#5ba08f',
                    margin: "auto"
                }}>Pagado</p> : <p style={{
                    color: '#f06161',
                    margin: "auto"
                }}>No pagado</p>

            }</div>,
        },
        {
            name: "Productos",
            // sortable: true,
            width: '6.5rem',
            cell: (row: Pusharse) => (
                <div className="d-flex justify-content-between" style={{ width: '160px', backgroundColor: 'transparent', border: 'none' }}>
                    <Button size="sm" onClick={() => {

                        toogleModalProduct()
                        setCurrentPusharseFunc(row.id)
                    }


                    } style={{ backgroundColor: 'transparent', border: '1px solid  #aaa9a9' }}>
                        <i className="fe fe-eye" style={{ color: 'grey' }}></i>
                    </Button>

                    <ModalProductPusharses
                        isProductModalVisible={isProductModalVisible}
                        toggleProductModal={() => {
                            setIsProductModalVisible(!isProductModalVisible)
                        }}
                        pusharse={currentPusharse}
                    />
                </div>

            ),
        },
        {
            name: "Número",
            selector: (row: Pusharse) => [row.numberDocument],
            sortable: true,
            // width: '7.5rem',
            cell: (row: Pusharse) => <div style={{ overflowWrap: 'break-word' }}>{row.numberDocument}</div>,
        },
        {
            name: "Pagos",
            //  width: '5.5rem',
            cell: (row) => (
                <div className="d-flex justify-content-between" style={{ width: '160px' }}>
                    <Button color="primary" size="sm" onClick={() => {
                        setCurrentPusharseFunc(row.id)
                        togglePaymentModal()
                        // setTotalPayment(calculatePaymentTotal())
                    }}> Pagos
                    </Button>

                    <ModalPaymentPusharses
                        isPaymentModalVisible={isPaymentModalVisible}
                        isShowContainerPaymentDetails={false}
                        togglePaymentModal={togglePaymentModal}
                    />

                </div>
            ),
        },
        {
            name: "Moneda",
            selector: (row: Pusharse) => [row.currency],
            sortable: true,
            // width: '5.8rem',
        },
        {
            name: "Total",
            selector: (row: Pusharse) => [row.totalAmount],
            sortable: true,
            //width: '6.4rem',
        }
       /*  {
            name: "Acciones",
            cell: (row) => (
                <div className="d-flex gap-1 flex-wrap justify-content-start" style={{ minWidth: "13rem" }}>
                    <Button color="primary" size="sm" className="btn" onClick={() => { }}>Editar</Button>
                    <Button color="danger" size="sm" className="btn" onClick={() => { }}>Eliminar</Button>
                    <Button color="info" size="sm" className="btn" onClick={() => { }}>Opciones</Button>
                    <Button color="dark" size="sm" className="btn" onClick={() => { }}>Guia</Button>
                </div>
            ),
            ignoreRowClick: true,

        } */,
    ]

    let pusharseCurr: Pusharse[] = []
    const toogleModalProduct = () => setIsProductModalVisible(!isProductModalVisible)

    const setCurrentPusharseFunc = async (pusharseId: string) => {

        pusharseCurr = pusharses.filter((pusharse: Pusharse) => {
            return pusharse.id == pusharseId
        }
        )
        setCurrentPusharse(pusharseCurr[0])
        await updatePaymentsCurrentPusharse(parseInt(pusharseId))
        // calculatePaymentTotal()


    };
    const newColumns: any = []
    const changeColumnTable = (selectColumnsOn: []) => {
        selectColumnsOn.forEach((item: { value: string, label: string }) => {
            newColumns.push({
                name: item.label,
                sortable: true,
                width: '6.4rem',
                wrap: true,
                selector: (row: any) => [row[item.value]],

            })
        })
        setTableColumns([...newColumns])
    }
    const togglePaymentModal = () => {
        setIsPaymentModalVisible(!isPaymentModalVisible)
    };
    const onchangePeriod = (e) => {

        setPeriod({
            ...period,
            [e.value.length == 2 ? 'mounth' : 'year']: e.value
        })
    }
    const onchangeInputFilter = (e) => {
        const valueInput: string = e.target.value.toLowerCase().trim();
        const columnName: string = e.target.name;
        setInputFilter({
            ...inputFilter,
            [columnName]: valueInput
        })
        const pusharsesFiltered = allPusharses.filter((pusharse) => {
            if (columnName == "supplier") {
                return pusharse[columnName]?.toLowerCase().includes(valueInput) ||
                    pusharse.rucSupplier?.includes(valueInput);
            }
            return pusharse[columnName]?.toLowerCase().includes(valueInput);
        });
        console.log(pusharsesFiltered)
        setPusharses(pusharsesFiltered)

    }
    useEffect(() => {
        setInputFilter({
            numberDocument: "",
            supplier: "",
            dateOfIssue: ""
        })
    }, [filterOption])

    useEffect(() => {
        getData()
    }, [])

    const renderCampoBusqueda = () => {
        if (filterOption.value === 'number') {
            return <Input className="form-control w-30" type="search" name="numberDocument"
                placeholder="Número documento"
                onChange={onchangeInputFilter}
                value={inputFilter.numberDocument}
            />
        }
        if (filterOption.value === 'name_supplier') {
            return <Input className="form-control w-30" type="search" name="supplier"
                placeholder="Nombre o ruc de proveedor"
                onChange={onchangeInputFilter}
                value={inputFilter.supplier}
            />
        }
        if (filterOption.value === 'broadcast_date') {
            return <Input className="form-control w-30" type="date"
                max={`${period.year}-${period.mounth}-${getLastDayOfMonth(parseInt(period.year), period.mounth)}`}
                min={`${period.year}-${period.mounth}-01`}
                onChange={onchangeInputFilter}
                value={inputFilter.dateOfIssue}
                name="dateOfIssue"
            />
        }
    };
    return (
        <div>

            <PageHeaderstyle title="Control de Gastos" home="Pagos" Pages="Compras" />
            <div>
                <Row>
                    <Col lg="12" xl="12" md="12" sm="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Compras {/* {isPaymentModalVisible ? 'true' : 'false'} */}</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Col lg="12" md="12">
                                    <div className="mb-6 d-flex align-items-center gap-3 flex-wrap">
                                        <div className="d-flex justify-content-start align-items-center flex-grow-1
                                        ">
                                            <Label
                                                className="pe-5"
                                            >Filtrar por:</Label>
                                            <Select
                                                defaultValue={filterOption}
                                                onChange={setFilterOption}
                                                options={filterOptionsTablePusharse}
                                                classNamePrefix="Search"
                                                className="w-30"
                                            />
                                            {renderCampoBusqueda()}
                                        </div>
                                        <div className="px-10 d-flex align-items-center justify-content-end flex-grow-1 ">
                                            <Label className="me-4">Periodo:</Label>

                                            <Select
                                                defaultValue={
                                                    { value: period.mounth, label: mounths[(parseInt(period.mounth)) - 1].label }
                                                }
                                                onChange={onchangePeriod}
                                                options={parseInt(period.year) === new Date().getFullYear() ? mounths.slice(0, new Date().getMonth() + 1) : mounths}

                                                placeholder="Producto"
                                                classNamePrefix="Search"
                                                className="w-25"
                                            />
                                            <Select
                                                defaultValue={
                                                    { value: period.year, label: period.year }
                                                }
                                                onChange={onchangePeriod}
                                                options={years}
                                                classNamePrefix="Search"
                                                className="w-9 flex-shrink-1"
                                                name="test"
                                            />
                                        </div>

                                        <MultiSelect
                                            value={selectedColumns}
                                            onChange={(e) => {
                                                console.log(e)
                                                setSelectedColumns(e)
                                                changeColumnTable(e)
                                            }}
                                            labelledBy="s"
                                            disableSearch={true}
                                            options={optionsColumns}

                                            className="w-20 select_z-index ms-auto"
                                            valueRenderer={(selected, _options) => {

                                                return selected.length
                                                    ? selected.map(({ label }) => "✓" + label)
                                                    : "Columnas";
                                            }}

                                        />
                                    </div>
                                    <span className="datatable fixedHeader">
                                        {/* <Label className="float-end"> <Input type="text" placeholder="Search..." className="mb-4 form-control-sm form-control" onChange={(ele) => { myfunction(ele.target.value);}}/></Label> */}
                                        <DataTable
                                            columns={[...InitialtableColumns.slice(0, -1), ...tableColumns, InitialtableColumns[InitialtableColumns.length - 1]]}
                                            data={pusharses}
                                            fixedHeader
                                            pagination
                                            noDataComponent="No se encontraron Compras registradas"
                                            fixedHeaderScrollHeight="600px"
                                            className="rdt_TableHeadRow"
                                            paginationComponentOptions={{
                                                rowsPerPageText: 'Compras por página:', rangeSeparatorText: 'de', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'All'
                                            }}
                                        />
                                    </span>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
PagePaymentControl.propTypes = {};
PagePaymentControl.defaultProps = {};

export default PagePaymentControl;

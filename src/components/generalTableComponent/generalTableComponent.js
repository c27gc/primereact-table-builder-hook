import React, { useRef, useEffect, useState } from "react";
//import ColumnDate from "../components/columnDate/columnDate";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import TableHeader from "./tableHeader";
import CrudModals from "../columnCrud/crudModals";


const GeneralTableComponent = ({
  isDownloadable,
  hasCreateButton,
  title,
  requestData,
  columns,
  isLazy,
  dataInfo,
  editCallback,
  deleteCallback,
  newCallback,
  hasUpdateButton,
  hasDeleteButton,
  headerFormComponent,
  rowClickActionName,
  rowClickActionCallback,
  hasRowReorder,
  onRowReorderCallback,
  numberOfRecords
}) => {
  /* ================= base states ================= */

  const dataTableRef = useRef(null);

  const [filters, setFilters] = useState({});

  const [input, setInput] = useState({});
  const [inputDialog, setInputDialog] = useState(false);
  const [deleteInputDialog, setDeleteInputDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const [render, setRender] = useState(false);

  const [ page, setPage ] = useState(numberOfRecords)

  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    first: 0,
    rows: 10,
    page: 0,
  });
  /* =============================================== */

  /* ================== base refs ================== */
  const [data, setData] = useState([{}]);

  const [first, setFirst] = useState(0);

  const [selectedItem, setSelectedItem] = useState(null);

  const dataModel = Object.keys(dataInfo).map(field => {
    return field
  }).reduce( (acc, field) => {
    acc[field] = ""
    return acc
  }, {})

  const dataFields = Object.keys(dataInfo).map((element) => {
    const elementInfo = {};
    elementInfo["field"] = element;
    elementInfo["header"] = dataInfo[element].title;

    return elementInfo;
  });


  const loadLazyData = async (lazyParams) => {
    setLoading(true);

    const stringifyFilter = lazyParams["filters"] ? 
      Object.keys(lazyParams["filters"]).reduce((accumulate, current) => {

        console.log("________lazyParams_________", lazyParams)
        const value = lazyParams["filters"][current]["value"]

        if ( (typeof value ==="string") && ( value !== undefined && value !== null && value !== "" && value !== [null]) ) {
          accumulate[current] = value;
        } else if ( value.every( v => ( Boolean(v) === true))) {
          accumulate[current] = value;
        } 
        
        return accumulate;
      }, {}
    ) : {}


    const { inputData, count } = await requestData( stringifyFilter, lazyParams["page"] +1 );

    console.log("REQUEST DATA", inputData)
    setData(inputData);

    if ( count ) {
      setPage(count)
      console.log("setNumberOfRecords", count)
      //setNumberOfRecords(count)
    }

    setLoading(false);
  };

  const onPage = (event) => {
    console.log("onPage:", event);
    let _lazyParams = { ...params, ...event };
    _lazyParams["first"] = event["first"];
    setParams(_lazyParams);
  };

  const onFilter = (event) => {
    let _lazyParams = { ...params, ...event };
    _lazyParams["first"] = 0;
    setParams(_lazyParams);
  };

  const onRowReorder = (e) => {
    onRowReorderCallback(e.value);
    setData(e.value);
  };

  useEffect(() => {
    console.log("PRIMER RENDER")
    const stringifyFilter = filters ? 
      Object.keys(filters).reduce((accumulate, current) => {
        const value = filters[current]["value"]
        if ( value !== "" && value !== [""] && value !== []) {
          accumulate[current] = value;
        }
        return accumulate;
      }, {}
    ) : {}

    const requestInitialData = async () => {
      const { inputData, count } = await requestData(stringifyFilter, params["page"] + 1)
      
      if ( count ) {
        console.log("setNumberOfRecords", count)
        setPage(count)
        //setNumberOfRecords(count)
      }

      setData(inputData);
    }

    requestInitialData();

    return (
      console.log("DESTRUIDO EL COMPONENTE GENERAL")
    )


  }, [])


  useEffect(() => {
    console.log("render", render)
  }, [render])
  

  useEffect(() => {
    console.log("PARAMS MODIFICADOS")
    loadLazyData(params);
    setFirst(params["first"]);
    setFilters(params["filters"]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, render]);

  // setRoute(isPaginated ? paginatedDataRoute + "/" + initialPage : dataRoute)

  // useEffect(() => {
  //   const fetchData = async (route2) => {
  //     const response = await requestData(route2);
  //     setData(response);
  //   };

  //   setData([{}]);
  //   setNumberOfPage(numberOfPage);
  //   fetchData(route);
  // }, [numberOfPage, requestData, route]);

  

  useEffect(() => {
    console.log("EL DEL CALLBACK")
    if (!inputDialog && rowClickActionName === "redirection" && selectedItem) {
      const redirectionRoute = rowClickActionCallback(selectedItem);
      window.open(redirectionRoute);
    } else if (
      !inputDialog &&
      rowClickActionName === "getData" &&
      selectedItem
    ) {
      rowClickActionCallback(selectedItem);
    }
  }, [rowClickActionName, inputDialog, selectedItem, rowClickActionCallback]);


  

  useEffect(() => {
    console.log("data REQUESTED: ", data);
  }, [data]);

  

  return (
    <div className="">
      <React.Fragment>
        <DataTable
          ref={dataTableRef}
          value={data}
          lazy={isLazy}
          paginator
          rows={5}
          selectionMode="single"
          rowHover
          onRowReorder={onRowReorder}
          totalRecords={page}
          loading={loading}
          editMode={"cell"}
          header={
            <TableHeader
              title={title}
              dataInfo={dataFields}
              dataInformation={dataInfo}
              dt={dataTableRef}
              data={data}
              dataSchema={dataModel}
              createButton={hasCreateButton}
              isDownloadable={isDownloadable}
              input={input}
              setInput={setInput}
              submitted={submitted}
              setSubmitted={setSubmitted}
              inputDialog={inputDialog}
              setInputDialog={setInputDialog}
              params={params}
              setParams={setParams}
              setCurrentForm={setCurrentForm}
              isPaginated={isLazy}
              headerFormComponent={headerFormComponent}
            />
          }
          selection={selectedItem}
          filters={isLazy ? params.filters: filters}
          first={first}
          onPage={ onPage }
          onFilter={ onFilter }
          onSelectionChange={(e) => setSelectedItem(e.value)}
          emptyMessage="No data found."
        >
          {hasRowReorder ? (
            <Column rowReorder style={{ width: "3em" }} />
          ) : null}

          <Column selectionMode="simple" style={{ width: "3em" }} />

          {Object.keys(dataInfo).map((fieldName, index) => {
            if (!dataInfo[fieldName].visible) {
              return null;
            }

            const ColumnRender = columns[dataInfo[fieldName].type];

            return (
              <Column
                {...ColumnRender({
                  key: fieldName + index,
                  headerStyle: {
                    minWidth: "150px",
                  },
                  field: fieldName,
                  header: dataInfo[fieldName].title,
                  tableRef: dataTableRef,
                  dataInfo: dataInfo[fieldName],
                  editCallback: editCallback
                })}
              />
            );
          })}

          {columns["crud"] ? (
            <Column
              {...columns["crud"]({
                key: "crudkey",
                headerStyle: {
                  minWidth: "150px",
                },
                header: "",
                tableRef: dataTableRef,
                dataInfo: dataInfo,
                setInput: setInput,
                setInputDialog: setInputDialog,
                setDeleteInputDialog: setDeleteInputDialog,
                setCurrentForm: setCurrentForm,
                hasUpdateButton: hasUpdateButton,
                hasDeleteButton: hasDeleteButton,
              })}
            />
          ) : null}
        </DataTable>

        
          <CrudModals
            input={input}
            setInput={setInput}
            submitted={submitted}
            setSubmitted={setSubmitted}
            inputDialog={inputDialog}
            setInputDialog={setInputDialog}
            deleteInputDialog={deleteInputDialog}
            setDeleteInputDialog={setDeleteInputDialog}
            dataSchema={dataModel}
            dataInfo={dataInfo}
            editCBInput={editCallback}
            deleteCBInput={deleteCallback}
            newCBinput={newCallback}
            currentForm={currentForm}
            setRender={setRender}
          />
      </React.Fragment>
    </div>
  );
};

export default GeneralTableComponent;

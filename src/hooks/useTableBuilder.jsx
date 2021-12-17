import React from "react";
import GeneralTableComponent from "../components/generalTableComponent/generalTableComponent";
import useColumnBuilder from "./useColumnBuilder";

class TableBuilder {
  constructor(isLazy, isDownloadable, columnBuilder) {
    this.columnBuilder = columnBuilder;
    this.isLazy = isLazy || false;
    this.isDownloadable = isDownloadable && true;
    this.tableName = "Table Title";
    this.hasCreateButton = false;
    this.headerFormComponent = null;
    this.requestData = () => {};
    this.editCallback = () => {};
    this.deleteCallback = () => {};
    this.newCallback = () => {};
    this.columns = [];
    this.hasUpdateButton = false;
    this.hasDeleteButton = false;
    this.hasRowReorder = false;
    return this;
  }

  addTableName(title) {
    this.tableName = title;
    return this;
  }

  addRowClickAction(actionName, actionCallback) {
    this.rowClickActionName = actionName;
    this.rowClickActionCallback = actionCallback;
    return this;
  }

  addCustomColumnFilter(name, parametersGenerator) {
    this.columnBuilder.addCustomType(name, parametersGenerator);
    return this;
  }

  addNewFunction(callback) {
    this.newCallback = callback;
    return this;
  }

  addEditFunction(callback) {
    this.editCallback = callback;
    return this;
  }

  addDeleteFunction(callback) {
    this.deleteCallback = callback;
    return this;
  }

  addRequestData(requestData) {
    this.requestData = requestData;
    return this;
  }

  addNumberOfRecords( numberOfRecords) {
    this.numberOfRecords = numberOfRecords
    return this
  }

  addHeaderFilter(headerFormComponent) {
    this.headerFormComponent = headerFormComponent;
    return this;
  }

  addFilterRoute(filterRoute) {
    this.filterRoute = filterRoute;
    return this;
  }

  addCrudColumn(createButton, updateButton, deleteButton) {
    this.hasUpdateButton = updateButton;
    this.hasDeleteButton = deleteButton;
    this.hasCreateButton = createButton;
    return this;
  }
 
  addDataInfo(dataInfo) {
    this.dataInfo = dataInfo;
    return this;
  }
  
  addOnRowReorder(onRowReorder) {
    this.hasRowReorder = true
    this.onRowReorder = onRowReorder
    return this
  }

  addDocumentImage(documentImage) {
    this.documentImage = documentImage;
    return this;
  }

  build() {
    const TableResult = () => {
      return (
        <GeneralTableComponent
          title={this.tableName}
          isDownloadable={this.isDownloadable}
          hasUpdateButton={this.hasUpdateButton}
          hasDeleteButton={this.hasDeleteButton}
          hasCreateButton={this.hasCreateButton}
          requestData={this.requestData}
          columns={this.columnBuilder.build()}
          isLazy={this.isLazy}
          dataInfo={this.dataInfo}
          editCallback={this.editCallback}
          deleteCallback={this.deleteCallback}
          newCallback={this.newCallback}
          hasRowClickRedirection={this.hasRowClickRedirection}
          rowClickRedirection={this.rowClickRedirection}
          headerFormComponent={this.headerFormComponent}
          filterRoute={this.filterRoute}
          rowClickActionName={this.rowClickActionName}
          rowClickActionCallback={this.rowClickActionCallback}
          hasRowReorder={this.hasRowReorder}
          onRowReorderCallback={this.onRowReorder}
          numberOfRecords={this.numberOfRecords}
          documentImage={this.documentImage}
        />
      );
    };

    return TableResult;
  }
}

const useTableBuilder = (isLazy, isDownloadable) => {
  const columnBuilder = useColumnBuilder();

  return new TableBuilder(isLazy, isDownloadable, columnBuilder);
};

export default useTableBuilder;

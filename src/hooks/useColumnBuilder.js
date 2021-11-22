//import DateColumnWrapper from "../components/columnDate/columnDateWrapper";
import columnDateParameters from "../components/columnDate/columnDateParameters.js";
import columnNumberParameters from "../components/columnNumber/columnNumberParameters.js";
import columnStringParameter from "../components/columnString/columnStringParameters.js";
import columnCrudParameters from '../components/columnCrud/columnCrudParameters.js'
import columnEditableParameters from "../components/columnEditable/columnEditableParameters"

class ColumnBuilder {
  constructor() {
    this.columns = {
      date: columnDateParameters,
      number: columnNumberParameters,
      string: columnStringParameter,
      editable: columnEditableParameters,
      crud: columnCrudParameters
    };
    this.elements = {};
    return this;
  }

  addType(columnType) {
    return this;
  }

  addCustomType(name, parametersGenerator) {
    this.columns[name] = parametersGenerator
    return this
  }

  build() {
    return this.columns;
  }
}

const useColumnBuilder = () => {
  return new ColumnBuilder();
};

export default useColumnBuilder;

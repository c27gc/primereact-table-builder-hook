const columnComponentWithFilterFactory = (bodyClosure, filterElementClosure) => {
  const columnComponentWithFilter = (props) => {
    return {
      key: props.key,
      field: props.field,
      header: props.header,
      body: bodyClosure(props.field),
      filter : props.dataInfo.filterVisibility,
      filterElement: filterElementClosure(props.tableRef, props.field),
    }
  } 

  return columnComponentWithFilter
}

export default columnComponentWithFilterFactory;
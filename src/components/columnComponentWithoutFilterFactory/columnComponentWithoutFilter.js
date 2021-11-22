const columnComponentWihoutFilterFactory = (body) => {
  const columnComponentWihoutFilter = (props) => {
    return {
      key: props.key,
      field: props.field,
      header: props.header,
      body: body,
      filter: false
    }
  }

  return columnComponentWihoutFilter
}

export default columnComponentWihoutFilterFactory
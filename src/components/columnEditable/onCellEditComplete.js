const onCellEditComplete = (e) => {
  let { rowData, newValue, field, originalEvent: event } = e;
  if (newValue.trim().length > 0) {
    rowData[field] = newValue;
     console.log("VEAMOS QUE PASAAA")
  } else {
    event.preventDefault()
  }
}

export default onCellEditComplete;
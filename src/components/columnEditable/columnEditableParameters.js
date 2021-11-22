import onCellEditComplete from './onCellEditComplete'
import CellEditor from './cellEditor'

const columnEditableParameters = (props) => {
  return {
    field: props.field,
    key: props.key,
    headerStyle: props.headerStyle,
    header: props.header,
    filter: props.dataInfo.filterVisibility,
    filterMatchModed: 'startsWith',
    onCellEditComplete: onCellEditComplete,
    editor: options => {
      CellEditor(options)
    }
  }
}

export default columnEditableParameters;
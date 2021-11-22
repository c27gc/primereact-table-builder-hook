/**
 * @jest-environment jsdom
 */

import React from 'react' 
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import RenderStatusFilter from '../../components/columnMultiselectFactory/multiselectionFilterElement'

test('renders multiselect filter', () => {
  const mappingPolicy = {
    "16": "ANULADO",
    "5": "POR CONCLUIR",
    "6": "CONCLUIDO",
    "23": "SUSPENDIDO",
    "1": "POR CALIFICAR"
  }

  const colorPolicy = {
    "ANULADO": "#2F4F4F",
    "POR CONCLUIR": "#008F39",
    "CONCLUIDO": "#008080",
    "SUSPENDIDO": "#008080",
    "POR CALIFICAR": "#008080"
  }

  const dt = {
    current :{

    }
  }

  dt.current["filter"] = jest.fn((fieldValue, name, policy) => {
    console.log(fieldValue, name, policy)
  })

  const field = "testField"

  const component = render( <RenderStatusFilter mappingPolicy={mappingPolicy} colorPolicy={colorPolicy} dt={dt} field={field}/>)
  
  //console.log(component)
})
/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import statusBodyTemplateClosure from "../../components/columnMultiselectFactory/multiselectionBody";

test('render mulselect body', () => {
  
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

  const field = "testField"

  const component = render( <statusBodyTemplateClosure mappingPolicy={mappingPolicy} colorPolicy={colorPolicy} field={field} /> );

  console.log(component)

})
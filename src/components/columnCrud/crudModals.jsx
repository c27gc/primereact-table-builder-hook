import React, { useRef } from "react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

import { classNames } from "primereact/utils";

const CrudModals = ({
  input,
  setInput,

  submitted,
  setSubmitted,

  inputDialog,
  setInputDialog,

  setDeleteInputDialog,
  dataSchema,
  dataInfo,

  deleteInputDialog,

  currentForm,
  editCBInput,
  deleteCBInput,
  newCBinput,
  setRender
}) => {

  const saveInput = async () => {
    setSubmitted(true);

    const requiredList = Object.keys(input).map((element) => {
      if (
        dataInfo[element] &&
        dataInfo[element]["required"] &&
        !input[element]
      ) {
        return true;
      } else {
        return false;
      }
    });

    if (!requiredList.includes(true) && currentForm === "edit") {
      await editCBInput(input);
      setSubmitted(false);
      setInputDialog(false);
      setRender( oldRender => !oldRender );
    } else if (!requiredList.includes(true) && currentForm === "new") {
      await newCBinput(input);
      setSubmitted(false);
      setInputDialog(false);
      setRender( oldRender => !oldRender );
    }
  };

  const deleteInput = async () => {
    setSubmitted(true);
    try {
      await deleteCBInput(input);
      setSubmitted(false);
      setDeleteInputDialog(false);
      setRender( oldRender => !oldRender );
    } catch (error) {
      setDeleteInputDialog(false);
    }
  };
  const formRefs = useRef([]);

  const objectFlip = (obj) => {
    return Object.entries(obj).reduce((ret, entry) => {
      const [key, value] = entry;
      ret[value] = key;
      return ret;
    }, {});
  };

  const hideDialog = () => {
    setSubmitted(false);
    setInputDialog(false);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _input = { ...input };
    _input[`${name}`] = val;
    setInput(_input);
  };

  const statusItemTemplateClosure = (colorPolicy) => {
    const statusItemTemplate = (option) => {
      return (
        <span
          className={classNames("customer-badge")}
          style={{
            backgroundColor: colorPolicy[option],
            color: "white",
          }}
        >
          {option}
        </span>
      );
    };
    return statusItemTemplate;
  };

  const hideDeleteInputDialog = () => {
    setDeleteInputDialog(false);
  };

  const deleteInputDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteInputDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteInput}
      />
    </React.Fragment>
  );

  const inputDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveInput}
      />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Dialog
        visible={inputDialog}
        style={{
          width: "450px",
        }}
        header="Ingrese datos"
        modal
        className="p-fluid"
        footer={inputDialogFooter}
        onHide={() => {
          setSubmitted(false);
          setInputDialog(false);
        }}
      >
        {Object.keys(dataSchema).map((element, index) => {
          if (!dataInfo[element]?.editVisibility && currentForm === "edit") {
            return null;
          }
          return (
            <div className="p-field">
              {(() => {
                if (
                  dataInfo[element].type === "date" 
                ) {
                  return (
                    <div>
                      <h6>{dataInfo[element].title}</h6>
                      <Calendar
                        ref={(el) => (formRefs.current[index] = el)}
                        key={element}
                        value={new Date(input[element] + "T00:00:00")}
                        onChange={(e) => {
                          const date = e.value
                            ? e.value
                                .toLocaleDateString()
                                .split("/")
                                .reduce((acc, element) => {
                                  return element.length > 1
                                    ? element + "-" + acc
                                    : "0" + element + "-" + acc;
                                }, "")
                                .slice(0, -1)
                            : "";
                          setInput((oldValue) => {
                            oldValue[element] = date;
                            return {
                              ...oldValue,
                            };
                          });
                        }}
                        disabled={(dataInfo[element].editDisable && currentForm === "edit") || (dataInfo[element].newDisable && currentForm === "new") }
                        placeholder="Fecha"
                        dateFormat="yy-mm-dd"
                        className="p-column-filter"
                      />
                    </div>
                  );
                } else if (
                  dataInfo[element].type === "string" 
                ) {
                  return (
                    <div>
                      <h6>{dataInfo[element].title}</h6>
                      <InputText
                        ref={(el) => (formRefs.current[index] = el)}
                        id={element}
                        value={input[element]}
                        onChange={(e) => onInputChange(e, element)}
                        required
                        disabled={(dataInfo[element].editDisable && currentForm === "edit") || (dataInfo[element].newDisable && currentForm === "new") }
                        className={classNames({
                          "p-invalid": submitted && !input[element],
                        })}
                      />
                    </div>
                  );
                } else if (
                  dataInfo[element].type === "number" 
                ) {
                  return (
                    <div>
                      <h6>{dataInfo[element].title}</h6>
                      <InputText
                        ref={(el) => (formRefs.current[index] = el)}
                        id={element}
                        value={input[element]}
                        onChange={(e) => onInputChange(e, element)}
                        required
                        disabled={(dataInfo[element].editDisable && currentForm === "edit") || (dataInfo[element].newDisable && currentForm === "new")}
                        className={classNames({
                          "p-invalid": submitted && !input[element],
                        })}
                      />
                    </div>
                  );
                } else if (
                  dataInfo[element].type.includes("multiselect-") 
                ) {
                  return (
                    <div>
                      <h6>{dataInfo[element].title}</h6>
                      <Dropdown
                        value={dataInfo[element].mappingPolicy[input[element]]}
                        options={Object.keys(dataInfo[element].colorPolicy)}
                        onChange={(e) => {
                          setInput((oldInput) => {
                            const inverseMappingPolicy = objectFlip(
                              dataInfo[element].mappingPolicy
                            );
                            oldInput[element] = inverseMappingPolicy[e.value];
                            return {
                              ...oldInput,
                            };
                          });
                        }}
                        itemTemplate={statusItemTemplateClosure(
                          dataInfo[element].colorPolicy
                        )}
                        showClear
                        disabled={(dataInfo[element].editDisable && currentForm === "edit") || (dataInfo[element].newDisable && currentForm === "new") }
                        placeholder="Seleccione una opción"
                        className="p-column-filter"
                      />
                    </div>
                  );
                }
              })()}
              {submitted && !input[element] && dataInfo[element]["required"] ? (
                <small className="p-error">
                  {dataInfo[element].title} es requerido.
                </small>
              ) : null}
            </div>
          );
        })}
      </Dialog>
      <Dialog
        visible={deleteInputDialog}
        style={{
          width: "450px",
        }}
        header="Confirmar"
        modal
        footer={deleteInputDialogFooter}
        onHide={hideDeleteInputDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{
              fontSize: "2rem",
            }}
          />
          {input && (
            <span>
              Estas seguro que quieres borrar <b>{input.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default CrudModals;

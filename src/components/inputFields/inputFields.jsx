import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";

function InputFields({ setCustomerInfo, customerInfo, type, inputName }) {
  const id = `${type}-input`;

  const handleChange = (event) => {
    setCustomerInfo({
      ...customerInfo,
      [inputName]: event.target.value,
    });
    console.log("inside Inputfields", customerInfo);
  };
  return (
    <TextField id={id} label={type} variant="filled" onChange={handleChange} />
  );
}

export default InputFields;

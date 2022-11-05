import Texfield from "./textfield.js";

const LogIn = () => {
  return (
    <div
      id="LoginBox"
      style={{
        height: "100%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        id="loginbox"
        style={{
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
          height: 400,
          alignItems: "center", //
          backgroundColor: "lightgray",
        }}
      ></div>

      <TextField id="filled-basic" label="Filled" variant="filled" />
    </div>
  );
};

export default LogIn;

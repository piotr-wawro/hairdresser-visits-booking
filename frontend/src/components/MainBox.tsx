type MainBoxProps = {
  text: string;
  graphic: string;
};

function MainBox({ text, graphic }: MainBoxProps) {
  return (
    <div id="box1">
      <h2
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 100,
          color: "blue",
          width: 230,
        }}
      >
        {text}
      </h2>
      <img src={graphic} style={{ height: 300, width: 400 }} />
    </div>
  );
}

export default MainBox;

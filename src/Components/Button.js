export const Button = (props) => {
  console.log(props);
  return <button onClick={props.onClickButton}>{props.buttonText}</button>;
};

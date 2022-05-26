import SigninForm from "../forms/SigninForm";

function Signin({ handleClick }) {
  return (
    <div className="container">
      <SigninForm handleClick={() => handleClick} />
    </div>
  );
}

export default Signin;

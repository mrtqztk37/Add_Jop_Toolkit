const Button = ({ text, type = "submit" }) => {
  return (
    <button type={type} className="btn" id="btn">
      {text}
    </button>
  );
};

export default Button;

const Error = ({ msg, retry }) => {
  return (
    <div className="error">
      <p>Üzgünüz verilere ulaşırken bir sorun oluştu</p>
      <p className="text">{msg}</p>

      <button onClick={retry} className="btn">
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;

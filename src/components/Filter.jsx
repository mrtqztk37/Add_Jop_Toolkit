import { useEffect, useState } from "react";
import { sortOpt, statusOpt, typeOpt } from "../utils/constants";
import Button from "./Button";
import Select from "./Select";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";

const Filter = () => {
  const [text, setText] = useState();
  const [debouncedText, setDebouncedText] = useState();
  const [sort, setSort] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (text === undefined) return;

    const timer = setTimeout(() => setDebouncedText(text), 500);

    return () => clearTimeout(timer);
  }, [text]);
  useEffect(() => {
    const shortP =
      sort === "a-z" || sort === "z-a"
        ? "company"
        : sort === "En Yeni " || "En Eski"
        ? "date"
        : undefined;

    const orderP =
      sort === "a-z" || sort === "En Eski"
        ? "asc"
        : sort === "z-a" || sort === "En Yeni "
        ? "desc"
        : undefined;

    const params = {
      q: debouncedText,
      status: status || undefined,
      type: type || undefined,
      _sort: shortP,
      _order: orderP,
    };
    dispatch(setLoading());
    api
      .get("/jobs", { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }, [debouncedText, status, sort, type]);

  const handleReset = (e) => {
    e.preventDefault();
    e.target.reset();
  };
  return (
    <div className="filter-sec">
      <h2>Filtreleme Formu</h2>

      <form onSubmit={handleReset}>
        <div>
          <label>Ara</label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>
        <Select
          label="Durum"
          options={statusOpt}
          fn={(e) => setStatus(e.target.value)}
        />
        <Select
          label="Tür"
          options={typeOpt}
          fn={(e) => setType(e.target.value)}
        />
        <Select
          label="Sırala"
          options={sortOpt}
          fn={(e) => setSort(e.target.value)}
        />
        <Button text="Filtreleri Sıfırla" />
      </form>
    </div>
  );
};

export default Filter;

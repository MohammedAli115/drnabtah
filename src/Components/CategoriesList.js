import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../features/filter/filterSlice";
import { useTranslation } from "react-i18next";

function CategoriesList() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const {
    items: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);
  const selectedCategory =
    useSelector((state) => state.filter.category) || "all";
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <select
      className="form-select"
      style={{ maxWidth: "120px" }}
      value={selectedCategory}
      onChange={(e) => dispatch(setCategory(e.target.value))}
    >
      <option value="all">
        {i18n.language === "ar" ? "كل المنتجات" : "All Products"}
      </option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {i18n.language === "ar" ? cat.name_ar : cat.name_en}
        </option>
      ))}
    </select>
  );
}

export default CategoriesList;

import React, { useEffect, useState } from "react";
import api from "./../api/axios";
import { useTranslation } from "react-i18next";

const CitiesSelect = ({ onChange, selectedCity }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get("/cities");
        console.log("Fetched cities:", response.data);
        setCities(response.data?.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load cities");
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    const selectedCityObj = cities.find(
      (city) => String(city.id) === String(selectedId)
    );
    console.log("Selected ID:", selectedId);
    console.log("Selected City Object:", selectedCityObj);
    if (onChange) onChange(selectedId, selectedCityObj);
  };

  return (
    <div className="mb-3">
      <label htmlFor="citySelect" className="form-label">
        {currentLang === "ar" ? "اختر المدينة" : "Select City"}
      </label>
      {loading && <div>Loading cities...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && (
        <select
          id="citySelect"
          className="form-select"
          value={selectedCity}
          onChange={handleChange}
        >
          <option value="">
            -- {currentLang === "ar" ? "اختر المدينة" : "Select City"} --
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {currentLang === "ar" ? city.name_ar : city.name_en}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CitiesSelect;

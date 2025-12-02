import React, { useState } from "react";
import styles from "./Search.module.css";

const petTypes = [
  "Small dog",
  "Medium dog",
  "Big dog",
  "Cat",
];

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [petType, setPetType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch({ searchQuery, startDate, endDate, petType });
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={`${styles.field} ${styles.searchField}`}>
              <label className={styles.srOnly} htmlFor="searchQuery">
                Location or sitter name
              </label>
              <input
                id="searchQuery"
                name="searchQuery"
                type="search"
                placeholder="Amsterdam, 1012, or Jane Doe"
                className={styles.input}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.button}>
              Search
            </button>

            <div className={`${styles.field} ${styles.compactField}`}>
              <label className={styles.srOnly} htmlFor="startDate">
                Start date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                className={styles.input}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className={`${styles.field} ${styles.compactField}`}>
              <label className={styles.srOnly} htmlFor="endDate">
                End date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                className={styles.input}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className={`${styles.field} ${styles.compactField}`}>
              <label className={styles.srOnly} htmlFor="petType">
                Pet type
              </label>
              <select
                id="petType"
                name="petType"
                className={`${styles.input} ${styles.select}`}
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
              >
                <option value="">Any pet</option>
                {petTypes.map((type) => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Search;

import React, { useState } from "react";
import styles from "./Search.module.css";

const petTypes = [
  "Small dog",
  "Medium dog",
  "Big dog",
  "Cat",
];

function Search({setSearch}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [petType, setPetType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchObj = {
      petType,
      city: searchQuery
    }
    setSearch(searchObj)
    console.log('achieved')
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
                placeholder="Amsterdam"
                className={styles.input}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.button}>
              Search
            </button>
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

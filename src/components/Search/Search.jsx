import React, { useState } from "react";
import styles from "./Search.module.css";
import { capitalize, capitalizeSentence } from "../../utils/functions";


const petTypes = [
  "Small dog",
  "Medium dog",
  "Big dog",
  "Cat",
];

function Search({ setSearch = () => {}, variant = "default" }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [petType, setPetType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchObj = {
      petType,
      city: capitalizeSentence(searchQuery)
    };
    if (typeof setSearch === "function") {
      setSearch(searchObj);
    }
  };

  const isMinimal = variant === "minimal";

  return (
    <section className={`${styles.wrapper} ${isMinimal ? styles.minimalWrapper : ""}`}>
      <div className={`${styles.card} ${isMinimal ? styles.minimalCard : ""}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={`${styles.formRow} ${isMinimal ? styles.minimalRow : ""}`}>
            <div className={`${styles.field} ${styles.searchField} ${isMinimal ? styles.minimalField : ""}`}>
              <label className={styles.srOnly} htmlFor="searchQuery">
                Location or sitter name
              </label>
              <input
                id="searchQuery"
                name="searchQuery"
                type="search"
                placeholder="Type the city you want to search"
                className={`${styles.input} ${isMinimal ? styles.minimalInput : ""}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button type="submit" className={`${styles.button} ${isMinimal ? styles.minimalButton : ""}`}>
              Search
            </button>
            <div className={`${styles.field} ${styles.compactField} ${isMinimal ? styles.minimalField : ""}`}>
              <label className={styles.srOnly} htmlFor="petType">
                Pet type
              </label>
              <select
                id="petType"
                name="petType"
                className={`${styles.input} ${styles.select} ${isMinimal ? styles.minimalInput : ""}`}
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

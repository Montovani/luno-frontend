import React from "react";
import Search from "../components/Search/Search";
import styles from "./FindSitter.module.css"
import SitterList from "../components/SittersList/SitterList";
import SittersMap from "../components/SittersMap/SittersMap";

const Map = () => (
  <section className="find-sitter__map">
    <h2>Map</h2>
    <div className="find-sitter__map-placeholder">
      Map component from external provider will render here.
    </div>
  </section>
);

function FindSitter() {
  return (
    <>
        <Search />
        <div className={styles.findSitter}>
        <header className={styles.fsHeader}>
            <h1>Find a Pet Sitter</h1>
            <p>Search, browse sitters, and view them on the map.</p>
        </header>

        <div className={styles.findSitterCard}>
            <SitterList />
            <SittersMap />
        </div>
        </div>
    </>
  );
}

export default FindSitter;

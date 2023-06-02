import React from "react";
import styles from "./Card.module.scss";

interface ICard {
  flags: any;
  name: string;
  population: number;
  region: string;
  capital: string;
}

const Card: React.FC<ICard> = ({
  flags,
  name,
  population,
  region,
  capital,
}) => {
  return (
    <article className={styles.container}>
      <img
        src={flags.svg}
        loading="lazy"
        alt={flags?.alt ? flags?.alt : `${name} flag`}
        width="150px"
        className={styles.image}
      />
      <div className={styles.body}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.info}>
          <span className={styles.info__title}>Population:</span>
          <span className={styles.info__content}>{population}</span>
        </p>
        <p className={styles.info}>
          <span className={styles.info__title}>Region:</span>
          <span className={styles.info__content}>{region}</span>
        </p>
        <p className={styles.info}>
          <span className={styles.info__title}>Capital:</span>
          <span className={styles.info__content}>{capital}</span>
        </p>
      </div>
    </article>
  );
};

export default Card;

import React from "react";

import { Player } from "@lottiefiles/react-lottie-player";

import styles from "./EmptyState.module.scss";

interface IProps {
  message: string;
}

const EmptyState: React.FC<IProps> = ({ message }) => {
  return (
    <div className={styles.container} data-testid="empty_state_container">
      <Player
        src="https://assets4.lottiefiles.com/packages/lf20_RiLwoG.json"
        loop
        autoplay
        speed={1}
        style={{ width: "300px", height: "300px" }}
      />
      <h2 className={styles.content}>{message}</h2>
    </div>
  );
};

export default EmptyState;

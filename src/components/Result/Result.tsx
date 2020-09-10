import * as React from 'react';
import styles from './Result.module.scss';

interface ResultProps {
  imgSrc: string;
  name: string;
  onClick: () => void;
}

const Result: React.FC<ResultProps> = ({ imgSrc, name, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div
        className={styles.img}
        style={{
          backgroundImage: `url(${imgSrc})`,
        }}></div>
      <div className={styles.info}>
        <p className={styles.text}>{name}</p>
      </div>
    </div>
  );
};

const memoizedResult = React.memo(Result);

export default memoizedResult;

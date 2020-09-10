import * as React from 'react';
import styles from './Info.module.scss';

interface InfoProps {
  imgSrc: string;
  name: string;
  status: string;
  species: string;
  location: {
    name: string;
    url: string;
  };
}

const Info: React.FC<InfoProps> = ({
  imgSrc,
  name,
  status,
  species,
  location,
}) => {
  return (
    <div className={styles.container}>
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

export default Info;

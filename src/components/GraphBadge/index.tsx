import React from 'react';
import styles from './GraphBadge.module.scss';
import Image from 'next/image';

type Props = {
  title?: string;
  percentage?: string;
  subtitle?: string;
};

const GraphBadge: React.FC<Props> = ({
  title = 'Score Credit',
  percentage = '70%',
  subtitle = 'CPR & AED\nE-Certificate',
}) => {
  return (
    <div className={styles.graphBadge}>
      <p className={styles.title}>{title}</p>
      <div className={styles.graphWrapper}>
        <Image
          src="/assets/images/graph-icon.svg"
          alt="graph icon"
          width={84}
          height={50}
        />
      </div>

      <div className={styles.textWrapper}>
        <p className={styles.percent}>{percentage}</p>
        <p className={styles.subtitle}>
          {subtitle.split('\n').map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default GraphBadge;

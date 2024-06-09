import React from 'react';
import styles from './Wrapper.module.css';

interface Props {
  children: React.ReactNode;
}

export function Wrapper({ children }: Props) {
  return (
    <div className={styles.Wrapper}>
      {children}
    </div>
  );
}
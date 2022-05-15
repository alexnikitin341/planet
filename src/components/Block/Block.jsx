import styles from './Block.module.css';

const Block = ({ onConfirm, title, content, buttonContent, style }) => {
  return (
    <div className={styles.container} style={style}>
      <div className={styles.block}>
        <h2>{title}</h2>
        <p>{content}</p>
        {onConfirm && <button onClick={onConfirm}>{buttonContent}</button>}
      </div>
    </div>
  );
};

export default Block;

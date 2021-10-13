import Button from '../../../commonUi/Button/Button';
import styles from './ConfirmPopUp.module.scss';

const ConfirmPopUp = ({ onCancelClick, onConfirmClick }) => {
  return (
    <div className={styles.popUpContainer}>
      <div className={styles.content}>
        <h2 className={styles.title}>Подтвердить заказ</h2>
        <div className={styles.confirmWrapper}>
          <Button
            text="Подтвердить"
            onClick={onConfirmClick}
            linkTo="/order/view"
            width="177px"
            roundedOnSmallScreen
          />
        </div>
        <div className={styles.cancelWrapper}>
          <Button
            text="Вернуться"
            onClick={onCancelClick}
            canceling
            width="164px"
            roundedOnSmallScreen
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopUp;

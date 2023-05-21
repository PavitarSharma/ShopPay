import styles from "./style.module.scss";
import { DotLoader as Loader } from "react-spinners";

const DotLoader = ({ loading }) => {
  return (
    <div className={styles.loader}>
      <Loader color="#2f82ff" loading={loading} />
    </div>
  );
};

export default DotLoader;

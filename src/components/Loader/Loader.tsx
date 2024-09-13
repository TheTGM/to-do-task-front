import { Grid } from "react-loader-spinner";
import styles from "./Loader.module.css";
const Loader = () => {
  return (
    <div className="fixed inset-0 z-10">
      <div className="fixed inset-0 bg-zinc-800 opacity-65" />
      <div className={styles.loader}>
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#2563eb"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{ zIndex: "1" }}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default Loader;

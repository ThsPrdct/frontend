import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { addLike, removeLike, removeAllLikes } from "../reducers/likes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Timbers.module.css";

function Timbers(props) {
  const handleLaunch = () => {
    if (!user.token) {
      return;
    }

    fetch(`http://localhost:3000/users/canBookmark/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmark(props));
          } else {
            dispatch(addBookmark(props));
          }
        }
      });
  };

  return (
    <div className={styles.timbersContainer}>
      <div className={styles.timbersHeader}></div>
    </div>
  );
}

export default Timbers;

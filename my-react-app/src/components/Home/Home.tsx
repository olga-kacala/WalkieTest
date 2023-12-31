import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import { AppContext } from "../Providers/Providers";
import { useContext } from "react";

export function Home() {
  const {isLogged} = useContext(AppContext);
  
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      document.title = "Walkie - come back to me!";
    } else {
      document.title = "Walkie";
    }
  });
  return (
    <div>
      <section>
        <div className={isLogged ? classes.contentLogIn : classes.contentLogOut}>
          <div className={classes.text}>
            <h2>Connect with fellow dog owners for dog walking adventures!</h2>
            <p>
              Join our community and find the perfect walking buddy for your
              furry friend.
            </p>
          </div>
          <div>
            <Link className={classes.button} to="/Login">
              Get Started {"\uD83D\uDC36"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

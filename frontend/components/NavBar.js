import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCommentMedical,
  faComment,
  faComments,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => (
  <div className="nav-bar">
    <Link
      // as="/adaugareFeedback"
      href={{
        pathname: "../addFeedback/addFeedback",
        query: { data: props.data.id },
      }}
    >
      <div className="nav-button">
        <div className="icon">
          <FontAwesomeIcon icon={faCommentMedical} />
        </div>
        <span className="label">Adauga Feedback</span>
      </div>
    </Link>

    <Link
      // as="/yourFeedback"
      href={{
        pathname: "../yourFeedback/yourFeedback",
        query: { data: props.data.id },
      }}
    >
      <div className="nav-button">
        <div className="icon">
          <FontAwesomeIcon icon={faComment} />
        </div>
        <span className="label">Feedback-uL tau</span>
      </div>
    </Link>

    <Link
      href={{
        pathname: "../alllFeedbacks/allFeedbacks",
        query: { data: props.data.id },
      }}
    >
      <div className="nav-button">
        <div className="icon">
          <FontAwesomeIcon icon={faComments} />
        </div>
        <span className="label">Feedback Rute</span>
      </div>
    </Link>

    <Link
      // as="/profile"
      href={{ pathname: "../profile/profile", query: { data: props.data.id } }}
    >
      <div className="nav-button">
        <div className="icon">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <span className="label">Profile</span>
      </div>
    </Link>

    <Link href="/">
      <div className="nav-button">
        <div className="icon">
          <FontAwesomeIcon icon={faSignOutAlt} />
        </div>
        <span className="label">Log-out</span>
      </div>
    </Link>
  </div>
);

export default NavBar;

import { useContext, useEffect, useRef } from "react";
import {
  DashboardContext,
  DashboardDispatch,
} from "../contexts/DashboardContext";
import { Button } from "@mui/material";
import documentStatus from "../utils/documentStatus";
import dateParser from "../utils/dateParser";
import axios from "axios";
import { peekaboo } from "../PEEKABOO";
import { io } from "socket.io-client";

export default function ViewRequestApplication({ application }) {
  const applicationStatus = documentStatus(
    application.steps[application.steps.length - 1].step
  );
  const { user } = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatch);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
    socket.current.on("getNotify", (data) => {
      console.log(data);
    });
  }, [user]);

  const handleOpenRequestDrawer = async () => {
    if (application.steps[application.steps.length - 1].step === 1) {
      var response = await changeFirstApplicationStatus();
      if (response.status === 203) {
        dispatch({
          type: "CHANGE_APPLICATION_STATUS",
          application: response.data,
        });
        dispatch({ type: "OPEN_FULL_MODAL", index: 1, view: application });
      }
    } else {
      dispatch({ type: "OPEN_FULL_MODAL", index: 1, view: application });
    }
  };

  async function changeFirstApplicationStatus() {
    const response = await axios.patch(
      `${peekaboo}/document/stepOne`,
      { documentId: application._id },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    let data;
    const step = response.data.steps[response.data.steps - 1].step;
    switch (step) {
      case 1:
        data = {
          userId: application.declarant_id,
          documentId: application._id,
          header: "Bu header",
          body: "Bu body",
          header: "Bu header",
          body: "Bu body",
        };
        break;
      case 2:
        data = {
          userId: application.client_id,
          documentId: application._id,
          header: "Bu header",
          body: "Bu body",
        };
        break;
      case 3:
        data = {
          userId: application.client_id,
          documentId: application._id,
          header: "Bu header",
          body: "Bu body",
        };
        break;
      case 4:
        data = {
          userId: application.client_id,
          documentId: application._id,
          header: "Bu header",
          body: "Bu body",
        };
        break;
      case 5:
        data = {
          userId: application.accountant_id,
          documentId: application._id,
          header: "Bu header",
          body: "Bu body",
        };
        break;
      case 6:
        data = {
          userId: application.declarant_id,
          documentId: application._id,
          header: "Bu header",
          body: "Bu body",
        };
        break;
      case 7:
        data = {
          userId: application.client_id,
          documentId: application._id,
          header: "Bu header",
          body: "Bu body",
        };
        break;
      case 8:
        data = {
          userId: application.accountant_id,
          documentId: application._id,
          header: "Bu header",
          body: "Bu body",
        };
        break;
      case 9:
        data = {
          userId: application.client_id,
          documentId: application._id,
          header: "Bu header",
          body: "Bu body",
        };
        break;
      case 10:
        data = {
          userId: application.client_id,
          documentId: application._id,
          header: "Bu header",
          body: "Bu body",
        };
        break;
      case 11:
        data = {
          userId: application.client_id,
          documentId: application._id,
          header: "Bu header",
          body: "Bu body",
        };
        break;
      default:
        console.log("Completed mission");
    }

    await axios.post(`${peekaboo}/notify`, data);

    socket.current.emit("sendNotify", data);

    return response;
  }

  return (
    <div className={`application__submits`}>
      <div className="application__request">
        <div className="application__request--info">
          <h3 className="submission-info">
            Заявка №
            <span className="submission-info__id">{application.UUID}</span> ‟
            <span className="submission-info__name">{application.name}</span>”
          </h3>
          <p className="submission-date text-disabled">
            {dateParser(application.createdAt)}
          </p>
        </div>
        <div className={"application__request--status"}>
          <Button
            className={`status-view-button app-button circle--${applicationStatus.class}`}
            onClick={handleOpenRequestDrawer}
          >
            {applicationStatus.text}
          </Button>
        </div>
      </div>
    </div>
  );
}

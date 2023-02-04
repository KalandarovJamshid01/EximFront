import { useState, useRef, useEffect, useContext } from "react";
import { AppViewDispatch, AppViewContext } from "../contexts/AppViewContext";
import ViewSubmit from "../pages/app/submission/viewSubmit";
import DoneSubmit from "../pages/app/submission/doneSubmit";
import { Button } from "@mui/material";
import { KeyboardArrowDownOutlined as ArrowDown } from "@mui/icons-material";
import documentStatus from "../utils/documentStatus";
import { v4 as uuid } from "uuid";
import dateParser from "../utils/dateParser";
import { io } from "socket.io-client";

export default function Application({ application, open }) {
  const applicationRef = useRef(null);
  const responsePreviewRef = useRef(null);
  const dispatch = useContext(AppViewDispatch);
  const lastStatus = application.steps[application.steps.length - 1].step;
  const applicationStatus =
    lastStatus >= 12
      ? { text: "ERROR", class: "closed" }
      : documentStatus(lastStatus);
  const [accordion, toggleAccordion] = useState(
    applicationStatus.class === "closed" && true
  );

  //Socket
  const { user } = useContext(AppViewContext);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  const handleChangeDrawer = () => {
    if (application.steps[application.steps.length - 1].step === 11)
      dispatch({
        type: "DRAWER_OPEN_MINI",
        content: <DoneSubmit document={application} />,
      });
    else
      dispatch({
        type: "DRAWER_OPEN_FULL",
        content: <ViewSubmit document={application} />,
      });
  };

  useEffect(() => {
    if (accordion)
      applicationRef.current.style.height = `${
        applicationRef.current.scrollHeight + 24
      }px`;
    else applicationRef.current.style.height = "92px";
  }, [accordion]);

  return (
    <div
      className={`application__submits ${accordion && "submits-open"}`}
      ref={applicationRef}
    >
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
        <div className="application__request--status">
          <Button
            className={`status-view-button circle--${applicationStatus.class} app-button`}
            onClick={handleChangeDrawer}
          >
            {applicationStatus.text}
          </Button>
          <Button
            onClick={() => toggleAccordion(!accordion)}
            className={`status-button app-button ${
              accordion && "status-button-rotating"
            }`}
          >
            <ArrowDown />
          </Button>
        </div>
      </div>
      <div className={`response__preview`} ref={responsePreviewRef}>
        <div className="response__preview--response">
          <h3 className={`response-alert ${applicationStatus.class}`}>
            Не хватает документов
          </h3>
          <ul className="response-alert--warnings">
            <li key={uuid()} className="text-disabled">
              <span className="warning-subtitle">
                Причина отклюнения заявки:{" "}
              </span>
              Не хватает документов
            </li>
            <li key={uuid()} className="text-disabled">
              <span className="warning-subtitle">
                Причина отклюнения заявки:{" "}
              </span>{" "}
              Не отгрузочных документов
            </li>
          </ul>
        </div>
        <div className="response__preview--comment">
          <h3 className="response-comment">Комментарий к заявки: </h3>
          <p className="response-comment--message text-disabled">
            Товариши! Укрепления и развитие структуры позваляет выполънатъ
            важные задания по разработке новых предложений
          </p>
        </div>
      </div>
    </div>
  );
}

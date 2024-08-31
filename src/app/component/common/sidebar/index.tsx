import React, { useState } from "react";
import "./sidebar.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { log } from "console";
import Avatar from "../avatar";
import { CiViewList } from "react-icons/ci";
import { CgList } from "react-icons/cg";
import useSidebar from "./useSidebar";
import { removeSessionId } from "@/utils/helper";
import TooltipWrapper from "../tooltip";

type SidebarProps = {
  children: React.ReactNode;
  userId: any;
  sessionId: any;
  fetchDataForSession: any;
  initiateNewChat: any;
};
const items = [
  "New Chat New Chat New Chat New Chat",
  "What is basketball ?",
  "Who are you ?"
];

const Sidebar: React.FC<SidebarProps> = ({
  children,
  userId,
  sessionId,
  fetchDataForSession,
  initiateNewChat
}) => {
  const { data, loading, error, toggleSidebar, isOpen, setIsOpen, isMobile } =
    useSidebar({ userId, sessionId });

  return (
    <div className={`layout ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div
          className="sidebar-logo"
          style={{
            padding: isOpen ? "16px" : "16px 0px",
            alignItems: isOpen ? "normal" : "center"
          }}
        >
          {!isMobile && (
            <div
              className="toggle-btn-wrapper"
              style={{
                justifyContent: isOpen ? "flex-end" : "center"
              }}
            >
              <button onClick={toggleSidebar} className="toggle-btn">
                {isOpen ? (
                  <FaArrowLeft className="toggle-btn-icon" />
                ) : (
                  <FaArrowRight className="toggle-btn-icon" />
                )}
              </button>
            </div>
          )}
          <p
            className="sidebar-title"
            style={{
              textAlign: isOpen ? "start" : "center"
            }}
          >
            {isOpen ? "Ballogy." : "B."}
          </p>

          {isOpen ? (
            <div
              className="sidebar-button-wrapper"
              style={{
                display: isOpen ? "flex" : "none"
              }}
              onClick={() => initiateNewChat()}
            >
              <div className="create-icon">
                <GoPlus className="toggle-btn-icon" />
              </div>
              New Chat
            </div>
          ) : (
            <TooltipWrapper id="new-chat-tooltip" content="New Chat">
              <div
                className="create-icon"
                style={{
                  marginTop: isOpen ? "0px" : "20px",
                  marginRight: isOpen ? "6px" : "0px"
                }}
                onClick={() => initiateNewChat()}
              >
                <GoPlus className="toggle-btn-icon" />
              </div>
            </TooltipWrapper>
          )}
        </div>
        <div
          className="sidebar-content"
          style={{
            padding: isOpen ? "16px" : "0px"
          }}
        >
          {data?.length > 0 && (
            <div
              className="recent_text"
              style={{
                display: isOpen ? "flex" : "none"
              }}
            >
              Recent
            </div>
          )}
          {data?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={`sidebar-content-item-wrapper ${
                  sessionId === item.sessionId && "active_wrapper"
                }`}
                style={{
                  justifyContent: isOpen ? "start" : "center"
                }}
                onClick={() => {
                  removeSessionId();
                  fetchDataForSession(item.sessionId);
                }}
              >
                {isOpen ? (
                  <>
                    <div className="sidebar-content-icon">
                      <CgList className="toggle-btn-icon" />
                    </div>
                    <div
                      className={`sidebar-content-text ${
                        sessionId === item.sessionId && "active_text"
                      }`}
                    >
                      {item.msg}
                    </div>{" "}
                  </>
                ) : (
                  <TooltipWrapper
                    id={`Tooltip-list-${index}`}
                    content={item.msg}
                  >
                    <div className="sidebar-content-icon">
                      <CgList className="toggle-btn-icon" />
                    </div>
                  </TooltipWrapper>
                )}
              </div>
            );
          })}
        </div>
        <div
          className="sidebar-footer"
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
            padding: isOpen ? "16px" : "16px 0px"
          }}
        >
          <Avatar
            isOnline="active"
            user={"Human"}
            style={{
              marginRight: "0px"
            }}
          />
          <span
            style={{
              display: isOpen ? "block" : "none"
            }}
            className="footerText"
          >
            You
          </span>
        </div>
      </div>
      <div className="main-content">{children}</div>
    </div>
  );
};

export default Sidebar;

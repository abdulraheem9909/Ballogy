import React from "react";
import { FiUser } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import Image from "next/image";
import logoIcon from "../../../../assets/logo.svg";
import "./avatar.css";

interface AvatarProps {
  image?: string;
  isOnline: boolean | string;
  user?: string;
  style?: any;
  name?: string;
}

const Avatar: React.FC<AvatarProps> = ({ image, isOnline, user, style }) => {
  return (
    <div
      className={`avatar ${user === "AI" && "avatar_AI"}`}
      style={style && style}
    >
      <div className="avatar-img">
        {user === "AI" ? (
          <Image priority src={logoIcon} alt="Logo" />
        ) : image ? (
          <Image priority src={logoIcon} alt="Follow us on Twitter" />
        ) : (
          <span className="avatrText">Y</span>
        )}
      </div>
    </div>
  );
};

export default Avatar;

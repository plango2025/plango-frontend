// components/CommonSidebar/CommonSidebar.tsx
import { AiFillHome } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

import {
  SidebarContainer,
  SidebarLogo,
  IconList,
  IconItem,
  LogoContainer,
} from "./Sidebar.styles";
import travelIcon from "@assets/images/icons/travel.png";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <SidebarContainer>
      <LogoContainer>
        <SidebarLogo src={travelIcon} alt="logo" />
      </LogoContainer>

      <IconList>
        <IconItem onClick={() => navigate("/")}>
          <AiFillHome />
        </IconItem>

        <IconItem onClick={() => navigate("/schedule")}>
          <BsStars />
        </IconItem>

        <IconItem onClick={() => navigate("/reviews")}>
          <IoShareSocialSharp />
        </IconItem>

        <IconItem>
          <FaUser />
        </IconItem>
        {/* 알림 기능 생기면 넣기 */}
        {/* <IconItem>
          <svg
            width="38"
            height="43"
            viewBox="0 0 38 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.7503 0.834961C11.3503 0.834961 6.2503 5.93498 6.2503 13.335C6.2503 14.3454 6.2503 15.4183 6.2503 17.5017C6.2503 19.585 5.91281 20.71 4.7524 21.6684C4.62115 21.7767 4.07113 22.2496 3.90655 22.385C1.27113 24.5642 -0.0226175 26.6059 0.000299133 30.0017C0.0169658 32.2476 1.86072 34.1913 4.16697 34.1684H12.8982C12.8982 34.1684 12.5003 35.4413 12.5003 36.2517C12.5003 39.7038 15.2982 42.5018 18.7503 42.5018C22.2024 42.5018 25.0003 39.7038 25.0003 36.2517C25.0003 35.4413 24.6191 34.1684 24.6191 34.1684H33.3336C35.6336 34.1746 37.4982 32.2601 37.5003 30.0017C37.5045 26.6309 36.1961 24.5538 33.5941 22.385C33.4232 22.2413 32.8191 21.7809 32.6836 21.6684C31.5482 20.7225 31.2503 19.585 31.2503 17.5017C31.2503 14.8975 31.2503 13.335 31.2503 13.335C31.2503 5.93498 26.1503 0.834961 18.7503 0.834961ZM18.7503 34.1684C19.9003 34.1684 20.8336 35.1017 20.8336 36.2517C20.8336 37.4017 19.9003 38.3351 18.7503 38.3351C17.6003 38.3351 16.667 37.4017 16.667 36.2517C16.667 35.1017 17.6003 34.1684 18.7503 34.1684Z"
              fill="#919294"
            />
          </svg>
        </IconItem> */}
      </IconList>
    </SidebarContainer>
  );
}

export default Sidebar;

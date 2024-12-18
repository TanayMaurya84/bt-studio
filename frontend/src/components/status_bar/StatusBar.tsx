import { useContext, useEffect } from "react";
import { OptionsContext } from "../options/Options";

import "./StatusBar.css";

import { ReactComponent as TerminalIcon } from "./img/terminal.svg";
import { ReactComponent as SimulatorIcon } from "./img/gazebo.svg";
import CommsManager from "../../api_helper/CommsManager";

const StatusBar = ({
  showSim,
  setSimVisible,
  showTerminal,
  setTerminalVisible,
  manager,
  dockerData
}: {
  showSim: boolean;
  setSimVisible: Function;
  showTerminal: boolean;
  setTerminalVisible: Function;
  manager: CommsManager;
  dockerData:{
    gpu_avaliable: string;
    robotics_backend_version: string;
    ros_version: string;
  }|null;
}) => {
  // Settings
  const settings = useContext(OptionsContext);

  return (
    <div className="status-bar-container">
      <button
        className={
          showTerminal ? `status-bar-button-active` : `status-bar-button`
        }
        onClick={() => {
          setTerminalVisible(!showTerminal);
        }}
        title="Toggle console"
      >
        <TerminalIcon className="status-bar-icon" stroke={"var(--icon)"} />
      </button>
      <button
        className="status-bar-button"
        onClick={() => {}}
        title="Toggle console"
      >
        <TerminalIcon className="status-bar-icon" stroke={"var(--icon)"} />
        {dockerData && 
          <label className="status-bar-label">{dockerData.robotics_backend_version}</label>
        }
      </button>
      <button
        className={showSim ? `status-bar-button-active` : `status-bar-button`}
        onClick={() => {
          setSimVisible(!showSim);
        }}
        title="Toggle Simulator"
        style={{ marginLeft: "auto", width: "300px" }}
      >
        <SimulatorIcon className="status-bar-icon" stroke={"var(--icon)"} />
        <label className="status-bar-label">Simulator</label>
      </button>
    </div>
  );
};

export default StatusBar;

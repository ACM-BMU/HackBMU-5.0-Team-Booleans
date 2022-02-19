import { Popover } from "react-bootstrap";
import { IoLogoPython } from "react-icons/io";
import { IoLogoReact } from "react-icons/io5";
import { SiFlutter } from "react-icons/si";

const TeamPopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Team Details</Popover.Header>
      <Popover.Body className="d-flex flex-column justify-content-center align-items-center">
        <span className="mb-1">Designed and Developed by,</span>
        <span className="w-100 d-flex justify-content-between"><a href="https://linkedin.com/" target="_blank"><strong>Shivam Singh</strong></a><IoLogoReact color={"#0d6efd"} size={20} /> </span>
        <span className="w-100 d-flex justify-content-between"><a href="https://linkedin.com/" target="_blank"><strong>Yash Joshi</strong></a><SiFlutter color={"#0d6efd"} size={20} /></span>
        <span className="w-100 d-flex justify-content-between"> <a href="https://linkedin.com/" target="_blank"><strong>Rahul Agrahari</strong></a><IoLogoPython color={"#0d6efd"} size={20} /></span>
      </Popover.Body>
    </Popover>
  );
export default TeamPopover;
import { useNavigate } from "react-router-dom";
import "../assets/styles/header.css";

export default function Header() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/login");
  };

  return (
    <header className="header p-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="h3 mb-0 logo">CitizenConnect360</div>
          <button onClick={handleGetStartedClick}>
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}

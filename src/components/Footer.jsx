import '../assets/styles/footer.css';

export default function Footer() {
  return (
    <footer className="text-white text-center py-3">
      <div className="container">
        <div className="d-flex justify-content-center gap-4 mb-3">
          <a href="#" className="text-white text-decoration-none">About Us</a> |
          <a href="#" className="text-white text-decoration-none">Contact</a> |
          <a href="#" className="text-white text-decoration-none">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
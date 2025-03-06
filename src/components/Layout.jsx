import Header from "./Header";
import Footer from "./Footer";
import UserHeader from "./UserHeader";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
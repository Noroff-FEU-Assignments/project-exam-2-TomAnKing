import NavBar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className="container">{children}</div>
    </>
  );
}

import Nav from "./Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      <div className="flex">
        <div className="w-1/5"></div>
        <div className="w-3/5">{children}</div>
        <div className="w-1/5 bg-white border-l-2 h-[calc(100vh-5rem)] sticky top-12"></div>
      </div>
    </>
  );
};

export default Layout;

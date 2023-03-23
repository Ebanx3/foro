import Nav from "./Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      <div className="lg:flex">
        <div className="xl:w-1/5 "></div>
        <div className="w-12/12 lg:w-4/5 xl:w-3/5">{children}</div>
        <div className="lg:w-1/5 lg:block hidden  bg-white border-l-2 h-[calc(100vh-5rem)] sticky top-12 p-4 ">
          
        </div>
      </div>
    </>
  );
};

export default Layout;

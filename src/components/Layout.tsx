import Nav from "./Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      <div className="lg:flex">
        <div className="xl:w-1/5 "></div>
        <div className=" w-full xl:w-3/5 m-auto">{children}</div>
        <div className="xl:w-1/5 "></div>
      </div>
    </>
  );
};

export default Layout;

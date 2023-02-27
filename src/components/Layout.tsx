import Nav from "./Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      <div className="flex">
        <div className="w-1/5"></div>
        <div className="w-3/5">{children}</div>
        <div className="w-1/5 bg-white border-l-2 h-[calc(100vh-5rem)] sticky top-12 p-4">
          <span className="text-lg uppercase font-bold">cosas por hacer</span>
          <ol>
            <li> - editar y borrar mensajes</li>
            <li> - subir avatar vercel nextjs</li>
            <li> - compartir posts en likedin</li>
            <li> - seguridad y persistencia de login</li>
            <li> - que poner en index</li>
            <li> - trabajo de seo y paginación</li>
            <li> - sistema de logros</li>
            <li> - trabajar resposive</li>
            <li> - evaluar publicidad?</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default Layout;

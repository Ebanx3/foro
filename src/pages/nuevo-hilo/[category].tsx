import { useContext, useState, useRef } from "react";
import { context } from "@/UserContext";
import { useRouter } from "next/router";
import { Remarkable } from "remarkable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import InfoText from "@/components/InfoText";
import Nav from "@/components/Nav";
import dbConnect from "@/lib/dbConnect";

const md = new Remarkable();

const NewThread = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("comun");
  const [preview, setPreview] = useState(false);
  const { user, setUser }: any = useContext(context);

  const route = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [showInfo, setShowInfo] = useState(false);

  const handleNewThread = async () => {
    if (title != "" && content != "") {
      await dbConnect();
      const response = await fetch("/api/thread", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          title,
          ownerInfo: { name: user.username, userId: user.userId },
          content,
          category: route.query.category,
          type,
        }),
      });

      const data = await response.json();

      if (data.message === "Unauthorized") {
        setUser({});
      }

      if (!data.success) {
        return console.log("fallo intentado crear un nuevo hilo");
      }

      route.push("/");
    } else {
      console.log("show alert title and content must have something");
    }
  };

  const handleFormatButton = async (mdCode: string) => {
    const cursorPosition = textAreaRef.current?.selectionStart || 0;
    const newString =
      content.substring(0, cursorPosition) +
      mdCode +
      content.substring(cursorPosition, content.length);

    setContent(newString);

    await textAreaRef.current?.focus();

    textAreaRef.current?.setSelectionRange(
      cursorPosition + 2,
      cursorPosition + 2
    );
  };

  const handleShowInfo = () => {};
  return (
    <>
      <Nav />
      <div className="flex flex-col justify-center items-center">
        <h2 className="my-4 text-3xl uppercase">Crear nuevo hilo</h2>
        <form className="flex flex-col bg-white p-8 w-2/4 rounded-lg">
          <label className="mt-4 font-bold mb-1" htmlFor="title">
            Título del nuevo hilo:
          </label>
          <input
            className="p-2 border-2 border-slate-400 bg-slate-100"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div className="flex mt-4 justify-between items-center mb-1 relative">
            <label className=" font-bold" htmlFor="message">
              Mensaje:
            </label>
            <FontAwesomeIcon
              icon={regular("circle-question")}
              className="cursor-pointer hover:text-slate-600"
              onClick={() => {
                showInfo ? setShowInfo(false) : setShowInfo(true);
              }}
            />
            {showInfo ? <InfoText /> : <></>}
          </div>
          <div className="bg-slate-100 border-t-2 border-l-2 border-r-2 border-slate-400">
            <button
              className="font-bold border-r-2 border-b-2 px-2 hover:bg-slate-300"
              onClick={(e) => {
                e.preventDefault();
                handleFormatButton("****");
              }}
            >
              <FontAwesomeIcon icon={solid("bold")} />
            </button>
            <button
              className="font-bold border-r-2 border-b-2 px-2 hover:bg-slate-300"
              onClick={(e) => {
                e.preventDefault();
                handleFormatButton("**");
              }}
            >
              <FontAwesomeIcon icon={solid("italic")} />
            </button>
            <button
              className="font-bold border-r-2 border-b-2 px-2 hover:bg-slate-300"
              onClick={(e) => {
                e.preventDefault();
                handleFormatButton("[<text>](<url>)");
              }}
            >
              <FontAwesomeIcon icon={solid("link")} />
            </button>
            <button
              className="font-bold border-r-2 border-b-2 px-2 hover:bg-slate-300"
              onClick={(e) => {
                e.preventDefault();
                handleFormatButton("![<alt>](<url>)");
              }}
            >
              <FontAwesomeIcon icon={regular("image")} />
            </button>
            <button
              className="font-bold border-r-2 border-b-2 px-2 hover:bg-slate-300"
              onClick={(e) => {
                e.preventDefault();
                handleFormatButton("~~~\n<codigo>\n~~~");
              }}
            >
              <FontAwesomeIcon icon={solid("code")} />
            </button>
          </div>
          <textarea
            className="p-2 resize-none border-b-2 border-l-2 border-r-2 border-slate-400 bg-slate-100 focus:outline-none"
            name="message"
            id="message"
            cols={30}
            rows={10}
            ref={textAreaRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <label className="mt-4 font-bold mb-1" htmlFor="typeSelect">
            Tipo:
          </label>
          <select
            name="type"
            className="p-2 border-2 border-slate-400 bg-slate-100"
            id="typeSelect"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="comun">Común</option>
            <option value="tutorial">Tutorial</option>
            <option value="consulta">Consulta</option>
          </select>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="bg-rose-500 p-2 hover:bg-rose-400 text-white rounded-md"
              onClick={() => {
                setPreview(true);
              }}
            >
              Previsualizar
            </button>
            <button
              type="button"
              className="bg-rose-700 p-2 hover:bg-rose-600 text-white rounded-md ml-4"
              onClick={() => {
                handleNewThread();
              }}
            >
              Enviar
            </button>
          </div>
        </form>

        {preview ? (
          <div className="bg-white mt-4 py-4 px-6 w-3/4 message">
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: md.render(content) }}></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default NewThread;

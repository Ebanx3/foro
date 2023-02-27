import React, { useContext, useState } from "react";
import { context } from "@/UserContext";
import { useRouter } from "next/router";
import { Remarkable } from "remarkable";

const md = new Remarkable();

const NewThread = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("comun");
  const [preview, setPreview] = useState(false);
  const { user }: any = useContext(context);

  const route = useRouter();

  const handleNewThread = async () => {
    if (title != "" && content != "") {
      const response = await fetch("/api/thread", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          title,
          ownerInfo: { name: user.username },
          content,
          category: route.query.category,
          type,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        return console.log("fallo intentado crear un nuevo hilo");
      }
      console.log(data);
      route.push("/");
    } else {
      console.log("show alert title and content must have something");
    }
  };

  return (
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
        <label className="mt-4 font-bold mb-1" htmlFor="message">
          Mensaje:
        </label>
        <div className="bg-zinc-100">
          <button className="font-bold border-2 px-2">b</button>
        </div>
        <textarea
          className="p-2 resize-none border-2 border-slate-400 bg-slate-100"
          name="message"
          id="message"
          cols={30}
          rows={10}
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
  );
};

export default NewThread;

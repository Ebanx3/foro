import { useContext, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Remarkable } from "remarkable";
import { useRouter } from "next/router";
import { context } from "@/UserContext";

const md = new Remarkable();

const EditingMessage = ({
  message,
  setEditing,
  setMsg,
  msg,
  title,
  deleteMessage,
}: any) => {
  const [content, setContent] = useState<string>(message.content);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const route = useRouter();
  const { user, setUser }: any = useContext(context);
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

  const handleDeleteMessage = async () => {
    try {
      const res = await fetch(`/api/message/${message.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "Application/json" },
      });

      const response = await res.json();
      if (response.message === "Unauthorized") {
        setUser({});
      }
      deleteMessage(message.id);
      setEditing(false);
    } catch (error) {
      route.push("/");
    }
  };

  const handleConfirmEdit = async () => {
    try {
      const res = await fetch(`/api/message/${message.id}`, {
        method: "PUT",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ content }),
      });
      const resp = await res.json();

      console.log(resp);
      if (resp.success) {
        setMsg({ ...msg, content });
        setEditing(false);
        // route.push(`/hilo/${route.query.title}`);
      }
    } catch (error) {
      route.push("/");
    }
  };

  return (
    <>
      <form className="p-4 border-b-2">
        <div className="bg-slate-100 w-11/12 border-t-2 border-l-2 border-r-2 border-slate-400">
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
          className="p-2 resize-none w-11/12 border-b-2 border-l-2 border-r-2 border-slate-400 bg-slate-100 focus:outline-none"
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
        <div className="mt-4 flex justify-end">
          {!title ? (
            <button
              type="button"
              className="bg-rose-500 p-2 hover:bg-rose-400 text-white rounded-md"
              onClick={() => {
                handleDeleteMessage();
              }}
            >
              Eliminar
            </button>
          ) : (
            <></>
          )}
          <button
            type="button"
            className="bg-rose-500 p-2 hover:bg-rose-400 text-white rounded-md ml-4"
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="bg-rose-700 p-2 hover:bg-rose-600 text-white rounded-md ml-4"
            onClick={() => {
              handleConfirmEdit();
            }}
          >
            Confirmar
          </button>
        </div>
      </form>
      <div className="bg-white mt-4 py-4 px-6 message">
        <div dangerouslySetInnerHTML={{ __html: md.render(content) }}></div>
      </div>
    </>
  );
};

export default EditingMessage;

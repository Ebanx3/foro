import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useRef, useContext } from "react";
import { Remarkable } from "remarkable";
import { context } from "@/UserContext";

const md = new Remarkable();

const Answer = ({ thread, setAnswer, addMessage }: any) => {
  const [content, setContent] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleConfirmAnswer = async () => {
    const res = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userInfo: { name: user.username, userId: user.userId },
        content,
        threadId: thread.id,
      }),
    });
    const response = await res.json();
    console.log(response);
    if (response.success) {
      setAnswer(false);
      const formatedMessage = {
        id: response.data._id.toString(),
        userInfo: response.data.userInfo,
        content: response.data.content,
        likes: response.data.likes,
        createdAt: response.data.createdAt.toString(),
        updatedAt: response.data.updatedAt.toString(),
      };
      addMessage(formatedMessage);
      // window.location.reload();
    }
    if (response.message === "Unauthorized") {
      setUser({});
    }
  };

  return (
    <div>
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
          <button
            type="button"
            className="bg-rose-500 p-2 hover:bg-rose-400 text-white rounded-md"
            onClick={() => {
              setAnswer(false);
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="bg-rose-700 p-2 hover:bg-rose-600 text-white rounded-md ml-4"
            onClick={() => {
              handleConfirmAnswer();
            }}
          >
            Confirmar
          </button>
        </div>
      </form>
      <div className="bg-white mt-4 py-8 px-6 message">
        <span className="font-bold text-lg block text-zinc-500 border-b-2">
          Previsualización
        </span>
        <div
          dangerouslySetInnerHTML={{
            __html: md.render(content),
          }}
        ></div>
      </div>
    </div>
  );
};

export default Answer;

import ThreadModel from "../../database/models/thread";
import MessageModel from "../../database/models/message";
import Message from "@/components/Message";
import { useContext, useState, useEffect } from "react";
import { context } from "@/UserContext";
import Layout from "@/components/Layout";
import Answer from "@/components/Answer";
import dbConnect from "@/lib/dbConnect";

const Hilo = ({ firstMessage, messages, thread }: any) => {
  const { user }: any = useContext(context);

  const [answer, setAnswer] = useState(false);
  const [msgs, setMsgs] = useState(messages);

  const deleteMessage = async (messageId: string) => {
    const index = msgs.findIndex((elem: any) => elem.id == messageId);
    if (index < 0) return;
    const newMsgs = [...msgs];
    await newMsgs.splice(index, 1);
    setMsgs(newMsgs);
  };

  const addMessage = (message: any) => {
    const newMsgs = msgs;
    newMsgs.push(message);
    setMsgs(newMsgs);
  };

  useEffect(() => {}, [msgs]);
  return (
    <Layout>
      <div className="flex flex-col w-11/12  mx-auto my-8">
        <Message
          message={firstMessage}
          title={thread.title}
          type={thread.type}
        />
        {user.username ? (
          <button
            className="py-1 px-2 bg-cyan-600 self-end text-white rounded-full hover:bg-black my-4"
            onClick={() => setAnswer(true)}
          >
            Responder
          </button>
        ) : (
          <></>
        )}

        {answer ? (
          <Answer
            thread={thread}
            setAnswer={setAnswer}
            addMessage={addMessage}
          />
        ) : (
          <></>
        )}

        {msgs.map((mssg: any) => {
          return (
            <Message
              key={mssg.id}
              message={mssg}
              deleteMessage={deleteMessage}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(datos: any) {
  await dbConnect();
  const titleWithSpaces = datos.query.title.replace(/_/g, " ");

  const thread = await ThreadModel.findOne({ title: titleWithSpaces });

  const formatedThread = {
    id: thread._id.toString(),
    ownerInfo: thread.ownerInfo,
    title: thread.title,
    lastCommenter: thread.lastCommenter,
    type: thread.type,
    createdAt: thread.createdAt.toString(),
    updatedAt: thread.updatedAt.toString(),
  };

  const messages = await MessageModel.find({ threadId: thread._id });

  // const formatedMessage = (msg: string): string => {
  //   const res = msg.replace(/\n/g, "<br />");
  //   return res;
  // };

  const formatedMessages = messages.map((msg) => {
    return {
      id: msg._id.toString(),
      userInfo: msg.userInfo,
      content: msg.content,
      likes: msg.likes,
      createdAt: msg.createdAt.toString(),
      updatedAt: msg.updatedAt.toString(),
    };
  });

  const firstMessage = formatedMessages.shift();

  return {
    props: {
      firstMessage: firstMessage,
      messages: formatedMessages,
      thread: formatedThread,
    },
  };
}

export default Hilo;

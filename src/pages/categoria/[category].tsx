import React from "react";

const Categoria = ({ categoria }: any) => {
  return <div>Categoria</div>;
};

export async function getServerSideProps() {
  console.log(process.env.DB_CONNECTION_URL);
  return {
    props: {
      categoria: null,
    },
  };
}

export default Categoria;

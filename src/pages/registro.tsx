import { Formik } from "formik";
import { useRouter } from "next/router";

const Registro = () => {
  const route = useRouter();

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);

          const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
              username: values.username,
              password: values.password,
              email: values.email,
            }),
            headers: { "Content-Type": "Application/json" },
          });

          const response = await res.json();
          console.log(response);
          if (response.success) {
            route.push("/");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col m-8 bg-zinc-200 rounded-2xl py-16"
          >
            <span className="uppercase text-2xl text-center mb-8">
              Nuevo Registro
            </span>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              className="mt-6 w-2/4 m-auto p-2 bg-white rounded-full pl-8 border-2 border-zinc-400 focus:outline-none"
              placeholder="Nombres"
            />
            {errors.username && touched.username && errors.username ? (
              <span className="absolute bg-red-600 text-white p-2">
                {errors.username}
              </span>
            ) : (
              <></>
            )}

            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="mt-6 w-2/4 m-auto p-2 bg-white rounded-full pl-8 border-2 border-zinc-400 focus:outline-none"
              placeholder="Email"
            />
            {errors.email && touched.email && errors.email ? (
              <span className="absolute bg-red-600 text-white p-2">
                {errors.email}
              </span>
            ) : (
              <></>
            )}

            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="mt-6 w-2/4 m-auto p-2 bg-white rounded-full pl-8 border-2 border-zinc-400 focus:outline-none"
              placeholder="Contraseña"
            />
            {errors.password && touched.password && errors.password ? (
              <span className="absolute bg-red-600 text-white p-2">
                {errors.password}
              </span>
            ) : (
              <></>
            )}

            <button
              className="mt-6 w-1/4 p-2 m-auto bg-cyan-600 hover:bg-cyan-500 text-white rounded-full"
              type="submit"
              disabled={isSubmitting}
            >
              CONFIRMAR
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Registro;

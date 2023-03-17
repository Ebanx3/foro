import { Formik } from "formik";
import { useRouter } from "next/router";
import Nav from "@/components/Nav";

const Registro = () => {
  const route = useRouter();

  return (
    <>
      <Nav />
      <div className="flex ">
        <div className="w-1/5"></div>
        <div className="w-3/5 relative">
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
              if (values.password.length < 8) {
                errors.password = "Password must contain at least 8 characters";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
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
                  placeholder="Username"
                />
                {errors.username && touched.username && errors.username ? (
                  <span className="absolute bottom-0 bg-red-600 text-white p-2">
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
                  <span className="absolute bottom-0 bg-red-600 text-white p-2">
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
                  <span className="absolute bg-red-600 bottom-0 text-white p-2">
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
        <div className="w-1/5"></div>
      </div>
    </>
  );
};

export default Registro;

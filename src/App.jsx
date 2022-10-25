import React, { useState, useEffect } from "react";
import { Form } from "./components/Form";
const emailRegexPattern = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

function App() {
  const [koders, setKoders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getKoders = async () => {
      const res = await fetch(`/koders/search?query=${searchQuery}`).then(
        (res) => res.json()
      );
      console.log(res);
      setKoders(res);
    };
    getKoders();
  }, [searchQuery]);

  const form = {
    name: {
      inputName: "name",
      hasErrors: (value) => {
        const isEmpty = value === "";

        return isEmpty;
      },
    },
    email: {
      inputName: "email",
      hasErrors: (value) => {
        const isEmail = emailRegexPattern.test(value);
        const isRepeated = koders.some((koder) => koder.email === value);
        return !isEmail || isRepeated;
      },
    },
    emailConfirmation: {
      inputName: "email-confirmation",
      hasErrors: (value, email) => {
        const doNotMatch = value !== email;
        return doNotMatch;
      },
    },
  };

  const addNewKoder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get(form.name.inputName);
    const email = formData.get(form.email.inputName);
    const emailConfirmation = formData.get(form.emailConfirmation.inputName);
    const nameHasErrors = form.name.hasErrors(name);
    const emailHasErrors = form.email.hasErrors(email);
    const emailConfirmationHasErrors = form.emailConfirmation.hasErrors(
      emailConfirmation,
      email
    );

    if (nameHasErrors) {
      return setError("Name is empty");
    }

    if (emailHasErrors) {
      return setError("Email input not valid or repeated");
    }

    if (emailConfirmationHasErrors) {
      return setError("Emails do not match");
    }
    const newKoder = {
      name,
      email,
    };

    fetch("/koders", { method: "POST", body: JSON.stringify(newKoder) })
      .then((res) => res.json())
      .then((res) => setKoders((prev) => [...prev, res]))
      .catch((err) => setError("Something went wrong"));
    setError("");
  };

  const deleteKoder = (id) => {
    fetch(`/koders/${id}`, { method: "DELETE", body: JSON })
      .then((res) => res.json())
      .then((id) =>
        setKoders((prev) => prev.filter((koder) => koder.id !== id))
      );
  };

  return (
    <main className="min-h-screen bg-gray-300">
      {error && (
        <article className="mx-auto fixed top-4 translate -translate-x-1/2 left-1/2 bg-red-500 text-red-900 w-max p-4 rounded-md">
          {error}
        </article>
      )}
      <div className="flex items-start text-center space-x-10 pt-20 text-lg w-[900px] mx-auto">
        <Form form={form} addNewKoder={addNewKoder} />
        <section className="flex flex-col space-y-4 w-[500px]">
          <label className="flex items-center space-x-4">
            <span>Search</span>
            <input
              className="rounded-md px-2 py-1"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id=""
            />
          </label>
          <ul className="flex flex-col space-y-5 text-left">
            {koders.map(({ id, name, email }) => (
              <li key={id}>
                <article className="bg-white rounded-lg shadow px-4 py-3">
                  <section className="flex justify-between">
                    <p>
                      <span className="font-bold">Nombre:</span> {name}
                    </p>
                    <button
                      className="ml-4 cursor-pointer"
                      onClick={() => deleteKoder(id)}
                    >
                      X
                    </button>
                  </section>
                  <p>
                    <span className="font-bold"> Correo:</span> {email}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default App;

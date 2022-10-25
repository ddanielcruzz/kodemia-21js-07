import React, { useState, useEffect } from "react";

const newKoder = {
  name: "Daniel",
  email: "daniel@kodemia.com",
  age: 20,
  generation: 21,
};

function App() {
  const [koders, setKoders] = useState([]);

  useEffect(() => {
    const getKoders = async () => {
      const res = await fetch("/koders").then((res) => res.json());
      console.log(res);
      setKoders(res);
    };
    getKoders();
  }, []);

  const addNewKoder = () => {
    fetch("/koders", { method: "POST", body: JSON.stringify(newKoder) })
      .then((res) => res.json())
      .then((res) => setKoders((prev) => [...prev, res]))
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <main className="min-h-screen bg-gray-300">
      <div className="flex flex-col items-center text-center space-y-4 pt-10 text-lg w-[400px] mx-auto">
        <ul className="flex flex-col space-y-5 text-left">
          {koders.map(({ id, name, email, age, generation }) => (
            <li key={id}>
              <article className="bg-white rounded-lg shadow px-4 py-3">
                <p>
                  <span className="font-bold">Nombre:</span> {name}
                </p>
                <p>
                  <span className="font-bold"> Correo:</span> {email}
                </p>
                <p>
                  <span className="font-bold">Edad:</span> {age}
                </p>
                <p>
                  <span className="font-bold">Generación:</span> {generation}
                </p>
              </article>
            </li>
          ))}
        </ul>
        <button onClick={addNewKoder}>Add</button>
      </div>
    </main>
  );
}

export default App;

import React from "react";

export const Form = ({ form, addNewKoder }) => {
  return (
    <form
      onSubmit={(event) => addNewKoder(event)}
      className="flex flex-col text-left w-full space-y-4 bg-white shadow rounded-md p-4"
    >
      <label className="flex justify-between">
        Nombre
        <input
          className="rounded-md px-2 py-1 bg-gray-300 border border-gray-400"
          name={form.name.inputName}
          type="text"
        />
      </label>
      <label className="flex justify-between ">
        Correo
        <input
          className="rounded-md px-2 py-1 bg-gray-300 border border-gray-400"
          name={form.email.inputName}
          type="text"
        />
      </label>
      <label className="flex justify-between">
        Confirmar correo
        <input
          className="rounded-md px-2 py-1 bg-gray-300 border border-gray-400"
          name={form.emailConfirmation.inputName}
          type="text"
        />
      </label>
      <input
        className="bg-purple-500 rounded-md py-3 text-purple-900 cursor-pointer"
        type="submit"
        value="Añadir Koder"
      />
    </form>
  );
};

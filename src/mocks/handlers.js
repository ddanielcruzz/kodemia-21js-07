import { rest } from "msw";
import localforage from "localforage";

let maxId = 3;

const initialKoders = [
  {
    id: "1",
    name: "Rodrigo",
    email: "rodrgio@kodemia.com",
    age: 20,
    generation: 21,
  },
  {
    id: "2",
    name: "Emanuel",
    email: "emanuel@kodemia.com",
    age: 20,
    generation: 21,
  },
  {
    id: "3",
    name: "Héctor",
    email: "hector@kodemia.com",
    age: 20,
    generation: 21,
  },
];

// localforage.clear();

const savedKoders = await localforage.getItem("koders");
const savedId = await localforage.getItem("maxId");

localforage.setItem("koders", savedKoders || initialKoders);
localforage.setItem("maxId", savedId || maxId);

export const handlers = [
  rest.get("/koders", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(savedKoders));
  }),
  rest.get("/koders/search", async (req, res, ctx) => {
    const query = req.url.searchParams.get("query")?.toLowerCase();
    const filterdKoders = savedKoders.filter((koder) =>
      koder.name.toLowerCase().includes(query)
    );
    return res(ctx.status(200), ctx.json(filterdKoders));
  }),
  rest.post("/koders", async (req, res, ctx) => {
    const body = await req.json();
    const koders = await localforage.getItem("koders");
    const maxId = await localforage.getItem("maxId");

    const newMaxId = maxId + 1;
    const newKoder = { id: `${newMaxId}`, ...body };
    const newKoders = [...koders, newKoder];

    // const luck = 0.5;
    const luck = Math.random();

    if (luck >= 0.5) {
      await localforage.setItem("koders", newKoders);
      await localforage.setItem("maxId", newMaxId);
      return res(ctx.status(200), ctx.json(newKoder));
    }

    return res(ctx.status(500, "There was an error. Please try again!"));
  }),
];

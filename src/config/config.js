import Connection from "../util/Connection.js";

export const connection = new Connection(process.env.REACT_APP_SERVER_URL)
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const mongooseconnect = require("./shared/mongoose");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const batchRouter = require("./routes/batch.routes");
const queryRouter = require("./routes/query.routes");
const assignRouter = require("./routes/assign.routes");
const unassignRouter = require("./routes/unassign.routes");
const converstationRouter = require("./routes/converstation.routes");

const errors = require("./middleware/errors");
const authUser = require("./middleware/authUser");
const logging = require("./middleware/logging");
const OnConnection = require("./services/socket.io/OnConnection");

// mongooseconnect();
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL },
});

app.use(cors());
app.use(express.json());

app.use(logging);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api/batch", authUser, batchRouter);
app.use("/api/query", authUser, queryRouter);

app.use("/api/assign", authUser, assignRouter);
app.use("/api/unassign", authUser, unassignRouter);

app.use("/api/converstation", authUser, converstationRouter);

app.use(errors);

io.of("/converstation").on("connection", OnConnection(io));

instrument(io, {
  auth: false,
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => console.log(`Listening to Port - ${PORT}`));


app.get("/", async (req, res) => {
  // for testing
  try {
    console.log("server working");
    res.status(200).json({ message: "working" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "error in server side" });
  }
});
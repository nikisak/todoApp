/*
fs-server (File System Server)
Managing users and todo's on file system based design.
Each user has .todo file with is unique name in /users-directory.
*/
require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const fs = require("fs");
const FILE_EXT = ".todo";
const FILE_PATH = "users-directory/";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const createResponse = (success, message, data) => ({ success, message, data });

const composeFilePath = (userName) => FILE_PATH + userName + FILE_EXT;

class UserService {
  addUser = (req, res) => {
    let user = req.body;
    if (this.isUserExists(user)) {
      res.json(
        createResponse(
          false,
          "User with name " + user.name + " already exists."
        )
      );
      return;
    }
    let todo = { ...user, tasks: [] };
    fs.writeFile(composeFilePath(user.name), JSON.stringify(todo), (err) => {
      if (err) {
        res.json(createResponse(false, "Failed to add user " + user.name));
      }
      res.json(
        createResponse(true, "User " + user.name + " added successfuly")
      );
    });
  };

  loginUser = (req, res) => {
    let user = req.body;
    fs.readFile(composeFilePath(user.name), "utf8", (err, data) => {
      if (err) {
        res.json(createResponse(false, "User " + user.name + " not found"));
      } else {
        let result = JSON.parse(data);
        if (result.password !== user.password) {
          res.json(createResponse(false, "Password is incorrect"));
        } else {
          res.json(createResponse(true, "Login Successfull", result));
        }
      }
    });
  };

  isUserExists = (user) => fs.existsSync(composeFilePath(user.name));
}

class TODOService {
  addTODO(req, res) {
    let user = req.body;
    fs.readFile(composeFilePath(user.name), "utf8", (err, data) => {
      if (err) {
        res.json(createResponse(false, "Failed to update tasks"));
      } else {
        let result = JSON.parse(data);
        result.tasks.push(user.task);
        fs.writeFile(
          composeFilePath(user.name),
          JSON.stringify(result),
          (err) => {
            if (err) {
              res.json(createResponse(false, "Failed to update tasks"));
              return;
            }
            res.json(
              createResponse(true, "Task updated successfuly", result.tasks)
            );
          }
        );
      }
    });
  }

  updateTODO(req, res) {
    let user = req.body;
    fs.readFile(composeFilePath(user.name), "utf8", (err, data) => {
      if (err) {
        res.json(createResponse(false, "Failed to update tasks"));
      } else {
        let result = JSON.parse(data);
        result.tasks = result.tasks.map((task) => {
          if (task.datetime === user.task.datetime) {
            return user.task;
          } else {
            return task;
          }
        });
        fs.writeFile(
          composeFilePath(user.name),
          JSON.stringify(result),
          (err) => {
            if (err) {
              res.json(createResponse(false, "Failed to update tasks"));
              return;
            }
            res.json(
              createResponse(true, "Task marked as completed.", result.tasks)
            );
          }
        );
      }
    });
  }

  deleteTODO(req, res) {
    let user = req.body;
    fs.readFile(composeFilePath(user.name), "utf8", (err, data) => {
      if (err) {
        res.json(createResponse(false, "Failed to update tasks"));
      } else {
        let result = JSON.parse(data);
        result.tasks = result.tasks.filter(
          (task) => task.datetime !== user.task.datetime
        );
        fs.writeFile(
          composeFilePath(user.name),
          JSON.stringify(result),
          (err) => {
            if (err) {
              res.json(createResponse(false, "Failed to update tasks"));
              return;
            }
            res.json(
              createResponse(true, "Task deleted successfuly", result.tasks)
            );
          }
        );
      }
    });
  }
}

let userService = new UserService();
let todoService = new TODOService();

router.post("/register", userService.addUser);
router.post("/login", userService.loginUser);

router.post("/addtodo", todoService.addTODO);
router.post("/updatetodo", todoService.updateTODO);
router.post("/deletetodo", todoService.deleteTODO);

app.use(router);

var server = app.listen(8009, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("server started on", host, port);
});

/** @format */

const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
let Joi = require("joi");

const app = express();

const storage = multer.diskStorage({
  destintaion: function (req, file, cb) {
    let destination = path.join(__dirname, "images");
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(
  session({
    name: "project3",
    secret: "blah",
    saveUninitialized: true,
    resave: false,
  })
);
//b80aff40085d38:432d1f77@eu-cdbr-west-03.cleardb.net/heroku_3f73110ec98405d?reconnect=true
var conn = mysql.createConnection({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "b80aff40085d38",
  database: "heroku_3f73110ec98405d",
  password: "432d1f77",
});

conn.connect();

app.get("/authlog", (req, res) => {
  res.render("profile", { layout: "default", user: req.session.googLogged });
});

app.get("/auth-log", (req, res) => {
  let authName = req.query.authName;
  req.session.googLogged = { first_name: authName };
  res.send({ nam: req.session.googLogged });
});

app.post("/upload", upload.single("pic"), (req, res) => {
  res.send("image uploaded");
});

app.post("/add-follower", (req, res) => {
  let id = req.body.id;
  let fo = req.body.followers;

  conn.query(
    `UPDATE vacations SET followers= ${fo} WHERE id= '${id}'`,
    (err, results, fields) => {
      res.send({ success: "success" });
    }
  );
});

app.get("/profile", (req, res) => {
  if (req.session.logged || req.session.googLogged) {
    if (req.session.googLogged[0]) {
      res.render("profile", {
        user: req.session.googLogged[0],
        layout: "default",
      });
    }
    if (req.session.logged[0].permi != 1) {
      res.render("profile", { user: req.session.logged[0], layout: "default" });
    } else {
      res.render("admin", { user: req.session.logged[0], layout: "main" });
    }
  } else {
    res.redirect("/");
  }
});

app.get("/my-vacations", (req, res) => {
  res.render("myVacations", { user: req.session.googLogged[0] });
});

app.get("/followers", (req, res) => {
  let theId = req.query.id;
  conn.query(
    `SELECT * FROM vacations WHERE id = ' ${req.query.id}';`,
    (err, results, fields) => {
      res.send({ followNum: results[0].followers, theId: req.query.id });
    }
  );
});

app.get("/set-fav", (req, res) => {
  let id = req.query.id;
  conn.query(
    `UPDATE vacations SET favourites=1 WHERE id =${id}`,
    (err, results, fields) => {
      res.send({ success: "success" });
    }
  );
});
app.get("/set-unfav", (req, res) => {
  let id = req.query.id;
  conn.query(
    `UPDATE vacations SET favourites = 0  WHERE id =${id}`,
    (err, results, fields) => {
      res.send({ success: "success" });
    }
  );
});

app.get("/my-vacations", (req, res) => {
  res.render("myVacations");
});

app.get("/favourites", (req, res) => {
  conn.query(
    `SELECT * FROM vacations WHERE favourites= 1`,
    (err, results, fields) => {
      res.send({ favourites: results, layout: "main" });
    }
  );
});

app.get("/", (req, res) => {
  req.session.destroy();
  conn.query(
    `UPDATE vacations SET favourites =0 WHERE favourites =1`,
    (err, results, fields) => {}
  );
  res.render("login", { layout: "loginlayout" });
});

app.get("/logout", (req, res) => {
  conn.query(
    `UPDATE vacations SET favourites =0 WHERE favourites =1`,
    (err, results, fields) => {}
  );
  res.render("login", { layout: "loginlayout" });

  req.session.destroy();
});

app.get("/admin", (req, res) => {
  res.render("admin", { user: req.session.logged[0] });
});

app.get("/chart", (req, res) => {
  res.render("chart", { user: req.session.logged[0] });
});

app.get("/vacationsa", (req, res) => {
  conn.query(
    `SELECT * FROM vacations ORDER BY id DESC`,
    (err, results, fields) => {
      res.send({ vacations: results });
    }
  );
});

app.get("/vacations", (req, res) => {
  conn.query(
    `SELECT * FROM vacations ORDER BY id DESC LIMIT 0, 10`,
    (err, results, fields) => {
      res.send({ vacations: results });
    }
  );
});
app.get("/p3", (req, res) => {
  res.render("page3", { user: req.session.logged[0], layout: "default" });
});

app.get("/page3", (req, res) => {
  conn.query(
    "SELECT * FROM vacations ORDER BY start_date LIMIT 20, 30",
    (err, results, fields) => {
      res.send({ vacations: results });
    }
  );
});

app.get("/p2", (req, res) => {
  res.render("page2", { user: req.session.logged[0], layout: "default" });
});

app.get("/page2", (req, res) => {
  conn.query(
    "SELECT * FROM vacations ORDER BY start_date LIMIT 10, 20",
    (err, results, fields) => {
      res.send({ vacations: results });
    }
  );
});

app.get("/registration", (req, res) => {
  res.render("registration", { layout: "loginlayout" });
});

app.get("/edit", (req, res) => {
  let id = req.query.id;

  conn.query(
    `SELECT * FROM vacations WHERE id='${id}'`,
    (err, results, fields) => {
      res.send({ vacation: results });
    }
  );
});

app.post("/set-edit", (req, res) => {
  let id = req.body.id;
  let desc = req.body.description;
  let dest = req.body.destintaion;
  let start = req.body.startDate;
  let end = req.body.endDate;
  let price = req.body.price;

  conn.query(
    `UPDATE vacations SET description='${desc}', destination='${dest}', pic='0', start_date='${start}',
  arriv_date='${end}', price='${price}', followers= '0' WHERE id =${id};
  `,
    (err, results, fields) => {
      res.send({ update: "success" });
    }
  );
});

app.get("/add-user", (req, res) => {
  let user_name = req.query.userName;
  let first_name = req.query.firstName;
  let last_name = req.query.lastName;
  let password = req.query.password;

  conn.query(
    `SELECT * FROM users WHERE user_name='${user_name}'`,
    (err, results, fields) => {
      if (results.length > 0) {
        res.send({ err: "choose another user name" });
      } else {
        let sql = `INSERT INTO users (first_name, last_name, user_name, password, permi) VALUES('${first_name}','${last_name}','${user_name}','${password}','0')`;
        conn.query(sql, (err, results, fields) => {
          res.send({ success: "success" });
        });
      }
    }
  );
});

app.get("/update", (req, res) => {
  conn.query("", (err, results, fields) => {});
});

app.post("/add-vacation", (req, res) => {
  let desc = req.body.description;
  let dest = req.body.destintaion;
  let start = req.body.startDate;
  let end = req.body.endDate;
  let price = req.body.price;

  let sql = `INSERT INTO vacations ( description, destination, pic,  start_date, arriv_date, price, followers) VALUES 
('${desc}', '${dest}','0','${start}', '${end}','${price}','0')`;
  conn.query(sql, (err, results, fields) => {
    if (err) {
      console.log("err");
    }
    res.send({ success: "success" });
  });
});

app.get("/delete", (req, res) => {
  conn.query(
    `DELETE FROM vacations WHERE id = '${req.query.id}'`,
    (err, results, fields) => {}
  );
});

app.get("/login", (req, res) => {
  var logged = req.session.logged;

  if (logged) {
    if (req.session.logged[0].permi == 1) {
      console.log("from admin");
      res.render("admin", { user: logged[0] });
    } else {
      console.log("from user");
      res.render("profile", { user: logged[0], layout: "default" });
    }
  } else {
    let userName = req.query.userName;
    let pass = req.query.password;

    conn.query(
      `SELECT * FROM users WHERE user_name='${userName}' AND password='${pass}'  `,
      (err, results, fields) => {
        if (results.length > 0) {
          if (results[0].permi != 1) {
            req.session.logged = results;
            res.send({ success: "success" });
          } else {
            req.session.logged = results;
            res.send({ admin: true });
          }
        } else {
          res.send({ err: "user name or password is incorrect" });
        }
      }
    );
  }
});

app.listen(process.env.PORT || 4444, () => {
  console.log("project 3 start!");
});

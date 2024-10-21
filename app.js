const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cors = require("cors");
require("dotenv").config();

const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
//console.log("mongoouri", MONGODB_URI_PROD);
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://celebrated-biscotti-bbeee9.netlify.app/", // frontend 주소
    credentials: true,
  })
);

app.use("/api", indexRouter);

//bodyParser setting
app.use(bodyParser.json());

const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection Fail"), err;
  });

app.listen(5000, (req, res) => {
  console.log("server on 5000!");
});

//로그인
// 이메일 패스워드를 입력해서 보냄
// db에 이메일과 패스워드를 가진 유저가 있는지 확인
// 없으면 로그인 실패

// 있다면 유저정보+토큰
// fe에서는 이 정보를 저장

//1. 라우터 설정
//2. 이메일 패스워드 정보 읽어오기
//3. 이메일을 가지고 유저 정보를 가져오기 R
//4. 이 유저 db에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
//5. 맞다 그러면 토큰발행
//6. 틀리면 에러 메시지 보냄

// 다음스텝 : 로그인 후 권한 설정

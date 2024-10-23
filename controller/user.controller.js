const User = require("../model/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    //이메일로 사용자 조회

    const { email, name, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      //throw new Error("이미 가입이 된 유저입니다.");
      return res
        .status(400)
        .json({ status: "fail", message: "이미 가입된 이메일입니다." });
    }

    //해시
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    // 새로운 사용자 생성 및 저장
    const newUser = new User({ email, name, password: hash });
    await newUser.save();

    res
      .status(200)
      .json({ status: "success", message: "회원가입에 성공했습니다" });

    //console.log("hash", hash);
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      //password => 유저가 입력한 그 자체
      //user.password => 암호화된 (hashed) 암호

      const isMatch = bcrypt.compareSync(password, user.password);

      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }
    throw new Error("아이디 또는 비밀번호가 일지하지 않습니다.");
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
    //console.log(error);
  }
};

module.exports = userController;

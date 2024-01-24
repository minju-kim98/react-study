import React from "react";
import styled from "styled-components";
import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import App from "../../App";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(App);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("회원가입에 성공했습니다.");
      navigate("/main");
    } catch (error) {
      toast.error(error?.code);
    }
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setemail(value);
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!value?.match(validRegex)) {
        seterror("이메일 형식이 올바르지 않습니다.");
      } else {
        seterror("");
      }
    }

    if (name === "password") {
      setpassword(value);
      if (value?.length < 8) {
        seterror("비밀번호는 8글자 이상이어야 합니다.");
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        seterror("비밀번호가 일치하지 않습니다.");
      } else {
        seterror("");
      }
    }

    if (name === "password_confirm") {
      setpasswordConfirm(value);
      if (value !== password) {
        seterror("비밀번호가 일치하지 않습니다.");
      } else {
        seterror("");
      }
    }
  };

  const signUpWithGoogle = () => {
    try {
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          localStorage.setItem("userData", JSON.stringify(result.user));
          navigate("/main");
          toast.success("회원가입에 성공했습니다.");
        })
        .catch((error) => {
          toast.error(error?.code);
        });
    } catch (error) {
      toast.error(error?.code);
    }
  };

  return (
    <Container>
      <form onSubmit={onSubmit} className="form form--lg">
        <h1 className="form__title">회원가입</h1>
        <div className="form__block">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={onChange}
            value={email}
          />
        </div>
        <div className="form__block">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={onChange}
            value={password}
          />
        </div>
        <div className="form__block">
          <label htmlFor="password_confirm">비밀번호 확인</label>
          <input
            type="password"
            name="password_confirm"
            id="password_confirm"
            required
            onChange={onChange}
            value={passwordConfirm}
          />
        </div>
        {error && error?.length > 0 && (
          <div className="form__block">
            <div className="form__error">{error}</div>
          </div>
        )}
        <div className="form__block">
          계정이 이미 있으신가요?
          <Link to="/login" className="form__link">
            로그인
          </Link>
          하기
        </div>
        <div className="form__block google-signup" onClick={signUpWithGoogle}>
          Google로 회원가입 하기
        </div>
        <div className="form__block">
          <input
            type="submit"
            value="회원가입"
            className="form__btn--submit"
            disabled={error?.length > 0}
          />
        </div>
      </form>
    </Container>
  );
};

export default Signup;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

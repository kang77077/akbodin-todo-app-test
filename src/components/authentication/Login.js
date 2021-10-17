import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertSuccess, AlertWarning } from "../templates/alerts"
import * as authService from "../../services/auth.service"
import { loginSchema } from "../../validate/SchemaAuthentication"

export const Login = (props) => {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertWarning, setAlertWarning] = useState(false);
	const [children, setChildren] = useState(false);
	const [eyeBtn, setEyeBtn] = useState("zmdi-eye");
	const { register, handleSubmit, formState:{ errors, isValid } } =
    useForm({
      mode: "onChange",
      resolver: yupResolver(loginSchema),
      shouldUnregister: false,
    });

	const onSubmit = async (data) => {
		if (data.password !== "" && data.username !== "" && !isValid) {
			try {
				await handleLogin(data)
				setAlertSuccess(true)
				setTimeout(() => {
          return props.history.push("/");
        }, 500);
			} catch (error) {
				setAlertWarning(true)
			}
		}
	}

	const handleLogin = async (payload) => {
		const result = await authService.login(payload)
		if (result.statusText === "OK") {
			localStorage.setItem("token", result.data.token);
			setChildren("Login sucsess")
		} else {
			setChildren("Login failed")
		}
	}

	const hidePassword = () => {
		const input = document.getElementById("password")
		if (input.type === "password") {
			input.type = "text"
			setEyeBtn("zmdi-eye-off")
		} else {
			input.type = "password"
			setEyeBtn("zmdi-eye")
		}
	}
	
  return (
    <>
      <div className="wrap-login100">
				<form className="login100-form validate-form" onSubmit={handleSubmit(onSubmit)}>
					<span className="login100-form-title p-b-26">
						Welcome
					</span>
					<span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-view-web"></i>
					</span>

					<div 
						className={`wrap-input100 validate-input ${errors.username ? "alert-validate" : ""}`} 
						data-validate={errors.username?.message ?? ""}
					>
						<input 
							className={`input100 ${username !== "" ? "has-val" : ""}`}
							type="text" 
							{...register("username")}
							autoComplete="off"
							onChange={(e) => setUserName(e.target.value)}
						/>
						<span className="focus-input100" data-placeholder="Username"></span>
					</div>

					<div 
						className={`wrap-input100 validate-input ${errors.password ? "alert-validate" : ""}`} 
						data-validate={errors.password?.message ?? ""}
					>
						<span className="btn-show-pass">
							<i className={`zmdi ${eyeBtn}`} onClick={() => hidePassword()}></i>
						</span>
						<input 
							className={`input100 ${password !== "" ? "has-val" : ""}`}
							id="password"
							type="password" 
							{...register("password")}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<span className="focus-input100" data-placeholder="Password"></span>
					</div>

					<div className="container-login100-form-btn">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<button className="login100-form-btn" type="submit">
								Login
							</button>
						</div>
					</div>

					<div className="text-center p-t-115">
						<span className="txt1">
							Don’t have an account?
						</span>

						<a className="txt2" href="https://nevers-todo-register.firebaseapp.com/" target="_blank">
							{" "}Sign Up
						</a>
					</div>
				</form>
			</div>
			<AlertSuccess
        open={alertSuccess}
        setOpen={setAlertSuccess}
        children={children}
        duration={3000}
      />
      <AlertWarning
        open={alertWarning}
        setOpen={setAlertWarning}
        children={children}
        duration={3000}
      />
    </>
  )
}
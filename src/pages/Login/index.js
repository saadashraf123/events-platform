import React from 'react';
import MyButton from '../../components/MyButton';
import { MyInput } from '../../components/MyInput';
import useLogin from '../../Hooks/useLogin';
import classes from "./Login.module.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { form } = useLogin();
    const navigate = useNavigate();
    return (
        <>
            <div className={classes["mainWrapper"]}>
                <div className={classes["cardStyles"]}>
                    <div className={classes["header"]}>
                        <h1>Login</h1>
                        <p>Login to Events Coordination Platform to create or be a part of events.</p>
                    </div>
                    <MyInput
                        name="email"
                        label={"Email Address"}
                        value={form.values.email}
                        setter={value => form.setFieldValue("email", value)}
                        placeholder={"Enter Email Address"}
                        required={true}
                        labelStyle={{ fontWeight: 600 }}
                        errorText={form.errors.email}
                    />
                    <MyInput
                        type="password"
                        name="password"
                        label={"Password"}
                        value={form.values.password}
                        setter={(value) => form.setFieldValue("password", value)}
                        placeholder={"Enter Paswword"}
                        required={true}
                        labelStyle={{ fontWeight: 600 }}
                        errorText={form.errors.password}
                    />
                    <MyButton variants='primary' label={"Login"} type="submit" onClick={form.handleSubmit} className={classes["btnExtraStyles"]} />

                    <div className={classes["footer"]}>
                        Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
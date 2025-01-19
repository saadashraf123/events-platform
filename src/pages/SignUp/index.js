import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton";
import { MyInput } from "../../components/MyInput";
import classes from "./SignUp.module.css";
import useSignup from "../../Hooks/useSignup";

const SignUp = () => {
    const { form, loading } = useSignup();
    const navigate = useNavigate();
    return (
        <>
            <div className={classes["mainWrapper"]}>
                <div className={classes["cardStyles"]}>
                    <div className={classes["header"]}>
                        <h1>Sign Up</h1>
                        <p>
                            Signup to Events Coordination Platform to create or be a part of
                            events.
                        </p>
                    </div>
                    <MyInput
                        name="username"
                        label={"Username"}
                        value={form.values.username}
                        setter={(value) => form.setFieldValue("username", value)}
                        placeholder={"Enter User name "}
                        required={true}
                        labelStyle={{ fontWeight: 600 }}
                        errorText={form.errors.username}
                    />
                    <MyInput
                        name="email"
                        label={"Email Address"}
                        value={form.values.email}
                        setter={(value) => form.setFieldValue("email", value)}
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
                    <MyInput
                        type="password"
                        name="cpassword"
                        label={"Confirm Password"}
                        value={form.values.cpassword}
                        setter={(value) => form.setFieldValue("cpassword", value)}
                        placeholder={"Enter Confirm Paswword"}
                        required={true}
                        labelStyle={{ fontWeight: 600 }}
                        errorText={form.errors.cpassword}
                    />
                    <MyButton
                        variants="primary"
                        label={"SignUp"}
                        type="submit"
                        disabled={loading}
                        onClick={form.handleSubmit}
                        className={classes["btnExtraStyles"]}
                    />

                    <div className={classes["footer"]}>
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")}>Login</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;

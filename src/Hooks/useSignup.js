import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { signUp } from "../api";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const form = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            cpassword: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string().required("Password is required"),
            cpassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            signUp(values)
                .then(() => {
                    toast.success("User signed up successfully");
                    navigate("/login");
                })
                .catch(toast.error)
                .finally(() => {
                    setLoading(false);
                });
        },
    });

    return { form, loading };
};

export default useSignup;

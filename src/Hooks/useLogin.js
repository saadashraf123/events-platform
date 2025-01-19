import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { logIn } from "../api";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            logIn(values.email, values.password)
                .then((data) => {
                    dispatch(login(data));
                    toast.success("Welcome " + data.username);
                    navigate("/");
                })
                .catch(toast.error)
                .finally(() => {
                    setLoading(false);
                });
        },
    });

    return { form, loading };
};

export default useLogin;

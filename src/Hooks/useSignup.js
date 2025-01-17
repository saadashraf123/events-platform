import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "../api";

const useSignup = () => {
    const form = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            cpassword: ""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Username is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string().required("Password is required"),
            cpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Password is required"),
        }),
        onSubmit: async (values) => {
            await signUp(values);
        },
    });

    return { form }
}

export default useSignup
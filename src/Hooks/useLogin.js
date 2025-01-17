import { useFormik } from "formik";
import * as Yup from "yup";
import { logIn } from "./../api";

const useLogin = () => {
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
            await logIn(values.email, values.password);
        },
    });

    return { form }
}

export default useLogin
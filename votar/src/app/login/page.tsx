"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import { BALLOT_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import Link from "next/link";
import {auth} from '@/util/firebase';
import { loginValidation } from "@/validationSchema/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";

const Login = () => {
    const { handleSubmit, register, formState:{errors}} = loginValidation();
    const router = useRouter();
    useAuthentication();
    const submitForm = (values:any) => {
        signInWithEmailAndPassword(auth,values.email,values.password).then((response)=>{
            router.push(BALLOT_ROUTE);
        }).catch((e)=>{
            console.log("Login Error ", e.message);
            alert("Please try Again");
        });
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-1/2 rounded-md bg-blue/50 shadow-lg flex justify-between flex-col bg-grey-500">
                <div className="h-26s w-full justify-center flex items-center">
                    <span className="text-3xl text-black font-black font-sans bg-blue-300 p-5 rounded-lg">Welcome To VoteSA</span>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className="h-wide w-1/2 mx-auto text-white  ">
                    <InputField
                        register={register}
                        error={errors.email}
                        type="text"
                        placeholder="Enter your email ..."
                        name="email"
                        label="Email"
                    />
                    <InputField
                        register={register}
                        error={errors.password}
                        type="password"
                        placeholder="Enter your password ..."
                        name="password"
                        label="Password"
                    />
                    <SubmitButton label="Submit" />
                </form>
                <div className="h-20 mx-auto ">
                    <span className="text-sm text-gray-600">Dont have an account?  
                        <Link href={REGISTER_ROUTE}><span className="text-blue-500 font-semibold text-md" > Register Now!</span></Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login;
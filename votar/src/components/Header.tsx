"use client";
import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { AuthContext } from "@/provider/AuthProvider";
import { auth } from "@/util/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const {user}:any = AuthContext();
    const router = useRouter();
    const logOut = () => {
        signOut(auth).then((response)=>{
            router.push(LOGIN_ROUTE);
        }).catch((e)=>{
            console.log("Logout Catch ",e.message)
        })
    }

    return (
        <header className="h-20 bg-blue-300 flex px-10 drop-shadow-[0px_2px_10px_rgba(2,0,0) text-black">
            <nav className="w-full mx-auto flex justify-between items-center px-2 text-black  text-xl">
               {/* <Link href={HOME_ROUTE}><div>View Results</div></Link> */}

                <Link href={HOME_ROUTE} className="text-xl font-sans text-black flex items-center gap-3">
                    <img
                        src="https://companieslogo.com/img/orig/SOLB.VI-154fc251.png?t=1597967504"
                        className="mx-auto h-14 w-auto" />
                    View Results</Link>
                <ul className="flex gap-4">
                    {!user?.isLogin &&
                        <>
                            <Link href={LOGIN_ROUTE}><li>Login</li></Link>
                            <Link href={REGISTER_ROUTE}><li>Register</li></Link>
                        </>
                    }
                    {user?.isLogin &&
                        <>
                            <Link href={PROFILE_ROUTE}><li>Profile</li></Link>
                            <li className=" cursor-pointer" onClick={logOut}>Logout</li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;
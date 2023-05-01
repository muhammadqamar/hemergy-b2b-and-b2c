import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import EmailVerify from "@/components/Authentications/emailVerify";

import { addUser } from "@/store/reducer/user";
import Link from "next/link";

const Verification = ({ params }) => {
  const [loader, setLoading] = useState(true);
  const [userDetail, setUserDetail] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        if (params?.id) {
          let response = await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/verify/account`, {
            code: params?.id,
          });
          setUserDetail(response?.data?.user);
          dispatch(addUser(response?.data?.user));

            setLoading(false);
            localStorage.setItem("hemergy-email", response?.data?.user?.email);
            localStorage.setItem("hemergy-token", response?.data?.token);
            router.push("/on-boarding");

        }
      } catch (error) {
        setLoading(false);

        toast.error(error?.response?.data?.status || error.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="authentications-section">
      <Link href="/" className="auth-header">
        <Image src="/images/hemergy-logo.svg" width={150} height={32} alt="logo" />
      </Link>

      <EmailVerify loader={loader} />

      <div className="auth-wather" />
    </div>
  );
};

export default Verification;

export const getServerSideProps = (context) => {
  return {
    props: {
      params: context?.params,
    },
  };
};

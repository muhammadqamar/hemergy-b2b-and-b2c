import RegisterSlider from '@/components/Authentications/registerSlider';
import LogIn from '@/components/Authentications/login';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { ShowError } from '@/services/error';

const Login = ({ query }) => {
  onst[(registerState, setRegisterState)] = useState('');
  useEffect(() => {
    console.log(query);
    if (query?.email) {
      setRegisterState({ email: query?.email });
    } else {
      if (query?.status === '400') {
        toast.error('Email Already Exist', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      setRegisterState({ status: query?.status });
    }
  }, [query]);

  useEffect(() => {
    console.log(query.success);
    if (query.success === 'false') {
      ShowError('Email not Exist!');
    }
  }, [query]);
  return (
    <div className="authentications-section">
      <Link href="/" className="auth-header">
        <Image
          src="/images/hemergy-logo.svg"
          width={150}
          height={32}
          alt="logo"
        />
      </Link>

      <div className="auth-container">
        <RegisterSlider />
        <LogIn query={query} />
      </div>

      <div className="wather-haf-white-bg" />
    </div>
  );
};

export default Login;

export const getServerSideProps = (context) => {
  return {
    props: {
      query: context?.query,
    },
  };
};

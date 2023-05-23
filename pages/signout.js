import homeStyles from '../styles/Home.module.css';
import Link from 'next/link';

const Signout = () => {

    const mode = 'dev'

    let redirect_uri = '';

    if (mode === 'prod') {
        redirect_uri = 'https://friendly-daffodil-a99ceb.netlify.app';
    } else {
        redirect_uri = 'http://localhost:3000';
    }

    return (
        <div className={homeStyles.container}>
            <main>
                <div className={homeStyles.card}>
                    <div className={homeStyles.title}>Welcome to StravaConnect</div>
                    <Link
                        href={`https://www.strava.com/oauth/authorize?client_id=97178&redirect_uri=${redirect_uri}&response_type=code&scope=read,activity:read_all,activity:write,profile:read_all`}
                    >
                        <button className={homeStyles.btn}>Login with Your Strava Account</button>
                    </Link>
                </div>
            </main>
        </div>
    );

}

export default Signout;
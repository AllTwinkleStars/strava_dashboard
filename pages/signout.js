import homeStyles from '../styles/Home.module.css';
import Link from 'next/link';

const Signout = () => {
    return (
        <div className={homeStyles.container}>
            <main>
                <div className={homeStyles.card}>
                    <div className={homeStyles.title}>Welcome to StravaConnect</div>
                    <Link href={`https://www.strava.com/oauth/authorize?client_id=97178&redirect_uri=https://friendly-daffodil-a99ceb.netlify.app&response_type=code&scope=read,activity:read_all,profile:read_all&approval_prompt=force`}
                    >
                        <button className={homeStyles.btn}>Login with Your Strava Account</button>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Signout;
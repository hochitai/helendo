import classNames from 'classnames/bind';
import styles from './ErrorAuth.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cs = classNames.bind(styles);

function ErrorAuth() {
    return (
        <div className="container mx-auto text-center py-20">
            <h1>Something is not right!</h1>
            <h2 className="italic">
                Please{' '}
                <Link to={config.routes.auth} className="text-primary">
                    login
                </Link>{' '}
                again
            </h2>
        </div>
    );
}

export default ErrorAuth;

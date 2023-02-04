import { useRouteError } from 'react-router-dom';

function ErrorPage() {
    const errorRoute = useRouteError();
    console.warn(errorRoute);
    return (
        <center className='error-page'>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has accured.</p>
            <p>
               <i>{errorRoute.status || errorRoute.message}</i> 
            </p>
            <code>{errorRoute.error.message}</code>
        </center>
    );
}

export default ErrorPage;
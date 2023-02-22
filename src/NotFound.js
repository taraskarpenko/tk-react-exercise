import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <h1>Ooooops ... Something went wrong</h1>
            <h2>Page not found</h2>
            <Link to="/">Go to the start page</Link>
        </>
    )
}

export default NotFound
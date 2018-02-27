import Header from './header';

const Layout = (props) => {
    return (
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
            <Header/>
            {props.children}
        </div>
    )
};

export default Layout;
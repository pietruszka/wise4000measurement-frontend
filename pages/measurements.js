import Header from '../components/header';
import Layout from '../components/layout';

const Measurements = (props) => {
    console.log(props)
    return (
        <Layout>
            <p>measurements!!!</p>
            {props.url.query.value}
        </Layout>
    )
};

export default Measurements;
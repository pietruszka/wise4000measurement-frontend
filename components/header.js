import Link from 'next/link';

const Header = () => {
    return (
        <div>
            <Link href={"/"}><button className={'btn btn-primary'}>Dashboard</button></Link>
            <Link href={"/io"}><button className={'btn btn-primary'}>IO</button></Link>
            <Link href={"/p"}><button className={'btn btn-primary'}>Measurements</button></Link>
        </div>
    )
};

export default Header;
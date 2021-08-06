import { useParams, Redirect, Link } from 'react-router-dom';

const WeatherProfile = (props) => {
    const { cityName } = useParams();
    const { savedCities } = props;
    console.log(savedCities)

    let singleCity = savedCities.find((city => {
        if (city.login === cityName) {
            return city;
        } else {
            return console.log('cityName invalid')
        }
    }))

    if (savedCities.length > 0) {
        return (
            <>
                <div className="city-profile">
                    <nav>
                        <Link to="/">Home</Link>
                    </nav>    
                    <h1>{singleCity.city}</h1>   
                </div>
            </>
        );
    } else {
        <Redirect to='/' />
        return null;
    }
    
}

export default WeatherProfile;
import React, { useState, useEffect } from 'react';
import './CatInfo.css';
import axios from 'axios';

function App() {
    const [catData, setCatData] = useState([]);
    const [catText, setCatText] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

        //function to fetch the API
    const fetchData = async () => {
        setIsLoading(true)

        //Promisse
        try {

            const catPic = 'https://api.thecatapi.com/v1/images/search';
            const catText = 'https://meowfacts.herokuapp.com/'

            const getPic = await axios.get(catPic)
            const getText = await axios.get(catText);

            axios.all([getPic, getText]).then(
                axios.spread((...allData) => {
                    const allDataPic = allData[0].data[0].url;
                    const allDataText = allData[1].data.data

                    setCatData(allDataPic);
                    setCatText(allDataText);
                })
            )
            //Handling errors
        } catch (err) {
            console.log(err)

            //Turn off loading message
        } finally {
            setIsLoading(false)
        }

    }



    
    useEffect(() => {
        fetchData();
    }, [])


    return (
            <div className="container">
                <div className="content">
                    <p>Meow!</p>
                </div>
                {isLoading ?
                    <p>Loading Cat Data...</p> :
                    <div className="image-container">
                        <img src={catData} alt="" />
                        <p className="quote">"{catText}"</p>
                        <button onClick={fetchData}>Another!</button>
                    </div>
                }

            </div>

       


    );

}

export default App;

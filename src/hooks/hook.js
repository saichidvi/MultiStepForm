import axios from "axios";
import { useState ,useEffect } from "react";


const useFetch = (url) => {
    const [hookData,setData]  = useState([]);
    const [isLoading ,setLoading] = useState(false);
    const [isError,setError] = useState(false);

    useEffect (() => {
        const fetch = async() => {
            setLoading(true);
            try {
                const val = await axios.get(url);
                setData(val.data);
                setLoading(false);
            }
            catch(err) {
                setError(true);
                setLoading(false);
            }
        };
        fetch();
    },[url]);

    return {hookData,isLoading,isError}
};


export default useFetch;
import axios from "axios";
import { useState ,useEffect } from "react";


const useFetch1 = (url) => {
    const [customhookData,setData]  = useState({});
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

    return {customhookData,isLoading,isError}
};


export default useFetch1;
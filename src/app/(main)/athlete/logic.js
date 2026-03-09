import axios from "axios";

export function useFetchSearch(setAthletes, setError, setLoading) {
    const handleLogicSearch = (e) => {
        console.log(e);
        setLoading(true);
        axios.get(`/api/athletes?search=${e}`)
            .then((response) => {
                const data = response.data.athletes ? response.data.athletes : [response.data]
                setAthletes({ athletes: data, iSearch: e ? true : false, hasMore: response.data.hasMore });
            }).catch((error) => {
                console.log(error);
                setError(error.response.data.error);
            }).finally(() => setLoading(false));
    }

    return { handleLogicSearch };
}

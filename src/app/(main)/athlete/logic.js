import axios from "axios";

export function useFetchSearch(setAthletes, setError, setLoading) {
    const handleLogicSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.get(`/api/athletes?search=${e.target.search.value}`)
        .then((response) => {
            console.log(response.data);
            setAthletes({athletes: [response.data], iSearch: true});
        }).catch((error) => {
            console.log(error);
            setError({error: error.response.data.error});
        }).finally(() => setLoading(false));
    }

    return { handleLogicSearch };
}
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getpets } from "../store/slices/petSlice/petSlice";
import Table from "../components/Common/Table";
import Loader from "../components/Common/Loader";
import Breadcrumb from "../components/Common/Breadcrumb";
import { fetchPets, searchPets } from "../Api/petApi";

interface IQuery {
  animal: string;
  location: string;
  breed: string;
}

function PetList() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);

  const [query, setQuery] = useState<IQuery>({
    animal: '',
    location: '',
    breed: ''
  });

  const pets = useAppSelector(state => state.petSlice.pets);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getData(page);
  }, []);

  useEffect(() => {
    const fetchSearchedPets = async () => {
      const { animal, location, breed } = query;
      const data = await searchPets(animal, location, breed);
      dispatch(getpets(data.pets));
    };

    if (query.animal || query.location || query.breed) {
      fetchSearchedPets();
    } else {
      getData(page);
    }
  }, [query, dispatch, page]);

  const getData = async (pageNumber: number) => {
    setLoading(true);
    const data = await fetchPets(pageNumber);
    dispatch(getpets(data.pets));
    setLoading(false);
  };

  const searchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuery(prevQuery => ({
      ...prevQuery,
      [name]: value
    }));
  };

  const handlePagination = (page:number)=>{
    if (page > 0) {
      setPage(page);
      getData(page);
    }
  }

  return (
    <div className="dark:bg-[#fbf8f1] font-sans px-12 py-5 h-screen">
      <Breadcrumb title="pets" breadcrumb={['', 'pets']} />
      {!loading ? <Table data={pets} searchQuery={searchQuery} page={page} handlePagination={handlePagination} /> : <Loader />}
    </div>
  );
}

export default PetList;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPetById } from "../Api/petApi";
import Loader from "../components/Common/Loader";
import Breadcrumb from "../components/Common/Breadcrumb";
import { getpetById } from "../store/slices/petSlice/petSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";

interface Pet {
    id: string;
    name: string;
    animal: string;
    breed: string;
    location: string;
    description: string;
    images: string[];
    age: string;
    gender: string;
}

function PetDetail() {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(true);

    const pet: Pet = useAppSelector(state => state.petSlice.petDetails);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const getPet = async () => {
            const data = await fetchPetById(id);
            dispatch(getpetById(data.pets[0]));
            setLoading(false);
        };

        getPet();
    }, [id, dispatch]);

    return (
        <div className="dark:bg-[#fbf8f1] font-sans px-12 py-5 min-h-screen">
            <Breadcrumb title={pet?.name} breadcrumb={['pets', pet?.name]} />
            {!loading ? (
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-5">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 p-6">
                            <h1 className="text-3xl font-bold mb-4">{pet?.name}</h1>
                            <p className="text-gray-700"><strong>Animal:</strong> {pet?.animal}</p>
                            <p className="text-gray-700"><strong>Breed:</strong> {pet?.breed}</p>
                            <p className="text-gray-700"><strong>Location:</strong> {pet?.location}</p>
                            <p className="text-gray-700"><strong>Age:</strong> {pet?.age}</p>
                            <p className="text-gray-700"><strong>Gender:</strong> {pet?.gender}</p>
                            <p className="mt-4 text-gray-700"><strong>Description:</strong> {pet?.description}</p>
                        </div>
                        <div className="w-full md:w-1/2 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {pet?.images.map((image, key) => (
                                <div key={key} className="w-full h-64">
                                    <img src={image} alt={pet?.name} className="w-full h-full object-cover rounded-lg shadow-sm" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default PetDetail;

import React,{useState,useEffect} from "react";
import { icons } from "../../../Icons/constant";
import { Link } from "react-router-dom";

const { LuView } = icons;

function Index({ data, searchQuery, page, handlePagination }: { data: any[], page: number, handlePagination:(page:number) => void , searchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void }) {

  const itemsPerPage = 10;
  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
const [petList, setPetList] = useState(data)

  useEffect(() => {
    setPetList(data)
  }, [data])
  


  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex justify-between space-x-4 items-center mb-4 w-full my-10">
          <input
            type="text"
            placeholder="Search Animal..."
            className="px-4 py-2 border rounded-md w-full"
            onChange={searchQuery}
            name="animal"
          />
          <input
            type="text"
            placeholder="Search Location..."
            className="px-4 py-2 border rounded-md w-full"
            onChange={searchQuery}
            name="location"
          />
          <input
            type="text"
            placeholder="Search Breed..."
            className="px-4 py-2 border rounded-md w-full"
            onChange={searchQuery}
            name="breed"
          />
        </div>
        <div className="inline-block min-w-full">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="bg-[#3f9997] text-white uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Animal</th>
                  <th scope="col" className="px-6 py-4">City</th>
                  <th scope="col" className="px-6 py-4">State</th>
                  <th scope="col" className="px-6 py-4">Breed</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {petList && petList.map((pet, index) => (
                  <tr key={pet?.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{(page - 1) * itemsPerPage + index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{pet?.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{pet?.animal}</td>
                    <td className="whitespace-nowrap px-6 py-4">{pet?.city}</td>
                    <td className="whitespace-nowrap px-6 py-4">{pet?.state}</td>
                    <td className="whitespace-nowrap px-6 py-4">{pet?.breed}</td>
                    <td className="flex items-center justify-center px-6 py-4"><Link to={`/petDetail/${pet?.id}`}><LuView /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePagination(page - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50"
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page}
          </span>
          <button
            onClick={() => handlePagination(page + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50"
            // disabled={page === Math.ceil(data.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;

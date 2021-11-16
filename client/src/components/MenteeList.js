import { Link } from 'react-router-dom';
import { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import DropDown from './Functional/DropDown';

function MenteeList({ mentees, myId, filteredMentees, filterMentees }) {
  const [myMenteesFilterOn, setMyMenteesFilterOn] = useState(false);
  const [filterOn, setFilterOn] = useState(false);

  function myMenteesFilterHandler() {
    filterMentees('MentorId', myId);
    setFilterOn(true);
  }

  function bookmarkedMenteesFilterHandler() {
    filterMentees('bookmarked', true);
    setFilterOn(true);
  }

  function careerPathFilterHandler(careerPath) {
    filterMentees('careerPath', careerPath);
    setFilterOn(true);
  }

  return (
    <div className="md:m-6">
      {/* Head section with filtering options */}
      <div className="flex justify-end mb-6">
        {/* <button
          onClick={myMenteesFilterHandler}
          // className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 mr-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          className={`inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 mr-3 text-sm font-medium ${
            myMenteesFilterOn
              ? 'text-white bg-indigo-600 hover:bg-indigo-700'
              : 'text-gray-700 bg-white hover:bg-gray-50'
          }`}
        >
          My mentees
        </button> */}

        <DropDown
          careerPathFilterHandler={careerPathFilterHandler}
          myMenteesFilterHandler={myMenteesFilterHandler}
          bookmarkedMenteesFilterHandler={bookmarkedMenteesFilterHandler}
        />
        {/* Button to clear filter - display only if filter is active */}
        {filterOn ? (
          <div className="ml-3 inline-flex rounded-md shadow">
            <button
              onClick={() => setFilterOn(false)}
              className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm p-2 bg-white text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              <XIcon className="h-5 w-auto" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {/* TODO: fix table headers at the top */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Career path
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Town
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Age
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View more</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* TODO: choose which fields to show & how, then adjust table headers */}
                  {(filterOn ? filteredMentees : mentees).map((mentee) => (
                    <tr key={mentee.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {mentee.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {mentee.careerPath}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {mentee.careerPath}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {mentee.town}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {mentee.ageRange}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/mentee/${mentee.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View more
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-row justify-center mt-16">
              {filterOn && filteredMentees.length === 0 ? (
                <p className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No results
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenteeList;

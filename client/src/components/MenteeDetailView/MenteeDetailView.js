import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XIcon,
  CheckIcon,
} from '@heroicons/react/outline';

function MenteeDetailView({ mentees, updateMentee }) {
  let params = useParams();
  const mentee = mentees.find((mentee) => mentee._id === parseInt(params.id));

  return (
    // TODO: style the detail view card according to data (e.g. 2 columns at the top)
    mentees.length ? (
      <div className="mx-24 my-10">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Header */}
          <div className="flex justify-between px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {mentee.name}
            </h3>
            <div>
              {/* Button previous */}
              <div className="inline-flex rounded-md shadow">
                <Link
                  to={`/mentee/${mentee._id - 1 ? mentee._id - 1 : mentee._id}`}
                  className="inline-flex items-center justify-center p-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ArrowLeftIcon className="h-4 w-auto" aria-hidden="true" />
                </Link>
              </div>
              {/* Button next */}
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  // TODO: fix ternary operator
                  to={`/mentee/${mentee._id + 1 ? mentee._id + 1 : mentee._id}`}
                  className="inline-flex items-center justify-center p-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ArrowRightIcon className="h-4 w-auto" aria-hidden="true" />
                </Link>
              </div>
              {/* Button choose */}
              <div className="ml-3 inline-flex rounded-md shadow">
                <button
                  className="inline-flex items-center justify-center px-4 py-2 border
                  border-transparent text-base font-medium rounded-md text-white
                  bg-indigo-600 hover:bg-indigo-700"
                  aria-label="choose mentee"
                >
                  <CheckIcon className="h-4 w-auto" aria-hidden="true" />
                </button>
              </div>
              {/* Button close detail view */}
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  to={`/`}
                  className="inline-flex items-center justify-center p-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  <XIcon className="h-4 w-auto" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
          {/* Details */}
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Career Path
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {mentee.careerPath}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Why are you applying?
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {mentee.why}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  margotfoster@example.com
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Salary expectation
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  $120,000
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                  incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                  consequat sint. Sit id mollit nulla mollit nostrud in ea
                  officia proident. Irure nostrud pariatur mollit ad adipisicing
                  reprehenderit deserunt qui eu.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    ) : (
      // TODO: style loading
      <p>Loading</p>
    )
  );
}

export default MenteeDetailView;

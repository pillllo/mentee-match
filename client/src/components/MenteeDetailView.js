// main component imported from Tailwind UI: https://tailwindui.com/components/application-ui/data-display/description-lists
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XIcon,
  CheckIcon,
  BookmarkIcon,
} from '@heroicons/react/outline';
import ModalConfirm from './Modals/ModalConfirm';
import ModalError from './Modals/ModalError';

function MenteeDetailView({ mentees, updateMentee, countMenteesChosenByMe }) {
  const [showModal, setShowModal] = useState(false);
  const [bookmarkOn, setBookmarkOn] = useState(false);

  // Find mentee for which the detail view should be shown, based on the id in the URL params
  const params = useParams();
  const mentee = mentees.find((mentee) => mentee.id === parseInt(params.id));

  // Prepare data to move from one detail view to the next
  const index = mentees.indexOf(mentee);
  const previousMentee = index > 0 ? mentees[index - 1] : mentee;
  const nextMentee = index < mentees.length - 1 ? mentees[index + 1] : mentee;

  function toggleModal() {
    setShowModal(!showModal);
  }

  // function toggleBookmark(id, mentee) {
  //   updateMentee(mentee.id, mentee, 'bookmarked');
  //   setBookmarkOn(!bookmarkOn);
  // }

  // Content type to be passed to the Modal depending on what modal it is
  const submitChoice = {
    title: 'Submit your choice',
    // text: `Do you want to choose this ${mentee.name} as your mentee?`,
    buttonText: 'Choose',
    icon: 'CheckCircleIcon',
  };

  const noMoreChoice = {
    title: 'No choice left',
    text: `You have already chosen 4 mentees.`,
    buttonText: 'Close',
    icon: 'ExclamationIcon',
  };

  const alreadyChosen = {
    title: 'Choice not available',
    text: `You have already chosen this mentee.`,
    buttonText: 'Close',
    icon: 'ExclamationIcon',
  };

  return (
    // TODO: style the detail view card according to data (e.g. 2 columns at the top)
    // Only render detail view if the mentees array has been loaded from the backend, else show loading spinner
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
                  to={`/mentee/${previousMentee.id}`}
                  className="inline-flex items-center justify-center p-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ArrowLeftIcon className="h-4 w-auto" aria-hidden="true" />
                </Link>
              </div>
              {/* Button next */}
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  to={`/mentee/${nextMentee.id}`}
                  className="inline-flex items-center justify-center p-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ArrowRightIcon className="h-4 w-auto" aria-hidden="true" />
                </Link>
              </div>
              {/* Button bookmark */}
              {/* <div className="ml-3 inline-flex rounded-md shadow">
                <button
                  className={`inline-flex items-center justify-center px-4 py-2 border
                  border-transparent text-base font-medium rounded-md text-white
                  bg-indigo-600 hover:bg-indigo-700 ${
                    !mentee.bookmarked ? 'opacity-50' : ''
                  }`}
                  aria-label="bookmark mentee"
                  onClick={() => toggleBookmark(mentee.id, mentee)}
                >
                  <BookmarkIcon className="h-4 w-auto" aria-hidden="true" />
                </button>
              </div> */}
              {/* Button choose */}
              <div className="ml-3 inline-flex rounded-md shadow">
                {/* If mentee was choosen already, show button in different color and disallow selecting the button */}
                <button
                  className={`inline-flex items-center justify-center px-4 py-2 border
                  border-transparent text-base font-medium rounded-md text-white
                  bg-indigo-600 hover:bg-indigo-700 ${
                    mentee.chosen ? 'opacity-50' : ''
                  }`}
                  aria-label="choose mentee"
                  //When click on button toggle Modal to confirm the choice
                  onClick={toggleModal}
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
          {/* Application details */}
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
        {showModal && countMenteesChosenByMe < 4 ? (
          <ModalConfirm
            mentee={mentee}
            updateMentee={updateMentee}
            toggleModal={toggleModal}
            modalContent={submitChoice}
          />
        ) : (
          <></>
        )}
        {showModal && countMenteesChosenByMe < 4 && mentee.chosenByMe ? (
          <ModalError
            mentee={mentee}
            updateMentee={updateMentee}
            toggleModal={toggleModal}
            modalContent={alreadyChosen}
          />
        ) : (
          <></>
        )}
        {showModal && countMenteesChosenByMe >= 4 ? (
          <ModalError
            mentee={mentee}
            updateMentee={updateMentee}
            toggleModal={toggleModal}
            modalContent={noMoreChoice}
          />
        ) : (
          <></>
        )}
      </div>
    ) : (
      // TODO: style loading
      <p>Loading</p>
    )
  );
}

export default MenteeDetailView;

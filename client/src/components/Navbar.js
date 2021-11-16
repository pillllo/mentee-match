import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const navigationTabs = [
  { name: 'Review applications', href: '/dashboard', current: true },
];

// Component from Tailwind UI https://tailwindui.com/components/application-ui/navigationTabs/navbars
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navbar({ isAuthenticated }) {
  return (
    // TODO: make navabr fixed at top of page
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                {/* Mobile menu buttons*/}
                {isAuthenticated && (
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                )}

                {/* Logo section */}
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center mr-5">
                    <img
                      className="block h-4 w-auto"
                      src="./assets/logo-white.png"
                      alt="Dare IT logo"
                    />
                  </div>

                  {/* Tab section */}
                  {isAuthenticated && (
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                        {navigationTabs.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile picture */}
                {isAuthenticated && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="./assets/profile-pic.jpg"
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu*/}
            {isAuthenticated && (
              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigationTabs.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
    </>
  );
}

export default Navbar;

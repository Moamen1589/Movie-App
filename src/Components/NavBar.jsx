import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from '../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {  Link, useNavigate } from "react-router-dom";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "./SearchInput";

const Navigation = [
  { name: "Home", icon: faHouse, id: 1, href: '/' },
  { name: "Collections", icon: faFilm, id: 2, href: '/collections' },
  { name: "Favorites", icon: faHeart, id: 3, href: '/favorites' },
  { name: "Watch Later", icon: faClock, id: 4,href:'/watchlater' },
];
export default function NavBar() {
  const navigate = useNavigate()
  return (
    <Disclosure as="nav" className="bg-black sticky top-0 z-10 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex  h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo and navigation links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src={logo}
                className="h-8 w-auto cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {Navigation.map((item) => (
                  <Link to={item.href} key={item.id} className=" px-1 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white "> <FontAwesomeIcon className=" mr-1.5" icon={item.icon} /> {item.name}</Link>
                ))

                }
              </div>
            </div>
          </div>
          <SearchInput />
        </div>
      </div>

      {/* Mobile Navigation */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3 ">
          {Navigation.map((item) => (
            <Link to={item.href} key={item.id} className=" block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white "> <FontAwesomeIcon className=" mr-1.5" icon={item.icon} /> {item.name}</Link>
          ))
          }
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

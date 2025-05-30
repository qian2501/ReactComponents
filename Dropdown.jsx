import React, { useState, useContext, Fragment } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const DropDownContext = React.createContext();

const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className="relative">{children}</div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>

      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
    </>
  );
};

const Content = ({ align = 'left', width = '48', contentClasses = 'py-1 bg-gray-600', direction = 'down', children }) => {
  const { open, setOpen } = useContext(DropDownContext);

  let alignmentClasses = '';
  let marginClass = 'mt-2';

  if (direction === 'up') {
    alignmentClasses = 'origin-bottom bottom-full';
    marginClass = 'mb-2';
  } else {
    alignmentClasses = 'origin-top';
    marginClass = 'mt-2';
  }

  if (align === 'left') {
    alignmentClasses += ' left-0';
  } else if (align === 'right') {
    alignmentClasses += ' right-0';
  }

  let widthClasses = '';

  if (width === '48') {
    widthClasses = 'w-48';
  }

  return (
    <>
      <Transition
        as={Fragment}
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className={`absolute z-50 ${marginClass} rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
          onClick={() => setOpen(false)}
        >
          <div className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>{children}</div>
        </div>
      </Transition>
    </>
  );
};

const DropdownLink = ({ href, method = 'post', as = 'a', children }) => {
  return (
    <Link
      href={href}
      method={method}
      as={as}
      className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-100 hover:bg-gray-700 focus:outline-none focus:bg-gray-800 transition duration-150 ease-in-out"
    >
      {children}
    </Link>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;

import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useGetContactsQuery, useGetContactQuery } from '../../api';
import { CreateContact } from '../../components/CreateContact';
import { Contacts } from '../../components/Contacts';

export const HomePage = () => {
  // const data = useSelector((state) => {
  //   console.log(state);
  //   return state.contacts.data
  // });
  // const {addContact} = useActions();

  // const {currentData} = useGetContactQuery('66a8b1e333f86834e4ce88fd');

  return (
    <div className="flex h-screen">
      <div className="w-96 sticky top-0 bg-gray-100 p-4">
        <CreateContact />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Contacts />
      </div>
    </div>
  );
}

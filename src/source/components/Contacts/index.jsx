import { useGetContactsQuery } from '../../api';
import { ContactCard } from './components/ContactCard';

export const Contacts = () => {
  const { isLoading, data } = useGetContactsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.resources) {
    return <div>No contacts found.</div>;
  }

  const cardsJSX = data.resources.map((contact) => (
    <ContactCard key={contact?.id} data={contact} />
  ));

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Contacts</h3>
      <ul className='flex flex-col gap-4'>{cardsJSX}</ul>
    </div>
  );
}

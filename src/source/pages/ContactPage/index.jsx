import { useParams } from 'react-router-dom';
import { useGetContactQuery } from '../../api';

export const ContactPage = () => {
  const {contactId} = useParams();
  const { data, error, isLoading } = useGetContactQuery(contactId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { avatar_url = '', fields = {}, tags2, id: idRecord } = data?.resources[0];

  const getFullName = `${fields['first name']?.[0]?.value} ${fields['last name']?.[0]?.value}`;
  const getEmail = `${fields['email']?.[0]?.value}`;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {!data ? <p>No contact found</p> : (
        <div className="p-4 border rounded-lg shadow-lg bg-white min-w-sm w-[75%] mx-auto relative">
          <div className="flex items-center">
            <img
              src={avatar_url}
              alt="avatar"
              className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
            />
            <div className="ml-4">
              <p className="text-xl font-semibold">{getFullName}</p>
              <p className="text-gray-600">{getEmail}</p>
            </div>
          </div>
          {tags2 && tags2.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags2.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
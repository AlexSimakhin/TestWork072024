import { Link } from "react-router-dom";
import { useRemoveContactMutation } from "../../../../api";

export const ContactCard = ({ data }) => {
  const { avatar_url = '', fields = {}, tags2 = [], id = '' } = data;

  const getFullName = `${fields['first name']?.[0]?.value} ${fields['last name']?.[0]?.value}`;
  const getEmail = `${fields['email']?.[0]?.value}`;

  const [removeContact] = useRemoveContactMutation();

  const onDelete = async () => {
    try {
      await removeContact(id);
      console.log('Contact removed');
    } catch (err) {
      console.error('Failed to remove contact:', err);
    }
  };

  return (
    <li className="p-4 border rounded-lg shadow-lg bg-white min-w-sm w-full md:w-[75%] mx-auto relative">
      <Link to={`contact/${id}`}>
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
      </Link>
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onDelete}
      >
        <span className="material-icons">delete</span>
      </button>
    </li>
  )
}

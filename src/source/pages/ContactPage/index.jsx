import { useParams, useNavigate } from 'react-router-dom';
import { useGetContactQuery, useUpdateTagsContactMutation } from '../../api';
import { useForm } from 'react-hook-form';

export const ContactPage = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetContactQuery(contactId);
  const [updateTagsContact] = useUpdateTagsContactMutation();
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex items-center">
          <svg className="w-16 h-16 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1116 0A8 8 0 014 12z"></path>
          </svg>
        </div>
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  const { avatar_url = '', fields = {}, tags2 = [], id: idRecord = '' } = data?.resources[0] || {};

  const getFullName = `${fields['first name']?.[0]?.value || ''} ${fields['last name']?.[0]?.value || ''}`;
  const getEmail = `${fields['email']?.[0]?.value || ''}`;

  const parseTags = (tagsString) => {
    const regex = /(?:[^,\"]|\.|"(?:\.|[^"])*")+/g;
    const tags = [];
    let match;
  
    while ((match = regex.exec(tagsString)) !== null) {
      const tag = match[0].trim().replace(/^"|"$/g, '').replace(/\,/g, ',');
      if (tag) {
        tags.push(tag);
      }
    }
  
    return tags;
  };

  const onSubmit = (formData) => {
    const newTags = parseTags(formData.tags);

    if (newTags.length > 5) {
      setError('tags', { type: 'manual', message: 'Maximum 5 tags are allowed.' });
      return;
    }

    updateTagsContact({
      id: idRecord,
      tags: {
        tags: [...newTags, ...tags2],
      }
    }).unwrap().then(() => {
      console.log('Contact updated');
      reset();
    })
    .catch((error) => {
      console.error('Failed to add tags', error);
    });
  };

  return (
    <div className="relative flex justify-center items-center  min-h-screen bg-gray-100">
      {!data ? <p>No contact found</p> : (
        <div className="p-6 mx-4 border rounded-lg shadow-lg bg-white min-w-sm md:w-[50%] md:mx-auto relative">
          <div className="flex items-center mb-6 ">
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
            <div className='mt-6'>
              <p className='mb-2'>Tags</p>
              <div className="flex flex-wrap gap-2">
                {tags2.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-12">
            <div className="flex flex-col">
              <label htmlFor="tags" className="mb-2 text-gray-700">
                Add Tags (comma separated; use backslash to escape commas inside tags)
              </label>
              <input
                id="tags"
                {...register("tags", { required: 'Tags are required' })}
                className={`px-4 py-2 border rounded-md ${errors.tags ? 'border-red-500' : ''}`}
              />
              {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
            </div>
            <div>
              <input
                value="Add Tags"
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
              />
            </div>
          </form>
          <button 
            onClick={() => navigate(-1)} 
            className="absolute -bottom-16 right-0 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-50 transition ease-in-out">
            Back
          </button>
        </div>
      )}
    </div>
  );
};

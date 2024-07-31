import { useForm } from "react-hook-form";
import { useCreateContactMutation } from "../../api";

export const CreateContact = () => {
  const { register, handleSubmit } = useForm();
  const [createContact] = useCreateContactMutation();

  const onSubmit = data => {
    const contactData = {
      // ...data,
      avatar_url: 'https://visitukraine.today/media/blog/previews/MfucoHVCGC2C3R8shSpfu2v0xcGpJ04vH2JDJhcE.jpg',
      fields: {
        'first name': [{ value: 'Oleksandr', modifier: '', label: 'first name' }],
        'last name': [{ value: 'Simakhin', modifier: '', label: 'last name' }],
        'email': [{ value: 'test@test', modifier: '', label: 'email' }],
      },
      tags: 'test, work, fe',
      record_type: 'person',
      privacy: {
      edit: null,
      read: null,
      },
      owner_id: null,

    }
    createContact(contactData)
      .unwrap()
      .then(() => {
        console.log('Contact created');
      })
      .catch((error) => {
        console.error('Failed to create contact', error);
      });
  };

  return (
    <>
      <h3 className="text-lg font-bold mb-4">Create Contacts</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="mb-2 text-gray-700">First Name</label>
          <input
            id="firstName"
            {...register("firstName", { required: true, maxLength: 20 })}
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="mb-2 text-gray-700">Last Name</label>
          <input
            id="lastName"
            {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-gray-700">Email</label>
          <input
            type="text"
            id="email"
            {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <input
            value="Create"
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          />
        </div>
      </form>
    </>
  );
}

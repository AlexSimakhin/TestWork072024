import { useForm } from "react-hook-form";
import { useCreateContactMutation } from "../../api";

export const CreateContact = () => {
  const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm();
  const [createContact] = useCreateContactMutation();

  const onSubmit = async (data) => {
    if (!data.firstName && !data.lastName) {
      setError("firstName", { type: "manual", message: "Either first name or last name must be filled" });
      setError("lastName", { type: "manual", message: "Either first name or last name must be filled" });
      return;
    } else {
      clearErrors("firstName");
      clearErrors("lastName");
    }

    const contactData = {
      avatar_url: 'https://visitukraine.today/media/blog/previews/MfucoHVCGC2C3R8shSpfu2v0xcGpJ04vH2JDJhcE.jpg',
      fields: {
        'first name': [{ value: data.firstName, modifier: '', label: 'first name' }],
        'last name': [{ value: data.lastName, modifier: '', label: 'last name' }],
        'email': [{ value: data.email, modifier: '', label: 'email' }],
      },
      tags: '',
      record_type: 'person',
      privacy: {
        edit: null,
        read: null,
      },
      owner_id: null,
    };

    try {
      await createContact(contactData);
      console.log('Contact created');
      reset();
    } catch (err) {
      console.error('Failed to create contact:', err);
    }
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-4">Create Contact</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="mb-2 text-gray-700">First Name</label>
          <input
            id="firstName"
            {...register("firstName", { maxLength: 20 })}
            className="px-4 py-2 border rounded-md"
          />
          {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="mb-2 text-gray-700">Last Name</label>
          <input
            id="lastName"
            {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
            className="px-4 py-2 border rounded-md"
          />
          {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-gray-700">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
            className="px-4 py-2 border rounded-md"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div>
          <input
            value="Add Contact"
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
          />
        </div>
      </form>
    </>
  );
}

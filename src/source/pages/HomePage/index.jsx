import { CreateContact } from '../../components/CreateContact';
import { Contacts } from '../../components/Contacts';

export const HomePage = () => {
  console.log(process.env.NODE_ENV)
  return (
    <div className="relative min-h-screen bg-gray-300">
      <div className="absolute inset-0 z-0 bg-gray-300" />
      <div className="relative flex items-center justify-center p-4 z-10 md:h-[100vh]">
        <div className="w-full max-w-[1280px] md:h-[80vh] md:shadow-lg md:rounded-lg md:overflow-hidden">
          <div className="flex h-full flex-col md:flex-row gap-4 md:gap-0">
            <div className="w-full md:w-96 md:sticky md:top-0 bg-gray-100 p-4 border-b h-auto md:border-r md:h-full shadow-lg rounded-lg md:shadow-none md:rounded-none">
              <CreateContact />
            </div>

            <div className="flex-1 md:overflow-x-auto p-4 md:h-full bg-white shadow-lg rounded-lg md:shadow-none md:rounded-none">
              <div className="flex flex-nowrap">
                <Contacts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

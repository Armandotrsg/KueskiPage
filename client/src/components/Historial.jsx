
export const Historial = () => {
const people = [
    {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      role: 'Co-Founder / CTO',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      role: 'Business Relations',
      lastSeen: null,
    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      role: 'Front-end Developer',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Courtney Henry',
      email: 'courtney.henry@example.com',
      role: 'Designer',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      role: 'Director of Product',
      lastSeen: null,
    },
  ]
  
  return (
    <div className="flex flex-col pl-5 pr-5 pb-5 h-screen w-screen overflow-scroll">
      <h1 className="text-2xl font-bold mx-auto p-4">Historial</h1>
      <ul role="list" className="divide-y divide-gray-100">
        {people.map((person) => (
          <li key={person.email} className="flex flex-wrap justify-between gap-6 py-5">
            <div className="flex flex-col w-full sm:w-auto justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
              </div>
              {person.role && (
                <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              )}
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
            <div className="flex flex-col w-full sm:w-auto justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-6 text-gray-900">Campo 2</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Texto de ejemplo</p>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-6 text-gray-900">Campo 3</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Texto de ejemplo</p>
              </div>
            </div>
            <div className="flex flex-col w-full sm:w-auto justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-6 text-gray-900">Campo 4</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Texto de ejemplo</p>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-6 text-gray-900">Campo 5</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Texto de ejemplo</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
  
  

  
  
    
};

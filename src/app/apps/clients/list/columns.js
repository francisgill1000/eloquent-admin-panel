export default [
    {
        key: "client",
        header: "Name",
        render: (client) => (
            <div
                onClick={() => handleRowClick(client.id)}
                className="flex items-center space-x-3 cursor-pointer"
            >
                <img
                    alt={client.name}
                    className="w-8 h-8 rounded-full object-cover shadow-sm"
                    src={
                        client.profile_picture ||
                        `https://placehold.co/40x40/0f0f0f/00ffcc?text=${client.name.charAt(0)}`
                    }

                />
                <div>
                    <p className="font-medium">{client.name}</p>
                </div>
            </div>
        ),
    },
    {
        key: "client",
        header: "Whatsapp",
        render: (client) => (
            <div
                onClick={() => handleRowClick(client.id)}
                className="flex items-center space-x-3 cursor-pointer"
            >
                <p className="font-medium">{client.whatsapp}</p>
            </div>
        ),
    },
    {
        key: "client",
        header: "Phone",
        render: (client) => (
            <div
                onClick={() => handleRowClick(client.id)}
                className="flex items-center space-x-3 cursor-pointer"
            >
                <p className="font-medium">{client.phone}</p>
            </div>
        ),
    },
    {
        key: "client",
        header: "Email",
        render: (client) => (
            <div
                onClick={() => handleRowClick(client.id)}
                className="flex items-center space-x-3 cursor-pointer"
            >
                <p className="font-medium">{client.email}</p>
            </div>
        ),
    },
];
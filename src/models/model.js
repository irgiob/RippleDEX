exports.Types = [
    {
        type: "User",
        collection: "users",
        map: doc => ({
            name: doc.name,
            email: doc.email,
            lastOpenedOrganization___NODE: doc.lastOpenedOrganization.id,
            notificationMode: doc.notificationMode,
            profilePicture: doc.profilePicture,
            phoneNumber: [doc.phoneNumber.number, doc.phoneNumber.type],
            organizations___NODE: doc.organizations.map(org => org.id),
        }),
    },
    {
        type: "Organization",
        collection: "organizations",
        map: doc => ({
            name: doc.name,
            description: doc.description,
            profilePicture: doc.profilePicture,
            admin___NODE: doc.admin.id,
            members___NODE: doc.members.map(user => user.id),
        }),
    },
]
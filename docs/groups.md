# Groups

Groups are the core of LFG. They describe the communities and ideas around which the users of LFG congregate.

## Group data
Groups consist of the following data:
- Group name: string
- Description: string
- Creation Date: Date (readonly after creation)
- Roles 
    - Creator: User (readonly after creation)
    - Admins: User[]
    - Members: User[]
    - Role
        - Role name: string
        - Role description: string
        - Role supervisor: User AND Member

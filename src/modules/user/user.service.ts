// Example user service (in-memory for template)
interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

export async function findAll(): Promise<User[]> {
  return users;
}

export async function create(data: Partial<User>): Promise<User> {
  const user: User = {
    id: Math.random().toString(36).substring(7),
    name: data.name || "Unknown",
    email: data.email || "",
  };
  users.push(user);
  return user;
}

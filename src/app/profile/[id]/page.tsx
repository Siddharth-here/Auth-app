export const instant = false;

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Welcome to your profile page, !
        <span className="p-2 ml-2 bg-orange-500 text-black font-bold">{id}</span>
      </p>
    </div>
  );
}
interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  const parsedId: number = parseInt(id);

  return <div>{parsedId}</div>
}

export default async function Page({ params }: { params: { id: string } }) {
    return(<p>hello: {params.id}</p>)
}
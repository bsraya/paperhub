async function getPapers() {
    const res = await fetch('http://localhost:3000/api/papers')
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const papers = await res.json()
    return papers
}

export default async function Page() {
    const papers = await getPapers()
    return (
        <div>
            {papers.map((paper: any) => (
                <div key={paper.id}>
                    <h1>{paper.title}</h1>
                </div>
            ))}
        </div>
    )
}
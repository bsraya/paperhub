import type { InferGetStaticPropsType, GetStaticProps } from 'next'

type Paper = {
    id: string,
    title: string,
    summary: string
    published: Date,
    updated: Date,
    authors: string[]
}

export const getStaticProps: GetStaticProps<{
    papers: Paper[]
}> = async () => {
    const res = await fetch('http://localhost:3000/api/papers')
    const papers = await res.json()
    return {
        props: {
            papers
        }
    }
}

export default function Home({papers}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            <h1>About</h1>
            <ul>
                {
                    papers && papers.map((paper: Paper) => (
                        <li key={paper.id}>
                            <p>{paper.title} | {paper.published instanceof Date ? paper.published.toISOString() : paper.published}</p>
                            <p>{paper.summary}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
import { NextApiRequest, NextApiResponse } from 'next'
import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser();

const url = 'http://export.arxiv.org/api/query?search_query=machine&20learning'

export default async function handlers(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const response = await fetch(url);
        const xml = await response.text();

        const parsedXml = parser.parse(xml);

        // iterate over the entries and create a new array of objects
        const filteredParsedXml = parsedXml.feed.entry.map((entry: any) => {
            return {
                id: entry.id,
                title: entry.title,
                summary: entry.summary,
                published: new Date(entry.published).toDateString(),
                updated: new Date(entry.updated).toDateString(),
                author: Array.isArray(entry.author) ? entry.author.map((author: any) => author.name) : []
            }
        })

        res.status(200).json(filteredParsedXml)
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
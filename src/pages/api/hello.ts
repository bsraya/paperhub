import { NextApiRequest, NextApiResponse } from 'next'
import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser();

const url = 'http://export.arxiv.org/api/query?search_query=machine&20learning'

export default async function handlers(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const response = await fetch(url);
        const xml = await response.text();

        const parsedXml = parser.parse(xml);
        res.status(200).json({ "title": parsedXml.feed.entry[0].title })
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
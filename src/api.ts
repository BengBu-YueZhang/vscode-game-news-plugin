import axios from 'axios';
import {
    getTString
} from './util';

export interface INews {
    title: string;
    src: string;
    source: string;
}

export default async function api (range: number = 1): Promise<INews[]> {
    try {
        const filename = `${getTString(new Date().getTime() - range * 60 * 60 * 1000)}.js`;
        const url = `http://news.bengbuzhangyue.xyz/${filename}`;
        const result = await axios.get(url);
        return result.data;
    } catch (error) {
        return [];
    }
}
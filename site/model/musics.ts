import allMusicFiles from "../data/music/";
import { DataFile } from '../util/data-files.js';

interface MusicFile {
  title: string;
  youtube?: string;
  spotify?: string;
  category: string;
}

export class Music extends DataFile<MusicFile> {

  static override modelDir = 'music';

}

export const allMusics = (allMusicFiles
  .map(file => Music.fromFile(file)));

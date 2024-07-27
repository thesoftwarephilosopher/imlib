import * as fs from "fs";
import * as Yaml from "js-yaml";
import * as path from "path/posix";

export class DataFile<D> {

  static modelDir: string;

  static fromFile<T extends DataFile<any>>(
    this: new (...args: any[]) => T,
    { path: filepath, content: rawContent }: FsFile
  ) {
    const slug = path.basename(filepath).slice(0, -3);

    const fileContents = rawContent.toString('utf8').replace(/\r\n/g, '\n');
    const fileContentsMatch = fileContents.match(/^---\n(.+?)\n---\n\n?(.*?)$/s)!;
    const frontmatter = fileContentsMatch[1]!;
    const content = fileContentsMatch[2]!;

    const data = Yaml.load(frontmatter!);

    return new this(slug, content, data);
  }

  constructor(
    public slug: string,
    public content: string,
    public data: D,
  ) { }

  save() {
    const modelDir = (this.constructor as typeof DataFile<D>).modelDir;
    const filename = `${this.slug}.md`;
    const filepath = path.resolve(path.join('site/data', modelDir, filename));
    const content = `---\n${Yaml.dump(this.data, { lineWidth: 200 })}---\n\n${this.content}`;
    fs.writeFileSync(filepath, content);
  }

}

export class DataFileWithDate<D> extends DataFile<D> {

  date: string;

  constructor(slug: string, content: string, data: D) {
    super(slug, content, data);
    this.date = this.slug.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1]!;
  }

}

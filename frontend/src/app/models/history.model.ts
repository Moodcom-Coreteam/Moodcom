import {Video} from "./video.model";

export class History {

  constructor(public date: string,
              public videos: Video[]) {
  }

}

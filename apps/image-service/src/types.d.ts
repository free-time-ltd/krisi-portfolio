type OpType = "scale" | "resize" | "aspect";

interface BaseThumbnailConf {
  quality: number;
  type: OpType;
}

interface ScaleThumbnailConf extends BaseThumbnailConf {
  scale: number;
}

interface AspectThumbnailConf extends BaseThumbnailConf {
  ratio: "16:9" | "16:10" | "4:3";
}

interface ResizeThumbnailConf extends BaseThumbnailConf {
  width: number;
}

type ThumbnailConf =
  | ScaleThumbnailConf
  | AspectThumbnailConf
  | ResizeThumbnailConf;

type ThumbnailConfMap = Record<string, ThumbnailConf>;

type FileMetadata = {
  filename: string;
  category: string;
  extension: string;
  descr: string;
  name: string;
};

interface BuildUrlProps {
  filename: string;
  extension: string;
  category: string;
  suffix?: string;
  suffixGlue?: string;
}
